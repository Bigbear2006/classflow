from typing import cast

from sqlalchemy import delete, select, update
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from classflow.application.repositories.address import AddressRepository
from classflow.domain.entities import Address
from classflow.domain.exceptions import CannotDeleteEntityError
from classflow.infrastructure.db.models import addresses_table
from classflow.infrastructure.db.repositories.base import create


class AddressRepositoryImpl(AddressRepository):
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(self, address: Address) -> Address:
        return await create(self.session, address)

    async def update(self, id: int, address: str) -> Address:
        stmt = (
            update(Address)
            .where(addresses_table.c.id == id)
            .values(address=address)
            .returning(Address)
        )
        rows = await self.session.execute(stmt)
        return rows.scalar_one()

    async def get_all(self) -> list[Address]:
        rows = await self.session.scalars(
            select(Address).options(joinedload(Address.cabinets)),  # type: ignore[arg-type]
        )
        return cast(list[Address], rows.unique().all())

    async def delete(self, id: int) -> None:
        stmt = delete(Address).where(addresses_table.c.id == id)
        try:
            await self.session.execute(stmt)
        except IntegrityError as e:
            raise CannotDeleteEntityError(
                'Address has related cabinets',
            ) from e
