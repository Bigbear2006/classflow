from typing import Protocol

from app.domain.entities import Group


class GroupRepository(Protocol):
    async def create(
        self,
        name: str,
        course_id: int,
        max_users_count: int,
        default_cabinet_id: int | None = None,
    ) -> Group:
        pass

    async def get_by_id(self, id: int) -> Group:
        pass

    async def get_all(self, id: int) -> list[Group]:
        pass

    async def add_user(self, group_id: int, user_id: int) -> None:
        pass

    async def remove_user(self, group_id: int, user_id: int) -> None:
        pass
