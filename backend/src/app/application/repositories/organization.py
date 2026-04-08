from typing import Protocol

from app.domain.entities import Organization


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
