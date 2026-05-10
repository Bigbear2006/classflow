from dataclasses import asdict, dataclass
from datetime import datetime

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.payment import PaymentRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import Payment


@dataclass
class CreatePaymentDTO:
    amount: int
    date: datetime
    student_group_id: int | None = None
    course_teacher_student_id: int | None = None
    lesson_id: int | None = None
    comment: str = ''


class CreatePayment:
    def __init__(
        self,
        payment_repository: PaymentRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.payment_repository = payment_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: CreatePaymentDTO) -> Payment:
        admin = await self.permission_service.ensure_admin_or_more()
        async with self.uow:
            payment = Payment(**asdict(data), created_by_id=admin.id)
            return await self.payment_repository.create(payment)
