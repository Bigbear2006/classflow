from dataclasses import dataclass

from app.application.common.org_id_provider import OrganizationIdProvider
from app.application.common.uow import UnitOfWork
from app.application.repositories.organization_member import (
    OrganizationMemberRepository,
)
from app.application.services.permission import PermissionService
from app.domain.entities import OrganizationMember
from app.domain.enums import UserRole
from app.domain.exceptions import PermissionDeniedError


@dataclass
class UpdateOrganizationMemberDTO:
    user_id: int
    role: UserRole


class UpdateOrganizationMember:
    def __init__(
        self,
        organization_member_repository: OrganizationMemberRepository,
        org_id_provider: OrganizationIdProvider,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.organization_member_repository = organization_member_repository
        self.org_id_provider = org_id_provider
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(
        self,
        data: UpdateOrganizationMemberDTO,
    ) -> OrganizationMember:
        if data.role == UserRole.OWNER:
            raise PermissionDeniedError()

        await self.permission_service.ensure_admin_or_more()
        if data.role == UserRole.ADMIN:
            await self.permission_service.ensure_owner()

        org_id = await self.org_id_provider.get_current_organization_id()
        async with self.uow:
            return await self.organization_member_repository.update(
                org_id,
                data.user_id,
                role=data.role,
            )
