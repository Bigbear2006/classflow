from dataclasses import dataclass

from classflow.application.repositories.course_teacher import (
    CourseTeacherRepository,
)
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import User


@dataclass
class GetCourseTeacherStudentsDTO:
    course_id: int
    teacher_id: int


class GetCourseTeacherStudents:
    def __init__(
        self,
        course_teacher_repository: CourseTeacherRepository,
        permission_service: PermissionService,
    ) -> None:
        self.course_teacher_repository = course_teacher_repository
        self.permission_service = permission_service

    async def __call__(self, data: GetCourseTeacherStudentsDTO) -> list[User]:
        await self.permission_service.ensure_teacher_or_more()
        return await self.course_teacher_repository.get_students(
            data.course_id,
            data.teacher_id,
        )
