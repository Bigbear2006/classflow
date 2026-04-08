from datetime import UTC, datetime, timedelta
from typing import Any

import jwt

from app.infrastructure.auth.config import Algorithm


class JWTTokenProcessor:
    def __init__(
        self,
        secret_key: str,
        expires: timedelta,
        algorithm: Algorithm,
    ) -> None:
        self.secret_key = secret_key
        self.expires = expires
        self.algorithm = algorithm

    def create_token(self, user_id: int) -> str:
        payload = {
            'sub': str(user_id),
            'exp': datetime.now(UTC) + self.expires,
        }
        return jwt.encode(payload, self.secret_key, self.algorithm)

    def validate_token(self, token: str) -> dict[str, Any]:
        return jwt.decode(token, self.secret_key, self.algorithm)

    def extract_user_id(self, token: str) -> int:
        payload = self.validate_token(token)
        return int(payload['sub'])
