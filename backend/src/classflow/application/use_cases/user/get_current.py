from classflow.application.common.id_provider import IdentityProvider
from classflow.domain.entities import User


class GetCurrentUser:
    def __init__(self, id_provider: IdentityProvider) -> None:
        self.id_provider = id_provider

    async def __call__(self) -> User:
        return await self.id_provider.get_current_user()
