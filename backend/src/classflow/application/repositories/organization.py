from typing import Protocol

from classflow.domain.entities import (
    Organization,
    OrganizationStats,
    RoleCount,
)


class OrganizationRepository(Protocol):
    async def create(self, org: Organization) -> Organization:
        pass

    async def update(
        self,
        id: int,
        name: str | None = None,
        slug: str | None = None,
    ) -> Organization:
        pass

    async def get_all(self) -> list[Organization]:
        pass

    async def search(self, query: str) -> list[Organization]:
        pass

    async def get_by_slug(self, slug: str) -> Organization | None:
        pass

    async def get_user_organization(self, user_id: int) -> Organization | None:
        pass

    async def get_user_organizations(self, user_id: int) -> list[Organization]:
        pass

    async def get_role_counts(self, org_id: int) -> list[RoleCount]:
        pass

    async def get_stats(self, org_id: int) -> OrganizationStats:
        pass
