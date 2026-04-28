from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager
from typing import Any

import uvicorn
from dishka import AsyncContainer
from dishka.integrations.fastapi import setup_dishka
from fastapi import FastAPI, Request, Response
from starlette.middleware.base import BaseHTTPMiddleware

from classflow.infrastructure.di.container import container
from classflow.presentation.api import root_router
from classflow.presentation.api.exception_handler import (
    setup_exception_handlers,
)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None]:
    yield
    await app.state.dishka_container.close()


async def cors_middleware(request: Request, call_next: Any) -> Response:
    if request.method == 'OPTIONS':
        rsp = Response()
    else:
        rsp = await call_next(request)

    origin = request.headers.get('origin')
    if origin in ['http://localhost:5173', 'http://my-org.localhost:5173']:
        rsp.headers['Access-Control-Allow-Origin'] = origin
        rsp.headers['Access-Control-Allow-Credentials'] = 'true'
        rsp.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        rsp.headers['Access-Control-Allow-Methods'] = (
            'GET,POST,OPTIONS,PUT,PATCH,DELETE'
        )
    return rsp


def create_app(_container: AsyncContainer | None = None) -> FastAPI:
    app = FastAPI(lifespan=lifespan)
    app.include_router(root_router)
    app.add_middleware(BaseHTTPMiddleware, dispatch=cors_middleware)
    setup_exception_handlers(app)
    setup_dishka(_container or container, app)
    return app


if __name__ == '__main__':
    uvicorn.run(
        app=create_app(),
        host='0.0.0.0',
        port=8000,
    )
