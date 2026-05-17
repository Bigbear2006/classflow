from dataclasses import dataclass

from classflow.application.repositories.course import CourseRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import Course
from classflow.domain.enums import CourseType
from classflow.domain.exceptions import NotAuthenticatedError, NotFoundError


@dataclass
class GetAllCoursesDTO:
    type: CourseType | None = None


class GetAllCourses:
    def __init__(
        self,
        course_repository: CourseRepository,
        permission_service: PermissionService,
    ) -> None:
        self.course_repository = course_repository
        self.permission_service = permission_service

    async def __call__(self, data: GetAllCoursesDTO) -> list[Course]:
        try:
            member = await self.permission_service.get_current_member()
            member_id = member.id
        except (NotFoundError, NotAuthenticatedError):
            member_id = None
        return await self.course_repository.get_all(
            current_member_id=member_id,
            type=data.type,
        )
