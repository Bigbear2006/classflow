from dishka import make_async_container
from dishka.integrations.fastapi import FastapiProvider

from app.infrastructure.di.providers.auth import AuthProvider
from app.infrastructure.di.providers.database import DatabaseProvider
from app.infrastructure.di.providers.repositories import RepositoriesProvider
from app.infrastructure.di.providers.services import ServicesProvider
from app.infrastructure.di.providers.uow import UnitOfWorkProvider
from app.infrastructure.di.providers.use_cases import UseCasesProvider

providers = [
    FastapiProvider(),
    DatabaseProvider(),
    UnitOfWorkProvider(),
    RepositoriesProvider(),
    UseCasesProvider(),
    ServicesProvider(),
    AuthProvider(),
]
container = make_async_container(*providers)
