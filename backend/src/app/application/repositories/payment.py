from typing import Protocol

from app.domain.entities import Payment


class PaymentRepository(Protocol):
    async def create(
        self,
        amount: int,
        created_by_id: int,
        user_group_id: int | None = None,
        lesson_id: int | None = None,
    ) -> Payment:
        pass

    async def get_student_payments(self, user_id: int) -> list[Payment]:
        pass
