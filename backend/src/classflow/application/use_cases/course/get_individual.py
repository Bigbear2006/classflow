from classflow.application.repositories.course import CourseRepository
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import Course
from classflow.domain.exceptions import PermissionDeniedError


class GetIndividualCourses:
    def __init__(
        self,
        course_repository: CourseRepository,
        permission_service: PermissionService,
    ) -> None:
        self.course_repository = course_repository
        self.permission_service = permission_service

    async def __call__(self) -> list[Course]:
        member = await self.permission_service.get_current_member()
        if member.is_admin_or_more:
            return await self.course_repository.get_individual_courses()
        elif member.is_teacher:
            return await self.course_repository.get_individual_courses(
                teacher_id=member.id,
            )
        else:
            raise PermissionDeniedError()
