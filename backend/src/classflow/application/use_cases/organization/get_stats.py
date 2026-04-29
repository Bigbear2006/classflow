from classflow.application.common.org_id_provider import OrganizationIdProvider
from classflow.application.repositories.organization import (
    OrganizationRepository,
)
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import OrganizationStats


class GetOrganizationStats:
    def __init__(
        self,
        organization_repository: OrganizationRepository,
        org_id_provider: OrganizationIdProvider,
        permission_service: PermissionService,
    ) -> None:
        self.organization_repository = organization_repository
        self.org_id_provider = org_id_provider
        self.permission_service = permission_service

    async def __call__(self) -> OrganizationStats:
        await self.permission_service.ensure_admin_or_more()
        org_id = await self.org_id_provider.get_current_organization_id()
        return await self.organization_repository.get_stats(org_id)
