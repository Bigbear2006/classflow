from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from json import JSONDecodeError
from typing import Any

import httpx
import pytest
from alembic import command
from alembic.config import Config
from classflow.infrastructure.db.config import DatabaseConfig
from classflow.presentation.api.main import create_app
from httpx import URL, ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from tests.domain.entities.organization import (
    test_organization,
    test_organization_members,
)
from tests.domain.entities.user import test_owner, test_owner_password
from tests.infrastructure.di.container import test_container


@pytest.fixture(scope='session')
def anyio_backend() -> str:
    return 'asyncio'


@asynccontextmanager
async def setup_db(db_config: DatabaseConfig) -> AsyncIterator[None]:
    config = Config('alembic.ini')
    section = config.config_ini_section
    config.set_section_option(
        section,
        'SUPERUSER_DATABASE_URL',
        db_config.superuser_url,
    )
    config.set_section_option(
        section,
        'DB_NAME',
        db_config.NAME,
    )
    config.set_section_option(section, 'APP_USER', db_config.APP_USER)

    engine = create_async_engine(db_config.superuser_url)
    async with engine.connect() as conn:
        await conn.run_sync(lambda _: command.upgrade(config, 'head'))

    try:
        yield
    finally:
        async with engine.connect() as conn:
            await conn.run_sync(lambda _: command.downgrade(config, 'base'))


async def insert_test_data() -> None:
    sessionmaker = await test_container.get(async_sessionmaker[AsyncSession])
    async with sessionmaker() as session:
        session.add(test_owner)
        await session.flush()
        session.add(test_organization)
        await session.flush()
        session.add_all(test_organization_members)
        await session.commit()


class CustomAsyncClient(AsyncClient):
    async def request(
        self,
        method: str,
        url: URL | str,
        **kwargs: Any,
    ) -> httpx.Response:
        rsp = await super().request(method, url, **kwargs)

        try:
            data = rsp.json()
        except JSONDecodeError:
            data = ''

        print(f'{rsp.status_code} {method} {url}\n{data}\n')
        return rsp


@pytest.fixture(scope='session')
async def client() -> AsyncIterator[CustomAsyncClient]:
    db_config = test_container.get_sync(DatabaseConfig)
    app = create_app(test_container)

    async with setup_db(db_config):
        await insert_test_data()
        async with CustomAsyncClient(
            transport=ASGITransport(app=app),
            base_url=f'http://{test_organization.slug}.localhost/api/v1',
        ) as client:
            yield client


@pytest.fixture(scope='session')
async def owner_cookies(client: AsyncClient) -> dict[str, str]:
    rsp = await client.post(
        '/users/login/',
        json={'email': test_owner.email, 'password': test_owner_password},
    )
    return {'access': rsp.cookies['access']}
