from dataclasses import dataclass

from app.application.common.uow import UnitOfWork
from app.application.repositories.cabinet import CabinetRepository
from app.application.services.permission import PermissionService
from app.domain.entities import Cabinet


@dataclass
class CreateCabinetDTO:
    address_id: int
    number: str


class CreateCabinet:
    def __init__(
        self,
        cabinet_repository: CabinetRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.cabinet_repository = cabinet_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: CreateCabinetDTO) -> Cabinet:
        await self.permission_service.ensure_admin_or_more()
        async with self.uow:
            cabinet = Cabinet(address_id=data.address_id, number=data.number)
            return await self.cabinet_repository.create(cabinet)
