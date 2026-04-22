from typing import Protocol

from app.domain.entities import OrganizationMember
from app.domain.enums import UserRole


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
