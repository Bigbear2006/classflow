from classflow.application.common.org_id_provider import OrganizationIdProvider
from classflow.domain.entities import Organization


class GetCurrentOrganization:
    def __init__(self, org_id_provider: OrganizationIdProvider) -> None:
        self.org_id_provider = org_id_provider

    async def __call__(self) -> Organization:
        return await self.org_id_provider.get_current_organization()
