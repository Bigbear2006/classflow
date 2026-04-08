from typing import Any

from pydantic import BaseModel


class IdResponse(BaseModel):
    id: int


class ErrorResponse(BaseModel):
    code: str
    message: str
    context: dict[str, Any]
