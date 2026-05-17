from dataclasses import dataclass

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.group import GroupRepository
from classflow.application.repositories.student_group import (
    StudentGroupRepository,
)
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import StudentGroup
from classflow.domain.exceptions import GroupStudentsLimitExceededError


@dataclass
class AddCurrentStudentToGroupDTO:
    group_id: int


class AddCurrentStudentToGroup:
    def __init__(
        self,
        group_repository: GroupRepository,
        student_group_repository: StudentGroupRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.group_repository = group_repository
        self.student_group_repository = student_group_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: AddCurrentStudentToGroupDTO) -> None:
        student = await self.permission_service.ensure_student()

        group = await self.group_repository.get_by_id(data.group_id)
        students_count = (
            await self.student_group_repository.get_students_count(student)
        )
        if students_count >= group.max_users_count:
            raise GroupStudentsLimitExceededError()

        async with self.uow:
            student_group = StudentGroup(
                student_id=student.id,
                group_id=data.group_id,
            )
            await self.student_group_repository.create(student_group)
