from dataclasses import dataclass

from classflow.application.repositories.organization import (
    OrganizationRepository,
)
from classflow.domain.entities import Organization


@dataclass
class GetAllOrganizationsDTO:
    query: str | None = None


class GetAllOrganizations:
    def __init__(
        self,
        organization_repository: OrganizationRepository,
    ) -> None:
        self.organization_repository = organization_repository

    async def __call__(
        self,
        data: GetAllOrganizationsDTO,
    ) -> list[Organization]:
        return await self.organization_repository.get_all(data.query)
