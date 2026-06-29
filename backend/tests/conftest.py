from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from json import JSONDecodeError
from typing import Any

import httpx
import pytest
from alembic import command
from alembic.config import Config
from classflow.infrastructure.db.config import DatabaseConfig
from classflow.infrastructure.db.repositories.base import set_current_org_id
from classflow.presentation.api.main import create_app
from httpx import URL, ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from tests.domain.entities.address import test_address
from tests.domain.entities.organization import (
    test_organization,
    test_organization_members,
)
from tests.domain.entities.user import (
    test_admin,
    test_admin_password,
    test_owner,
    test_owner_password,
    test_student,
    test_student_password,
    test_teacher,
    test_teacher_password,
    test_user,
    test_user_password,
    test_users,
)
from tests.infrastructure.di.container import test_container


@pytest.fixture(scope='session')
def anyio_backend() -> str:
    return 'asyncio'


@pytest.fixture(scope='session', autouse=True)
async def setup_db() -> AsyncIterator[None]:
    db_config = test_container.get_sync(DatabaseConfig)

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

    await insert_test_data()
    try:
        yield
    finally:
        async with engine.connect() as conn:
            await conn.run_sync(lambda _: command.downgrade(config, 'base'))


async def insert_test_data() -> None:
    sessionmaker = await test_container.get(async_sessionmaker[AsyncSession])
    async with sessionmaker() as session:
        session.add_all(test_users)
        session.add(test_organization)
        await session.flush()
        session.add_all(test_organization_members)
        await set_current_org_id(session, test_organization.id)
        session.add(test_address)
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


@asynccontextmanager
async def create_test_client() -> AsyncIterator[CustomAsyncClient]:
    app = create_app(test_container)
    async with CustomAsyncClient(
        transport=ASGITransport(app=app),
        base_url=f'http://{test_organization.slug}.localhost/api/v1',
    ) as client:
        yield client


@pytest.fixture(scope='function')
async def client() -> AsyncIterator[CustomAsyncClient]:
    async with create_test_client() as client:
        yield client


async def _get_auth_cookies(email: str, password: str) -> dict[str, str]:
    async with create_test_client() as client:
        rsp = await client.post(
            '/users/login/',
            json={'email': email, 'password': password},
        )
        return {'access': rsp.cookies['access']}


@pytest.fixture(scope='session')
async def owner_cookies() -> dict[str, str]:
    return await _get_auth_cookies(test_owner.email, test_owner_password)


@pytest.fixture(scope='session')
async def admin_cookies() -> dict[str, str]:
    return await _get_auth_cookies(test_admin.email, test_admin_password)


@pytest.fixture(scope='session')
async def teacher_cookies() -> dict[str, str]:
    return await _get_auth_cookies(test_teacher.email, test_teacher_password)


@pytest.fixture(scope='session')
async def student_cookies() -> dict[str, str]:
    return await _get_auth_cookies(test_student.email, test_student_password)


@pytest.fixture(scope='session')
async def user_cookies() -> dict[str, str]:
    return await _get_auth_cookies(test_user.email, test_user_password)
