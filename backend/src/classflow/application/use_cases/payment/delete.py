from dataclasses import dataclass

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.payment import PaymentRepository
from classflow.application.services.permission import PermissionService


@dataclass
class DeletePaymentDTO:
    id: int


class DeletePayment:
    def __init__(
        self,
        payment_repository: PaymentRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.payment_repository = payment_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: DeletePaymentDTO) -> None:
        await self.permission_service.ensure_admin_or_more()
        async with self.uow:
            return await self.payment_repository.delete(data.id)
