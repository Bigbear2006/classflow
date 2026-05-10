from sqlalchemy import delete
from sqlalchemy.ext.asyncio import AsyncSession

from classflow.application.repositories.payment import PaymentRepository
from classflow.domain.entities import (
    Payment,
)
from classflow.infrastructure.db.repositories.base import create
from classflow.infrastructure.db.tables import payments_table


class PaymentRepositoryImpl(PaymentRepository):
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(self, payment: Payment) -> Payment:
        return await create(self.session, payment)

    async def delete(self, id: int) -> None:
        stmt = delete(Payment).where(payments_table.c.id == id)
        await self.session.execute(stmt)
