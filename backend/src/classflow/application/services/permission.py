from collections.abc import Sequence

from classflow.application.common.id_provider import IdentityProvider
from classflow.application.common.org_id_provider import OrganizationIdProvider
from classflow.application.repositories.organization_member import (
    OrganizationMemberRepository,
)
from classflow.domain.entities import OrganizationMember
from classflow.domain.enums import UserRole
from classflow.domain.exceptions import PermissionDeniedError


class PermissionService:
    _member: OrganizationMember | None

    def __init__(
        self,
        organization_member_repository: OrganizationMemberRepository,
        id_provider: IdentityProvider,
        org_id_provider: OrganizationIdProvider,
    ) -> None:
        self.organization_member_repository = organization_member_repository
        self.id_provider = id_provider
        self.org_id_provider = org_id_provider
        self._member = None

    async def get_current_member(self) -> OrganizationMember:
        if not self._member:
            user_id = self.id_provider.get_current_user_id()
            org_id = await self.org_id_provider.get_current_organization_id()
            member = await self.organization_member_repository.get(
                org_id,
                user_id,
            )
            self._member = member
        return self._member

    async def get_current_role(self) -> UserRole:
        if not self._member:
            await self.get_current_member()
        return self._member.role

    async def ensure_any_role(
        self,
        roles: Sequence[UserRole],
    ) -> OrganizationMember:
        member = await self.get_current_member()
        if not member.has_any_role(roles):
            raise PermissionDeniedError()
        return member

    async def ensure_owner(self) -> OrganizationMember:
        return await self.ensure_any_role([UserRole.OWNER])

    async def ensure_admin_or_more(self) -> OrganizationMember:
        return await self.ensure_any_role([UserRole.ADMIN, UserRole.OWNER])

    async def ensure_teacher_or_more(self) -> OrganizationMember:
        return await self.ensure_any_role(
            [UserRole.TEACHER, UserRole.ADMIN, UserRole.OWNER],
        )

    async def ensure_student(self) -> OrganizationMember:
        return await self.ensure_any_role([UserRole.STUDENT])
