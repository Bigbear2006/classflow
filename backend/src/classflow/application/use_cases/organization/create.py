from dataclasses import dataclass

from classflow.application.common.id_provider import IdentityProvider
from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.organization import (
    OrganizationRepository,
)
from classflow.application.repositories.organization_member import (
    OrganizationMemberRepository,
)
from classflow.domain.entities import Organization, OrganizationMember
from classflow.domain.enums import UserRole
from classflow.domain.exceptions import AlreadyExistsError


@dataclass
class CreateOrganizationDTO:
    name: str
    slug: str


class CreateOrganization:
    def __init__(
        self,
        organization_repository: OrganizationRepository,
        organization_member_repository: OrganizationMemberRepository,
        id_provider: IdentityProvider,
        uow: UnitOfWork,
    ) -> None:
        self.organization_repository = organization_repository
        self.organization_member_repository = organization_member_repository
        self.id_provider = id_provider
        self.uow = uow

    async def __call__(self, data: CreateOrganizationDTO) -> Organization:
        current_user_id = self.id_provider.get_current_user_id()
        existing_org = (
            await self.organization_repository.get_user_organization(
                current_user_id,
            )
        )
        if existing_org:
            raise AlreadyExistsError(
                'You have already created an organization',
                organization_id=existing_org.id,
            )

        async with self.uow:
            org = Organization(
                name=data.name,
                slug=data.slug,
                created_by_id=current_user_id,
            )
            org = await self.organization_repository.create(org)
            member = OrganizationMember(
                organization_id=org.id,
                user_id=current_user_id,
                role=UserRole.OWNER,
            )
            await self.organization_member_repository.create(member)
            return org
