from typing import Protocol

from classflow.domain.entities import (
    OrganizationMember,
    StudentStats,
    TeacherStats,
)
from classflow.domain.enums import UserRole


class OrganizationMemberRepository(Protocol):
    async def create(self, member: OrganizationMember) -> OrganizationMember:
        pass

    async def update(
        self,
        org_id: int,
        user_id: int,
        *,
        role: UserRole,
    ) -> OrganizationMember:
        pass

    async def get(
        self,
        org_id: int,
        user_id: int,
    ) -> OrganizationMember:
        pass

    async def get_organization_members(
        self,
        org_id: int,
        *,
        query: str | None = None,
        roles: list[UserRole] | None = None,
    ) -> list[OrganizationMember]:
        pass

    async def get_student_stats(self, student_id: int) -> StudentStats:
        pass

    async def get_teacher_stats(self, teacher_id: int) -> TeacherStats:
        pass
