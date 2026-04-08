from typing import Protocol

from app.domain.entities import UserGroup


class UserGroupRepository(Protocol):
    async def create(self, user_group: UserGroup) -> UserGroup:
        pass

    async def delete(self, user_id: int, group_id: int) -> None:
        pass
