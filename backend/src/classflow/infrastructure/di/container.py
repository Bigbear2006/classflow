from dishka import make_async_container
from dishka.integrations.fastapi import FastapiProvider

from classflow.infrastructure.di.providers.auth import AuthProvider
from classflow.infrastructure.di.providers.database import DatabaseProvider
from classflow.infrastructure.di.providers.redis import RedisProvider
from classflow.infrastructure.di.providers.repositories import (
    RepositoriesProvider,
)
from classflow.infrastructure.di.providers.services import ServicesProvider
from classflow.infrastructure.di.providers.storage import StorageProvider
from classflow.infrastructure.di.providers.uow import UnitOfWorkProvider
from classflow.infrastructure.di.providers.use_cases import UseCasesProvider
from classflow.infrastructure.di.providers.verification import (
    VerificationProvider,
)

providers = [
    FastapiProvider(),
    DatabaseProvider(),
    RedisProvider(),
    UnitOfWorkProvider(),
    RepositoriesProvider(),
    UseCasesProvider(),
    ServicesProvider(),
    AuthProvider(),
    StorageProvider(),
    VerificationProvider(),
]
container = make_async_container(*providers)
