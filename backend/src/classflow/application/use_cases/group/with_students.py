from dataclasses import dataclass

from classflow.application.repositories.group import GroupRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import Group
from classflow.domain.exceptions import PermissionDeniedError


@dataclass
class GetGroupsWithStudentsDTO:
    course_id: int | None = None


class GetGroupsWithStudents:
    def __init__(
        self,
        group_repository: GroupRepository,
        permission_service: PermissionService,
    ):
        self.group_repository = group_repository
        self.permission_service = permission_service

    async def __call__(self, data: GetGroupsWithStudentsDTO) -> list[Group]:
        member = await self.permission_service.get_current_member()
        if member.is_admin_or_more:
            return await self.group_repository.get_groups_with_students(
                course_id=data.course_id,
            )
        elif member.is_teacher:
            return await self.group_repository.get_groups_with_students(
                teacher_id=member.id,
                course_id=data.course_id,
            )
        else:
            raise PermissionDeniedError()
