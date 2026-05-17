from typing import Protocol

from classflow.domain.entities import StudentGroup
from classflow.domain.enums import StudentStatus


class StudentGroupRepository(Protocol):
    async def create(self, student_group: StudentGroup) -> StudentGroup:
        pass

    async def get_students_count(self, group_id: int) -> int:
        pass

    async def update(
        self,
        student_id: int,
        group_id: int,
        *,
        status: StudentStatus,
    ) -> None:
        pass

    async def delete(self, student_id: int, group_id: int) -> None:
        pass
