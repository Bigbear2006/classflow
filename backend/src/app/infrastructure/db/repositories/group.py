from typing import cast

from sqlalchemy import and_, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import (
    joinedload,
)

from app.application.repositories.group import GroupRepository
from app.domain.entities import Cabinet, Course, Group, User
from app.infrastructure.db.models import (
    groups_table,
    user_groups_table,
    users_table,
)
from app.infrastructure.db.repositories.base import create


class GroupRepositoryImpl(GroupRepository):
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(self, group: Group) -> Group:
        return await create(self.session, group)

    async def update(
        self,
        id: int,
        *,
        name: str,
        course_id: int,
        max_users_count: int,
        default_cabinet_id: int | None = None,
    ) -> Group:
        data = {
            'name': name,
            'course_id': course_id,
            'max_users_count': max_users_count,
            'default_cabinet_id': default_cabinet_id,
        }
        stmt = (
            update(Group)
            .where(groups_table.c.id == id)
            .values(data)
            .returning(Group)
        )
        rows = await self.session.execute(stmt)
        return rows.scalar_one()

    async def get_by_id(self, id: int) -> Group:
        stmt = (
            select(Group)
            .options(
                joinedload(Group.course).joinedload(Course.subject),
                joinedload(Group.default_cabinet).joinedload(Cabinet.address),
            )
            .where(groups_table.c.id == id)
        )
        rows = await self.session.execute(stmt)
        return rows.scalar_one()

    async def get_all(self) -> list[Group]:
        stmt = select(Group).options(
            joinedload(Group.course).joinedload(Course.subject),
            joinedload(Group.default_cabinet).joinedload(Cabinet.address),
        )
        rows = await self.session.scalars(stmt)
        return cast(list[Group], rows.all())

    async def get_users(self, group_id: int) -> list[User]:
        stmt = (
            select(User)
            .join(
                user_groups_table,
                and_(
                    user_groups_table.c.group_id == group_id,
                    user_groups_table.c.user_id == users_table.c.id,
                ),
            )
            .where(user_groups_table.c.is_active.is_(True))
            .distinct()
        )
        rows = await self.session.scalars(stmt)
        return cast(list[User], rows.all())
