from dataclasses import asdict, dataclass, replace

from classflow.application.common.org_id_provider import OrganizationIdProvider
from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.organization import (
    OrganizationRepository,
)
from classflow.application.services.permission import PermissionService


@dataclass
class UpdateCurrentOrganizationDTO:
    name: str
    slug: str


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
        org = await self.org_id_provider.get_current_organization()
        async with self.uow:
            updated_org = replace(org, **asdict(data))
            return await self.organization_repository.update(
                org.id,
                name=updated_org.name,
                slug=updated_org.slug,
            )
