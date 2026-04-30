from typing import Protocol

from classflow.domain.entities import StudentGroup


class StudentGroupRepository(Protocol):
    async def create(self, student_group: StudentGroup) -> StudentGroup:
        pass

    async def delete(self, student_id: int, group_id: int) -> None:
        pass
