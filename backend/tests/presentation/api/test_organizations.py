import pytest
from classflow.domain.enums import UserRole
from httpx import AsyncClient

from tests.domain.entities.organization import test_organization


@pytest.mark.anyio
async def test_organizations(
    client: AsyncClient,
    owner_cookies: dict[str, str],
) -> None:
    rsp = await client.get('/organizations/current/')
    data = rsp.json()
    assert data['name'] == test_organization.name
    assert data['slug'] == test_organization.slug
    assert data['created_by_id'] == test_organization.created_by_id

    rsp = await client.get(
        '/organizations/current/members/me/',
        cookies=owner_cookies,
    )
    data = rsp.json()
    assert data['role'] == UserRole.OWNER

    rsp = await client.get('/organizations/my/', cookies=owner_cookies)
    assert rsp.status_code == 200
    data = rsp.json()
    assert len(data) == 1
    assert data[0]['name'] == test_organization.name
    assert data[0]['role'] == UserRole.OWNER
