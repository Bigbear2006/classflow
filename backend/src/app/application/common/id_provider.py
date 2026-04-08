from typing import Protocol

from app.domain.entities import User


class IdentityProvider(Protocol):
    def get_current_user_id(self) -> int:
        pass

    async def get_current_user(self) -> User:
        pass
