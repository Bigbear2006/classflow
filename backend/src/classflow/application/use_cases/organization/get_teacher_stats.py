from classflow.application.repositories.organization_member import (
    OrganizationMemberRepository,
)
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import TeacherStats


class GetTeacherStats:
    def __init__(
        self,
        organization_member_repository: OrganizationMemberRepository,
        permission_service: PermissionService,
    ) -> None:
        self.organization_member_repository = organization_member_repository
        self.permission_service = permission_service

    async def __call__(self) -> TeacherStats:
        teacher = await self.permission_service.ensure_teacher()
        return await self.organization_member_repository.get_teacher_stats(
            teacher.id,
        )
