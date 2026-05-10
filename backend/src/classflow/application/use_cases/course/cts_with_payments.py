from classflow.application.repositories.course_teacher_student import (
    CourseTeacherStudentRepository,
)
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import CourseTeacherStudent


class GetCourseTeacherStudentsWithPayments:
    def __init__(
        self,
        course_teacher_student_repository: CourseTeacherStudentRepository,
        permission_service: PermissionService,
    ) -> None:
        self.course_teacher_student_repository = (
            course_teacher_student_repository
        )
        self.permission_service = permission_service

    async def __call__(self) -> list[CourseTeacherStudent]:
        await self.permission_service.ensure_admin_or_more()
        return await self.course_teacher_student_repository.get_with_payments()
