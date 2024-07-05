import json
import os
from fastapi import WebSocket
from uuid import uuid4
from lib.converter import convert
from lib.schemas import ConversionCreate

base = os.path.join(os.getenv("LOCALAPPDATA"), "JupyterConverter")
os.makedirs(base, exist_ok=True)


class ConnectionManager:
    active_connections = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def handler(self, websocket: WebSocket):
        data = await websocket.receive_json()

        conversion_create = ConversionCreate(**data)

        id = str(uuid4())

        path = os.path.join(base, id)

        os.makedirs(path, exist_ok=True)

        with open(os.path.join(path, "config.json"), "w") as config:
            json.dump(data, config, ensure_ascii=False)

        await websocket.send_json({"conversion_id": id, "status": "converting"})

        result = await convert(
            cwd=conversion_create.cwd,
            notebook=conversion_create.notebook,
            options=conversion_create.options,
        )

        if result:
            await websocket.send_json({"conversion_id": id, "status": "done"})

            result_path = os.path.join(
                path, f"{os.path.basename(conversion_create.notebook)}.docx"
            )
            with open(result_path, "wb") as docx:
                docx.write(result)
        else:
            await websocket.send_json({"conversion_id": id, "status": "error"})
