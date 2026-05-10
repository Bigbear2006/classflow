from typing import Protocol

from classflow.domain.entities import Payment


class PaymentRepository(Protocol):
    async def create(self, payment: Payment) -> Payment:
        pass

    async def delete(self, id: int) -> None:
        pass
