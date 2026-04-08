from fastapi import Request

from app.application.common.org_id_provider import OrganizationIdProvider
from app.application.repositories.organization import OrganizationRepository
from app.domain.entities import Organization
from app.domain.exceptions import OrganizationNotResolvedError


class SubdomainOrganizationIdProvider(OrganizationIdProvider):
    def __init__(
        self,
        request: Request,
        organization_repository: OrganizationRepository,
    ):
        self.request = request
        self.organization_repository = organization_repository

    async def try_get_current_organization(self) -> Organization | None:
        host = self.request.headers.get('host', '')
        subdomain = host.split('.')[0]
        return await self.organization_repository.get_by_slug(subdomain)

    async def get_current_organization(self) -> Organization:
        org = await self.try_get_current_organization()
        if org is None:
            raise OrganizationNotResolvedError()
        return org

    async def try_get_current_organization_id(self) -> int | None:
        org = await self.try_get_current_organization()
        return org.id if org else None

    async def get_current_organization_id(self) -> int:
        org = await self.get_current_organization()
        return org.id
