from sqlalchemy import update
from sqlalchemy.ext.asyncio import AsyncSession

from app.application.repositories.user_group import UserGroupRepository
from app.domain.entities import UserGroup
from app.infrastructure.db.models import user_groups_table
from app.infrastructure.db.repositories.base import create


class UserGroupRepositoryImpl(UserGroupRepository):
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(self, user_group: UserGroup) -> UserGroup:
        return await create(self.session, user_group)

    async def delete(self, user_id: int, group_id: int) -> None:
        stmt = (
            update(UserGroup)
            .where(
                user_groups_table.c.user_id == user_id,
                user_groups_table.c.group_id == group_id,
            )
            .values(is_active=False)
        )
        await self.session.execute(stmt)
