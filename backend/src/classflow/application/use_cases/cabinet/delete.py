from dataclasses import dataclass

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.cabinet import CabinetRepository
from classflow.application.services.permission import PermissionService


@dataclass
class DeleteCabinetDTO:
    id: int


class DeleteCabinet:
    def __init__(
        self,
        cabinet_repository: CabinetRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.cabinet_repository = cabinet_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: DeleteCabinetDTO) -> None:
        await self.permission_service.ensure_admin_or_more()
        async with self.uow:
            await self.cabinet_repository.delete(data.id)
