from dataclasses import dataclass

from app.application.common.uow import UnitOfWork
from app.application.repositories.course_teacher import CourseTeacherRepository
from app.application.services.permission import PermissionService


@dataclass
class DeleteTeacherFromCourseDTO:
    course_id: int
    teacher_id: int


class DeleteTeacherFromCourse:
    def __init__(
        self,
        course_teacher_repository: CourseTeacherRepository,
        uow: UnitOfWork,
        permission_service: PermissionService,
    ) -> None:
        self.course_teacher_repository = course_teacher_repository
        self.uow = uow
        self.permission_service = permission_service

    async def __call__(self, data: DeleteTeacherFromCourseDTO) -> None:
        await self.permission_service.ensure_admin_or_more()
        async with self.uow:
            return await self.course_teacher_repository.delete(
                data.course_id,
                data.teacher_id,
            )
