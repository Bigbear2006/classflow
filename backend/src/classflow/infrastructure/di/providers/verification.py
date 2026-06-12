from collections.abc import AsyncGenerator

from aiohttp import ClientSession
from dishka import Provider, Scope, provide
from redis.asyncio import Redis

from classflow.application.verification.data_generator import (
    VerificationDataGenerator,
)
from classflow.application.verification.email_sender import EmailSender
from classflow.application.verification.repository import (
    VerificationDataRepository,
)
from classflow.infrastructure.verification.config import EmailConfig
from classflow.infrastructure.verification.data_generator import (
    VerificationDataGeneratorImpl,
)
from classflow.infrastructure.verification.email_sender import (
    NotiSendEmailSender,
)
from classflow.infrastructure.verification.repository import (
    RedisVerificationDataRepository,
)


class VerificationProvider(Provider):
    @provide(scope=Scope.APP)
    def provide_email_config(self) -> EmailConfig:
        return EmailConfig()

    @provide(scope=Scope.REQUEST)
    async def provider_session(
        self,
        config: EmailConfig,
    ) -> AsyncGenerator[ClientSession]:
        async with ClientSession(
            'https://api.notisend.ru/v1/email/',
            headers={'Authorization': f'Bearer {config.NOTI_SEND_API_KEY}'},
        ) as session:
            yield session

    @provide(scope=Scope.REQUEST)
    def provider_email_sender(
        self,
        session: ClientSession,
        config: EmailConfig,
    ) -> EmailSender:
        return NotiSendEmailSender(session, from_email=config.FROM_EMAIL)

    @provide(scope=Scope.APP)
    def provide_data_generator(self) -> VerificationDataGenerator:
        return VerificationDataGeneratorImpl()

    @provide(scope=Scope.APP)
    def provide_repository(self, redis: Redis) -> VerificationDataRepository:  # type: ignore[type-arg]
        return RedisVerificationDataRepository(redis)
