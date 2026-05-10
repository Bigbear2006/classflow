from dataclasses import dataclass

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.student_group import (
    StudentGroupRepository,
)
from classflow.application.services.permission import PermissionService
from classflow.domain.entities import StudentGroup


@dataclass
class AddCurrentStudentToGroupDTO:
    group_id: int


class AddCurrentStudentToGroup:
    def __init__(
        self,
        student_group_repository: StudentGroupRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.student_group_repository = student_group_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: AddCurrentStudentToGroupDTO) -> None:
        student = await self.permission_service.ensure_student()
        async with self.uow:
            student_group = StudentGroup(
                student_id=student.id,
                group_id=data.group_id,
            )
            await self.student_group_repository.create(student_group)
