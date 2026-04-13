from collections.abc import Sequence

from app.application.common.id_provider import IdentityProvider
from app.application.common.org_id_provider import OrganizationIdProvider
from app.application.repositories.organization_member import (
    OrganizationMemberRepository,
)
from app.domain.enums import UserRole
from app.domain.exceptions import PermissionDeniedError


class PermissionService:
    _current_role: UserRole | None

    def __init__(
        self,
        organization_member_repository: OrganizationMemberRepository,
        id_provider: IdentityProvider,
        org_id_provider: OrganizationIdProvider,
    ) -> None:
        self.organization_member_repository = organization_member_repository
        self.id_provider = id_provider
        self.org_id_provider = org_id_provider
        self._current_role = None

    async def get_current_role(self) -> UserRole:
        if not self._current_role:
            current_user_id = self.id_provider.get_current_user_id()
            current_org_id = (
                await self.org_id_provider.get_current_organization_id()
            )
            member = await self.organization_member_repository.get(
                current_org_id,
                current_user_id,
            )
            self._current_role = member.role
        return self._current_role

    async def ensure_role(self, required_roles: Sequence[UserRole]) -> None:
        current_role = await self.get_current_role()
        if current_role not in required_roles:
            raise PermissionDeniedError()

    async def ensure_owner(self) -> None:
        await self.ensure_role([UserRole.OWNER])

    async def ensure_admin_or_more(self) -> None:
        await self.ensure_role([UserRole.ADMIN, UserRole.OWNER])

    async def ensure_teacher_or_more(self) -> None:
        await self.ensure_role(
            [UserRole.TEACHER, UserRole.ADMIN, UserRole.OWNER],
        )

    async def ensure_student(self) -> None:
        await self.ensure_role([UserRole.STUDENT])
