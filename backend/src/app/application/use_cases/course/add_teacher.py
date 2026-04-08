from dataclasses import dataclass

from app.application.common.uow import UnitOfWork
from app.application.repositories.course_teacher import CourseTeacherRepository
from app.application.services.permission import PermissionService
from app.domain.entities import CourseTeacher


@dataclass
class AddTeacherToCourseDTO:
    course_id: int
    teacher_id: int


class AddTeacherToCourse:
    def __init__(
        self,
        course_teacher_repository: CourseTeacherRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.course_teacher_repository = course_teacher_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: AddTeacherToCourseDTO) -> CourseTeacher:
        await self.permission_service.ensure_admin_or_more()
        async with self.uow:
            course_teacher = CourseTeacher(
                course_id=data.course_id,
                teacher_id=data.teacher_id,
            )
            return self.course_teacher_repository.create(course_teacher)
