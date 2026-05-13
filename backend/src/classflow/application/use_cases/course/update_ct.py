from dataclasses import dataclass

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.course_teacher import (
    CourseTeacherRepository,
)
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import CourseTeacher
from classflow.domain.enums import CourseTeacherStatus
from classflow.domain.exceptions import PermissionDeniedError


@dataclass
class UpdateCourseTeacherDTO:
    course_id: int
    teacher_id: int
    status: CourseTeacherStatus


class UpdateCourseTeacher:
    def __init__(
        self,
        course_teacher_repository: CourseTeacherRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.course_teacher_repository = course_teacher_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: UpdateCourseTeacherDTO) -> CourseTeacher:
        member = await self.permission_service.ensure_teacher_or_more()
        if member.is_teacher:
            if (
                data.teacher_id != member.id
                or data.status == CourseTeacherStatus.DELETED
            ):
                raise PermissionDeniedError()

            course_teacher = await self.course_teacher_repository.get(
                data.course_id,
                data.teacher_id,
            )
            if course_teacher.status == CourseTeacherStatus.DELETED:
                raise PermissionDeniedError()

        async with self.uow:
            return await self.course_teacher_repository.update(
                data.course_id,
                data.teacher_id,
                status=data.status,
            )
