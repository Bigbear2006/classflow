from classflow.application.repositories.course_teacher_student import (
    CourseTeacherStudentRepository,
)
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import CourseTeacherStudent
from classflow.domain.exceptions import PermissionDeniedError


class GetCourseTeacherStudentsWithPayments:
    def __init__(
        self,
        cts_repository: CourseTeacherStudentRepository,
        permission_service: PermissionService,
    ) -> None:
        self.cts_repository = cts_repository
        self.permission_service = permission_service

    async def __call__(self) -> list[CourseTeacherStudent]:
        member = await self.permission_service.get_current_member()
        if member.is_admin_or_more:
            return await self.cts_repository.get_with_payments()
        if member.is_teacher:
            return await self.cts_repository.get_with_payments(
                teacher_id=member.id,
            )
        if member.is_student:
            return await self.cts_repository.get_with_payments(
                student_id=member.id,
            )
        raise PermissionDeniedError()
