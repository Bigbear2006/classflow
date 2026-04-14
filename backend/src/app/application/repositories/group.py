from typing import Protocol

from app.domain.entities import Group, User


class GroupRepository(Protocol):
    async def create(self, group: Group) -> Group:
        pass

    async def update(
        self,
        id: int,
        *,
        name: str,
        course_id: int,
        max_users_count: int,
        default_cabinet_id: int | None = None,
    ) -> Group:
        pass

    async def get_by_id(self, id: int) -> Group:
        pass

    async def get_all(self) -> list[Group]:
        pass

    async def get_users(self, group_id: int) -> list[User]:
        pass
