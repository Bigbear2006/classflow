from classflow.application.common.id_provider import IdentityProvider
from classflow.application.common.org_id_provider import OrganizationIdProvider
from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.organization_member import (
    OrganizationMemberRepository,
)
from classflow.domain.entities import OrganizationMember
from classflow.domain.enums import UserRole


class JoinOrganization:
    def __init__(
        self,
        organization_member_repository: OrganizationMemberRepository,
        org_id_provider: OrganizationIdProvider,
        id_provider: IdentityProvider,
        uow: UnitOfWork,
    ) -> None:
        self.organization_member_repository = organization_member_repository
        self.org_id_provider = org_id_provider
        self.id_provider = id_provider
        self.uow = uow

    async def __call__(self) -> OrganizationMember:
        org_id = await self.org_id_provider.get_current_organization_id()
        user_id = self.id_provider.get_current_user_id()
        async with self.uow:
            member = OrganizationMember(
                organization_id=org_id,
                user_id=user_id,
                role=UserRole.STUDENT,
            )
            return await self.organization_member_repository.create(member)
