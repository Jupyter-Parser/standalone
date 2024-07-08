from contextlib import asynccontextmanager
import json
import os
import time
from typing import Optional
from fastapi import Depends, FastAPI, WebSocket, WebSocketDisconnect
from starlette.requests import Request
from starlette.responses import JSONResponse
import uvicorn

from service import ConnectionManager

pipe = -1
pipe_path = "\\\\.\\pipe\\jupyter_pipe"

def write_status(status: str, error: Optional[str] = None):
    data = {"status": status}

    if error:
        data["error"] = error

    os.write(pipe, json.dumps(data).encode())


@asynccontextmanager
async def lifespan(app: FastAPI):
    global pipe

    while True:
        try:
            pipe = os.open(pipe_path, os.O_WRONLY)
            write_status("started")
            break
        except:
            time.sleep(0.1)

    yield

    write_status("killed")

app = FastAPI(docs_url=None, redoc_url=None, lifespan=lifespan)

@app.exception_handler(Exception)
async def validation_exception_handler(request: Request, err) -> JSONResponse:
    write_status("error", str(err))

    base_error_message = f"Failed to execute: {request.method}: {request.url}"
    return JSONResponse(
        status_code=500,
        content={"message": f"{base_error_message}. Detail: {str(err)}"},
    )


@app.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket, manager: ConnectionManager = Depends()
):
    await manager.connect(websocket)
    try:
        while True:
            await manager.handler(websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as ex:
        write_status("error", str(ex))


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3728, use_colors=False)
