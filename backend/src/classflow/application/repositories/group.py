from typing import Protocol

from classflow.domain.entities import Group, User


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

    async def get_all(self, teacher_id: int | None = None) -> list[Group]:
        pass

    async def get_users(self, group_id: int) -> list[User]:
        pass

    async def get_groups_with_payments(
        self,
        *,
        teacher_id: int | None = None,
        student_id: int | None = None,
    ) -> list[Group]:
        pass

    async def get_groups_with_students(
        self,
        *,
        teacher_id: int | None = None,
        course_id: int | None = None,
    ) -> list[Group]:
        pass

    async def get_groups_with_teachers(
        self,
        teacher_id: int | None = None,
    ) -> list[Group]:
        pass
