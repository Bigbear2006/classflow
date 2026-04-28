from dataclasses import dataclass

from classflow.application.repositories.course import CourseRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import Group


@dataclass
class GetCourseGroupsDTO:
    course_id: int


class GetCourseGroups:
    def __init__(
        self,
        course_repository: CourseRepository,
        permission_service: PermissionService,
    ):
        self.course_repository = course_repository
        self.permission_service = permission_service

    async def __call__(self, data: GetCourseGroupsDTO) -> list[Group]:
        await self.permission_service.ensure_admin_or_more()
        return await self.course_repository.get_groups(data.course_id)
