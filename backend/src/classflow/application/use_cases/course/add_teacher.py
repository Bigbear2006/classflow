from dataclasses import dataclass

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.course_teacher import (
    CourseTeacherRepository,
)
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import CourseTeacher


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
            return await self.course_teacher_repository.create(course_teacher)
