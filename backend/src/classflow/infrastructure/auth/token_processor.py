from dataclasses import dataclass
from datetime import UTC, datetime, timedelta
from enum import StrEnum
from typing import Any

import jwt

from classflow.domain.exceptions import NotAuthenticatedError
from classflow.infrastructure.auth.config import Algorithm


class TokenType(StrEnum):
    ACCESS = 'ACCESS'
    REFRESH = 'REFRESH'


@dataclass
class TokenPair:
    access: str
    refresh: str


class JWTTokenProcessor:
    def __init__(
        self,
        secret_key: str,
        algorithm: Algorithm,
        access_token_lifetime: timedelta,
        refresh_token_lifetime: timedelta,
    ) -> None:
        self.secret_key = secret_key
        self.algorithm = algorithm
        self.access_token_lifetime = access_token_lifetime
        self.refresh_token_lifetime = refresh_token_lifetime

    def _create_token(self, user_id: int, token_type: TokenType, lifetime: timedelta) -> str:
        payload = {
            'sub': str(user_id),
            'type': token_type.value,
            'exp': datetime.now(UTC) + lifetime,
        }
        return jwt.encode(payload, self.secret_key, self.algorithm)

    def create_access_token(self, user_id: int) -> str:
        return self._create_token(user_id, TokenType.ACCESS, self.access_token_lifetime)

    def create_refresh_token(self, user_id: int) -> str:
        return self._create_token(user_id, TokenType.REFRESH, self.refresh_token_lifetime)

    def create_token_pair(self, user_id: int) -> TokenPair:
        access = self.create_access_token(user_id)
        refresh = self.create_refresh_token(user_id)
        return TokenPair(access=access, refresh=refresh)

    def validate_token(
        self,
        token: str,
        *,
        token_type: TokenType | None = None,
    ) -> dict[str, Any]:
        try:
            payload = jwt.decode(token, self.secret_key, self.algorithm)
        except jwt.InvalidTokenError as e:
            raise NotAuthenticatedError() from e

        if token_type and payload.get('type', '') != token_type:
            raise NotAuthenticatedError()
        return payload

    def validate_access_token(self, token: str) -> dict[str, Any]:
        return self.validate_token(token, token_type=TokenType.ACCESS)

    def validate_refresh_token(self, token: str) -> dict[str, Any]:
        return self.validate_token(token, token_type=TokenType.REFRESH)

    def extract_user_id(self, token: str, *, token_type: TokenType | None = None) -> int:
        payload = self.validate_token(token, token_type=token_type)
        return int(payload['sub'])
