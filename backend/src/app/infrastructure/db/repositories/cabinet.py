from typing import cast

from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.application.repositories.cabinet import CabinetRepository
from app.domain.entities import Cabinet
from app.infrastructure.db.models import cabinets_table
from app.infrastructure.db.repositories.base import create


class CabinetRepositoryImpl(CabinetRepository):
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(self, cabinet: Cabinet) -> Cabinet:
        return await create(self.session, cabinet)

    async def get_all(self) -> list[Cabinet]:
        stmt = (
            select(Cabinet)
            .options(joinedload(Cabinet.address))  # type: ignore[arg-type]
            .order_by(cabinets_table.c.number)
        )
        rows = await self.session.scalars(stmt)
        return cast(list[Cabinet], rows.all())

    async def delete(self, id: int) -> None:
        stmt = delete(Cabinet).where(cabinets_table.c.id == id)
        await self.session.execute(stmt)
