from dataclasses import dataclass

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.course_teacher import (
    CourseTeacherRepository,
)
from classflow.application.repositories.group import GroupRepository
from classflow.application.repositories.student_group import (
    StudentGroupRepository,
)
from classflow.application.services.permission import PermissionService
from classflow.domain.enums import StudentStatus
from classflow.domain.exceptions import (
    GroupStudentsLimitExceededError,
    PermissionDeniedError,
)


@dataclass
class UpdateStudentGroupDTO:
    student_id: int
    group_id: int
    status: StudentStatus


class UpdateStudentGroup:
    def __init__(
        self,
        group_repository: GroupRepository,
        student_group_repository: StudentGroupRepository,
        course_teacher_repository: CourseTeacherRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.group_repository = group_repository
        self.student_group_repository = student_group_repository
        self.course_teacher_repository = course_teacher_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: UpdateStudentGroupDTO) -> None:
        member = await self.permission_service.ensure_teacher_or_more()

        if member.is_teacher:
            group = await self.group_repository.get_by_id(data.group_id)
            course_teacher_exists = self.course_teacher_repository.exists(
                group.course_id,
                member.id,
            )
            if not course_teacher_exists:
                raise PermissionDeniedError()

        if data.status == StudentStatus.ACTIVE:
            group = await self.group_repository.get_by_id(data.group_id)
            students_count = (
                await self.student_group_repository.get_students_count(
                    group.id,
                )
            )
            if students_count >= group.max_users_count:
                raise GroupStudentsLimitExceededError()

        async with self.uow:
            return await self.student_group_repository.update(
                data.student_id,
                data.group_id,
                status=data.status,
            )
