from dataclasses import dataclass

from classflow.application.common.org_id_provider import OrganizationIdProvider
from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.organization import (
    OrganizationRepository,
)
from classflow.application.services.permission import PermissionService


@dataclass
class UpdateCurrentOrganizationDTO:
    name: str | None
    slug: str | None


class UpdateCurrentOrganization:
    def __init__(
        self,
        organization_repository: OrganizationRepository,
        org_id_provider: OrganizationIdProvider,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.organization_repository = organization_repository
        self.org_id_provider = org_id_provider
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: UpdateCurrentOrganizationDTO) -> None:
        await self.permission_service.ensure_owner()
        org_id = await self.org_id_provider.get_current_organization_id()
        async with self.uow:
            return await self.organization_repository.update(
                org_id,
                name=data.name,
                slug=data.slug,
            )
