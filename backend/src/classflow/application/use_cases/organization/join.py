from dataclasses import dataclass

from classflow.application.common.id_provider import IdentityProvider
from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.organization_member import (
    OrganizationMemberRepository,
)
from classflow.domain.entities import OrganizationMember
from classflow.domain.enums import UserRole


@dataclass
class JoinOrganizationDTO:
    org_id: int


class JoinOrganization:
    def __init__(
        self,
        organization_member_repository: OrganizationMemberRepository,
        id_provider: IdentityProvider,
        uow: UnitOfWork,
    ) -> None:
        self.organization_member_repository = organization_member_repository
        self.id_provider = id_provider
        self.uow = uow

    async def __call__(self, data: JoinOrganizationDTO) -> OrganizationMember:
        user_id = self.id_provider.get_current_user_id()
        async with self.uow:
            member = OrganizationMember(
                organization_id=data.org_id,
                user_id=user_id,
                role=UserRole.STUDENT,
            )
            return await self.organization_member_repository.create(member)
