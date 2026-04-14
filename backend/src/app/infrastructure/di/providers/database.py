from collections.abc import AsyncIterable
from typing import cast

from dishka import Provider, Scope, provide
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from app.application.common.org_id_provider import OrganizationIdProvider
from app.infrastructure.db.config import DatabaseConfig
from app.infrastructure.db.models import RawSession
from app.infrastructure.db.repositories.base import set_current_org_id


class DatabaseProvider(Provider):
    @provide(scope=Scope.APP)
    def provide_database_config(self) -> DatabaseConfig:
        return DatabaseConfig()

    @provide(scope=Scope.APP)
    def provide_engine(self, db_config: DatabaseConfig) -> AsyncEngine:
        return create_async_engine(db_config.url)

    @provide(scope=Scope.APP)
    def provide_sessionmaker(
        self,
        engine: AsyncEngine,
    ) -> async_sessionmaker[AsyncSession]:
        return async_sessionmaker(
            engine,
            class_=AsyncSession,
            expire_on_commit=False,
        )

    @provide(scope=Scope.REQUEST)
    async def provide_raw_session(
        self,
        sessionmaker: async_sessionmaker[AsyncSession],
    ) -> AsyncIterable[RawSession]:
        async with sessionmaker() as session:
            yield cast(RawSession, session)

    @provide(scope=Scope.REQUEST)
    async def provide_session(
        self,
        raw_session: RawSession,
        org_id_provider: OrganizationIdProvider,
    ) -> AsyncIterable[AsyncSession]:
        org_id = await org_id_provider.try_get_current_organization_id()
        if org_id:
            await set_current_org_id(raw_session, org_id)
        yield raw_session
