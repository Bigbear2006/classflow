from dataclasses import dataclass

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.address import AddressRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import Address


@dataclass
class CreateAddressDTO:
    address: str


class CreateAddress:
    def __init__(
        self,
        address_repository: AddressRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.address_repository = address_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: CreateAddressDTO) -> Address:
        await self.permission_service.ensure_admin_or_more()
        async with self.uow:
            address = Address(address=data.address)
            return await self.address_repository.create(address)
