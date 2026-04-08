from dataclasses import dataclass

from app.application.common.uow import UnitOfWork
from app.application.repositories.address import AddressRepository
from app.application.services.permission import PermissionService


@dataclass
class DeleteAddressDTO:
    id: int


class DeleteAddress:
    def __init__(
        self,
        address_repository: AddressRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.address_repository = address_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: DeleteAddressDTO) -> None:
        await self.permission_service.ensure_admin_or_more()
        async with self.uow:
            await self.address_repository.delete(data.id)
