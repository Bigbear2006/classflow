import argon2
from dishka import Provider, Scope, provide
from fastapi import Request

from classflow.application.common.id_provider import IdentityProvider
from classflow.application.common.org_id_provider import OrganizationIdProvider
from classflow.application.common.password_hasher import PasswordHasher
from classflow.application.repositories.user import UserRepository
from classflow.infrastructure.auth.config import JWTConfig
from classflow.infrastructure.auth.id_provider import JWTTokenIdentityProvider
from classflow.infrastructure.auth.org_id_provider import (
    SubdomainOrganizationIdProvider,
)
from classflow.infrastructure.auth.password_hasher import PasswordHasherImpl
from classflow.infrastructure.auth.token_parser import JWTTokenParser
from classflow.infrastructure.auth.token_processor import JWTTokenProcessor


class AuthProvider(Provider):
    org_id_provider = provide(
        SubdomainOrganizationIdProvider,
        scope=Scope.REQUEST,
        provides=OrganizationIdProvider,
    )

    @provide(scope=Scope.APP)
    def provide_jwt_config(self) -> JWTConfig:
        return JWTConfig()

    @provide(scope=Scope.APP)
    def provide_jwt_token_processor(
        self,
        jwt_config: JWTConfig,
    ) -> JWTTokenProcessor:
        return JWTTokenProcessor(
            jwt_config.SECRET_KEY,
            expires=jwt_config.EXPIRATION,
            algorithm=jwt_config.ALGORITHM,
        )

    @provide(scope=Scope.REQUEST)
    def provide_jwt_token_parser(self, request: Request) -> JWTTokenParser:
        return JWTTokenParser(request)

    @provide(scope=Scope.REQUEST)
    def provide_identity_provider(
        self,
        token_processor: JWTTokenProcessor,
        token_parser: JWTTokenParser,
        user_repository: UserRepository,
    ) -> IdentityProvider:
        return JWTTokenIdentityProvider(
            token_processor,
            token_parser,
            user_repository,
        )

    @provide(scope=Scope.APP)
    def provide_password_hasher(self) -> PasswordHasher:
        return PasswordHasherImpl(argon2.PasswordHasher())
