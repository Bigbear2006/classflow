from app.application.common.id_provider import IdentityProvider
from app.application.repositories.organization import OrganizationRepository
from app.domain.entities import Organization


class GetMyOrganizations:
    def __init__(
        self,
        organization_repository: OrganizationRepository,
        id_provider: IdentityProvider,
    ) -> None:
        self.organization_repository = organization_repository
        self.id_provider = id_provider

    async def __call__(self) -> list[Organization]:
        user_id = self.id_provider.get_current_user_id()
        return await self.organization_repository.get_user_organizations(
            user_id,
        )
