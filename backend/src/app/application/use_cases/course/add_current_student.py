from dataclasses import dataclass

from app.application.common.id_provider import IdentityProvider
from app.application.common.uow import UnitOfWork
from app.application.repositories.course_teacher import CourseTeacherRepository
from app.application.repositories.course_teacher_student import (
    CourseTeacherStudentRepository,
)
from app.application.services.permission import PermissionService
from app.domain.entities import CourseTeacherStudent


@dataclass
class AddCurrentStudentToCourseDTO:
    course_id: int
    teacher_id: int


class AddCurrentStudentToCourse:
    def __init__(
        self,
        course_teacher_repo: CourseTeacherRepository,
        course_teacher_student_repo: CourseTeacherStudentRepository,
        id_provider: IdentityProvider,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.course_teacher_repo = course_teacher_repo
        self.course_teacher_student_repo = course_teacher_student_repo
        self.id_provider = id_provider
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(
        self,
        data: AddCurrentStudentToCourseDTO,
    ) -> CourseTeacherStudent:
        await self.permission_service.ensure_student()
        course_teacher = await self.course_teacher_repo.get(
            data.course_id,
            data.teacher_id,
        )
        student_id = self.id_provider.get_current_user_id()
        async with self.uow:
            course_teacher_student = CourseTeacherStudent(
                course_teacher_id=course_teacher.id,
                student_id=student_id,
            )
            return await self.course_teacher_student_repo.create(
                course_teacher_student,
            )
