from fastapi import Request

from app.domain.exceptions import NotAuthenticatedError


class JWTTokenParser:
    def __init__(self, request: Request) -> None:
        self.request = request

    def parse(self) -> str:
        header = self.request.headers.get('Authorization')
        if not header:
            raise NotAuthenticatedError()

        parts = header.split()
        if len(parts) != 2:
            raise NotAuthenticatedError()

        if parts[0] != 'Bearer':
            raise NotAuthenticatedError()

        return parts[1]
