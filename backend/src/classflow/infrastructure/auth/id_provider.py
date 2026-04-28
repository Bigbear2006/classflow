from classflow.application.common.id_provider import IdentityProvider
from classflow.application.repositories.user import UserRepository
from classflow.domain.entities import User
from classflow.domain.exceptions import NotAuthenticatedError
from classflow.infrastructure.auth.token_parser import JWTTokenParser
from classflow.infrastructure.auth.token_processor import JWTTokenProcessor


class JWTTokenIdentityProvider(IdentityProvider):
    def __init__(
        self,
        token_processor: JWTTokenProcessor,
        token_parser: JWTTokenParser,
        user_repository: UserRepository,
    ) -> None:
        self.token_processor = token_processor
        self.token_parser = token_parser
        self.user_repository = user_repository

    def get_current_user_id(self) -> int:
        token = self.token_parser.parse()
        return self.token_processor.extract_user_id(token)

    async def get_current_user(self) -> User:
        user_id = self.get_current_user_id()
        user = await self.user_repository.get_by_id(user_id)
        if not user:
            raise NotAuthenticatedError()
        return user
