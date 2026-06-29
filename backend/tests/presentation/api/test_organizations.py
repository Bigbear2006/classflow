from dataclasses import asdict

import pytest
from classflow.application.use_cases.organization import (
    CreateOrganizationDTO,
    UpdateCurrentOrganizationDTO,
)
from classflow.domain.entities import (
    OrganizationStats,
    StudentStats,
    TeacherStats,
)
from classflow.domain.enums import UserRole
from classflow.presentation.api.routers.organization.models import (
    UpdateOrganizationMemberRequest,
)
from httpx import AsyncClient

from tests.domain.entities.organization import test_organization
from tests.domain.entities.user import test_owner, test_user


@pytest.mark.anyio
async def test_organizations(
    client: AsyncClient,
    owner_cookies: dict[str, str],
    teacher_cookies: dict[str, str],
    student_cookies: dict[str, str],
    user_cookies: dict[str, str],
) -> None:
    create_dto = CreateOrganizationDTO(
        name='Second Test Organization', slug='test2'
    )
    rsp = await client.post(
        '/organizations/', json=asdict(create_dto), cookies=user_cookies
    )
    assert rsp.status_code == 201
    data = rsp.json()
    second_org_id = data['id']
    assert data['name'] == create_dto.name
    assert data['slug'] == create_dto.slug

    rsp = await client.get('/organizations/')
    assert rsp.status_code == 200
    data = rsp.json()
    assert len(data) > 1
    assert any(org['id'] == second_org_id for org in data)

    rsp = await client.get('/organizations/', params={'query': 'secnd test'})
    assert rsp.status_code == 200
    assert any(org['id'] == second_org_id for org in rsp.json())

    rsp = await client.get('/organizations/current/')
    assert rsp.status_code == 200
    data = rsp.json()
    assert data['name'] == test_organization.name
    assert data['slug'] == test_organization.slug
    assert data['created_by_id'] == test_organization.created_by_id

    client.cookies.update(owner_cookies)

    update_dto = UpdateCurrentOrganizationDTO(
        name='Updated Test Organization',
        slug=test_organization.slug,
    )
    test_organization.name = update_dto.name
    rsp = await client.put('/organizations/current/', json=asdict(update_dto))
    assert rsp.status_code == 200
    data = rsp.json()
    assert data['name'] == update_dto.name
    assert data['slug'] == update_dto.slug

    rsp = await client.get('/organizations/current/roles/')
    assert rsp.status_code == 200
    assert any(
        role_count['role'] == UserRole.OWNER and role_count['count'] == 1
        for role_count in rsp.json()
    )

    rsp = await client.get('/organizations/current/stats/')
    assert rsp.status_code == 200
    OrganizationStats(**rsp.json())

    rsp = await client.get('/organizations/my/')
    assert rsp.status_code == 200
    data = rsp.json()
    assert len(data) == 1
    assert data[0]['name'] == test_organization.name
    assert data[0]['role'] == UserRole.OWNER

    rsp = await client.post(
        f'/organizations/{test_organization.id}/members/', cookies=user_cookies
    )
    assert rsp.status_code == 201
    data = rsp.json()
    assert data['user_id'] == test_user.id

    rsp = await client.get('/organizations/current/members/')
    assert rsp.status_code == 200
    assert any(member['user']['id'] == test_owner.id for member in rsp.json())

    rsp = await client.get('/organizations/current/members/me/')
    data = rsp.json()
    assert data['role'] == UserRole.OWNER

    rsp = await client.get(
        '/organizations/current/members/me/student/stats/',
        cookies=student_cookies,
    )
    assert rsp.status_code == 200
    StudentStats(*rsp.json())

    rsp = await client.get(
        '/organizations/current/members/me/teacher/stats/',
        cookies=teacher_cookies,
    )
    assert rsp.status_code == 200
    TeacherStats(*rsp.json())

    update_member_dto = UpdateOrganizationMemberRequest(role=UserRole.ADMIN)
    rsp = await client.patch(
        f'/organizations/current/members/{test_user.id}/',
        json=update_member_dto.model_dump(),
    )
    assert rsp.status_code == 200
    data = rsp.json()
    assert data['user_id'] == test_user.id
    assert data['role'] == UserRole.ADMIN
