from typing import Protocol

from app.domain.entities import User


class UserRepository(Protocol):
    async def create(self, user: User) -> User:
        pass

    async def update(
        self,
        id: int,
        *,
        fullname: str | None = None,
        phone: str | None = None,
        password: str | None = None,
    ) -> User:
        pass

    async def get_by_id(self, id: int) -> User | None:
        pass

    async def get_by_email(self, email: str) -> User | None:
        pass
