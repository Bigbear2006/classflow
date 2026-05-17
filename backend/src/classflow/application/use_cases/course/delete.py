from dataclasses import dataclass

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.course import CourseRepository
from classflow.application.repositories.course_teacher import (
    CourseTeacherRepository,
)
from classflow.application.services.permission import PermissionService


@dataclass
class DeleteCourseDTO:
    id: int


class DeleteCourse:
    def __init__(
        self,
        course_repository: CourseRepository,
        course_teacher_repository: CourseTeacherRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.course_repository = course_repository
        self.course_teacher_repository = course_teacher_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: DeleteCourseDTO) -> None:
        await self.permission_service.ensure_admin_or_more()
        async with self.uow:
            await self.course_teacher_repository.delete_inactive(data.id)
            await self.course_repository.delete(data.id)
