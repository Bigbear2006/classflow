from dataclasses import dataclass

from classflow.application.common.uow import UnitOfWork
from classflow.application.repositories.student_group import (
    StudentGroupRepository,
)
from classflow.application.services.permission import PermissionService
from classflow.domain.enums import StudentStatus


@dataclass
class UpdateStudentGroupDTO:
    student_id: int
    group_id: int
    status: StudentStatus


class UpdateStudentGroup:
    def __init__(
        self,
        student_group_repository: StudentGroupRepository,
        permission_service: PermissionService,
        uow: UnitOfWork,
    ) -> None:
        self.student_group_repository = student_group_repository
        self.permission_service = permission_service
        self.uow = uow

    async def __call__(self, data: UpdateStudentGroupDTO) -> None:
        await self.permission_service.ensure_admin_or_more()
        async with self.uow:
            return await self.student_group_repository.update(
                data.student_id,
                data.group_id,
                status=data.status,
            )
