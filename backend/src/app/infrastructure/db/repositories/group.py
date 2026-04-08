from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.application.repositories.group import GroupRepository
from app.domain.entities import Group


class GroupRepositoryImpl(GroupRepository):
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(
        self,
        name: str,
        course_id: int,
        max_users_count: int,
        default_cabinet_id: int | None = None,
    ) -> Group:
        group = Group(
            name=name,
            course_id=course_id,
            max_users_count=max_users_count,
            default_cabinet_id=default_cabinet_id,
        )
        self.session.add(group)
        await self.session.flush()
        return group

    async def get_by_id(self, id: int) -> Group:
        stmt = select(Group).where(Group.id == id)
        rows = await self.session.execute(stmt)
        return rows.scalar_one()

    async def get_all(self, id: int) -> list[Group]:
        stmt = select(Group)
        rows = await self.session.execute(stmt)
        return rows.scalars().all()
