from app.application.common.id_provider import IdentityProvider
from app.application.common.org_id_provider import OrganizationIdProvider
from app.application.repositories.organization_member import (
    OrganizationMemberRepository,
)
from app.domain.entities import OrganizationMember


class GetCurrentOrganizationMemberDTO:
    user_id: int


class GetCurrentOrganizationMember:
    def __init__(
        self,
        organization_member_repository: OrganizationMemberRepository,
        id_provider: IdentityProvider,
        org_id_provider: OrganizationIdProvider,
    ) -> None:
        self.organization_member_repository = organization_member_repository
        self.id_provider = id_provider
        self.org_id_provider = org_id_provider

    async def __call__(
        self,
        data: GetCurrentOrganizationMemberDTO | None = None,
    ) -> OrganizationMember:
        user = await self.id_provider.get_current_user()
        org = await self.org_id_provider.get_current_organization()
        return await self.organization_member_repository.get(org.id, user.id)
