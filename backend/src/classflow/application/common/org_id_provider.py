from typing import Protocol

from classflow.domain.entities import Organization


class OrganizationIdProvider(Protocol):
    async def try_get_current_organization(self) -> Organization | None:
        pass

    async def get_current_organization(self) -> Organization:
        pass

    async def try_get_current_organization_id(self) -> int | None:
        pass

    async def get_current_organization_id(self) -> int:
        pass
