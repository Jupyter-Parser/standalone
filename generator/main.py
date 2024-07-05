from fastapi import Depends, FastAPI, WebSocket, WebSocketDisconnect
from starlette.requests import Request
from starlette.responses import JSONResponse
import uvicorn

from service import ConnectionManager

app = FastAPI(docs_url=None, redoc_url=None)


@app.exception_handler(Exception)
async def validation_exception_handler(request: Request, err) -> JSONResponse:
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


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3728)
