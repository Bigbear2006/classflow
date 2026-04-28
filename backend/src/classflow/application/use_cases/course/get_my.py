from dataclasses import dataclass

from classflow.application.common.id_provider import IdentityProvider
from classflow.application.repositories.course import CourseRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import Course
from classflow.domain.enums import UserRole
from classflow.domain.exceptions import PermissionDeniedError


@dataclass
class GetMyCoursesDTO:
    teacher_id: int


class GetMyCourses:
    def __init__(
        self,
        course_repository: CourseRepository,
        id_provider: IdentityProvider,
        permission_service: PermissionService,
    ) -> None:
        self.course_repository = course_repository
        self.id_provider = id_provider
        self.permission_service = permission_service

    async def __call__(
        self,
    ) -> list[Course]:
        user_id = self.id_provider.get_current_user_id()
        role = await self.permission_service.get_current_role()
        if role == UserRole.STUDENT:
            return await self.course_repository.get_student_courses(user_id)
        elif role == UserRole.TEACHER:
            return await self.course_repository.get_teacher_courses(user_id)
        else:
            raise PermissionDeniedError()
