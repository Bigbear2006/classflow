from dataclasses import dataclass

from classflow.application.common.org_id_provider import OrganizationIdProvider
from classflow.application.repositories.organization_member import (
    OrganizationMemberRepository,
)
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import OrganizationMember
from classflow.domain.enums import UserRole


@dataclass
class GetAllCurrentOrganizationMembersDTO:
    query: str | None = None
    roles: list[UserRole] | None = None


class GetAllCurrentOrganizationMembers:
    def __init__(
        self,
        organization_member_repository: OrganizationMemberRepository,
        org_id_provider: OrganizationIdProvider,
        permission_service: PermissionService,
    ) -> None:
        self.organization_member_repository = organization_member_repository
        self.org_id_provider = org_id_provider
        self.permission_service = permission_service

    async def __call__(
        self,
        data: GetAllCurrentOrganizationMembersDTO,
    ) -> list[OrganizationMember]:
        await self.permission_service.ensure_admin_or_more()
        org_id = await self.org_id_provider.get_current_organization_id()
        return (
            await self.organization_member_repository.get_organization_members(
                org_id,
                query=data.query,
                roles=data.roles,
            )
        )
