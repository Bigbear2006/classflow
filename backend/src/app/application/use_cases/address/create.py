from dataclasses import dataclass

from app.application.common.org_id_provider import OrganizationIdProvider
from app.application.common.uow import UnitOfWork
from app.application.repositories.address import AddressRepository
from app.application.services.permission import PermissionService
from app.domain.entities import Address


@dataclass
class CreateAddressDTO:
    address: str


class CreateAddress:
    def __init__(
        self,
        address_repository: AddressRepository,
        org_id_provider: OrganizationIdProvider,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.address_repository = address_repository
        self.org_id_provider = org_id_provider
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: CreateAddressDTO) -> Address:
        await self.permission_service.ensure_admin_or_more()
        org_id = await self.org_id_provider.get_current_organization_id()
        async with self.uow:
            address = Address(organization_id=org_id, address=data.address)
            return await self.address_repository.create(address)
