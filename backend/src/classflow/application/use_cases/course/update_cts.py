from dataclasses import dataclass

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.course_teacher import (
    CourseTeacherRepository,
)
from classflow.application.repositories.course_teacher_student import (
    CourseTeacherStudentRepository,
)
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import CourseTeacherStudent
from classflow.domain.enums import StudentStatus
from classflow.domain.exceptions import PermissionDeniedError


@dataclass
class UpdateCourseTeacherStudentDTO:
    course_id: int
    teacher_id: int
    student_id: int
    status: StudentStatus


class UpdateCourseTeacherStudent:
    def __init__(
        self,
        course_teacher_student_repository: CourseTeacherStudentRepository,
        course_teacher_repository: CourseTeacherRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.course_teacher_student_repository = (
            course_teacher_student_repository
        )
        self.course_teacher_repository = course_teacher_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(
        self,
        data: UpdateCourseTeacherStudentDTO,
    ) -> CourseTeacherStudent:
        member = await self.permission_service.ensure_teacher_or_more()
        if member.is_teacher and data.teacher_id != member.id:
            raise PermissionDeniedError()

        course_teacher = await self.course_teacher_repository.get(
            data.course_id,
            data.teacher_id,
        )
        async with self.uow:
            return await self.course_teacher_student_repository.update(
                course_teacher.id,
                data.student_id,
                status=data.status,
            )
