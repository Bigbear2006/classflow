from typing import cast

from sqlalchemy import delete, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from classflow.application.repositories.subject import SubjectRepository
from classflow.domain.entities import Subject
from classflow.infrastructure.db.repositories.base import create, exclude_none
from classflow.infrastructure.db.tables import subjects_table


class SubjectRepositoryImpl(SubjectRepository):
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(self, subject: Subject) -> Subject:
        return await create(self.session, subject)

    async def update(
        self,
        id: int,
        *,
        name: str | None = None,
        image: str | None = None,
        description: str | None = None,
    ) -> Subject:
        data = exclude_none(name=name, image=image, description=description)
        stmt = (
            update(Subject)
            .where(subjects_table.c.id == id)
            .values(data)
            .returning(Subject)
        )
        rows = await self.session.execute(stmt)
        return rows.scalar_one()

    async def get_all(self) -> list[Subject]:
        stmt = select(Subject)
        rows = await self.session.scalars(stmt)
        return cast(list[Subject], rows.all())

    async def delete(self, id: int) -> None:
        stmt = delete(Subject).where(subjects_table.c.id == id)
        await self.session.execute(stmt)
