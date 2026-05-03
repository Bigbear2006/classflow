from typing import Annotated

from dishka import FromDishka
from dishka.integrations.fastapi import DishkaRoute
from fastapi import APIRouter
from fastapi.params import Depends, Query

from classflow.application.use_cases.organization import (
    CreateOrganization,
    CreateOrganizationDTO,
    GetAllCurrentOrganizationMembers,
    GetAllCurrentOrganizationMembersDTO,
    GetAllOrganizations,
    GetAllOrganizationsDTO,
    GetCurrentOrganization,
    GetCurrentOrganizationMember,
    GetMyOrganizations,
    GetOrganizationStats,
    GetRoleCounts,
    JoinOrganization,
    UpdateOrganizationMember,
    UpdateOrganizationMemberDTO,
)
from classflow.domain.entities import OrganizationStats, RoleCount
from classflow.domain.enums import UserRole
from classflow.presentation.api.common.cookie import cookie_scheme
from classflow.presentation.api.routers.organization.models import (
    MyOrganizationResponse,
    OrganizationMemberDetailResponse,
    OrganizationMemberResponse,
    OrganizationResponse,
    UpdateOrganizationMemberRequest,
)

organization_router = APIRouter(
    prefix='/organizations',
    route_class=DishkaRoute,
    tags=['organizations'],
)


@organization_router.post(
    '/',
    status_code=201,
    dependencies=[Depends(cookie_scheme)],
)
async def create_organization_router(
    data: CreateOrganizationDTO,
    create_organization: FromDishka[CreateOrganization],
) -> OrganizationResponse:
    org = await create_organization(data)
    return OrganizationResponse.model_validate(org)


@organization_router.get('/')
async def get_organizations_router(
    get_all_organizations: FromDishka[GetAllOrganizations],
    query: str | None = None,
) -> list[OrganizationResponse]:
    dto = GetAllOrganizationsDTO(query=query)
    orgs = await get_all_organizations(dto)
    return [OrganizationResponse.model_validate(org) for org in orgs]


@organization_router.get('/current/')
async def get_current_organization_router(
    get_current_organization: FromDishka[GetCurrentOrganization],
) -> OrganizationResponse:
    org = await get_current_organization()
    return OrganizationResponse.model_validate(org)


@organization_router.get('/current/roles/')
async def get_current_organization_role_counts_router(
    get_role_counts: FromDishka[GetRoleCounts],
) -> list[RoleCount]:
    return await get_role_counts()


@organization_router.get('/current/stats/')
async def get_current_organization_stats_router(
    get_stats: FromDishka[GetOrganizationStats],
) -> OrganizationStats:
    return await get_stats()


@organization_router.get('/my/', dependencies=[Depends(cookie_scheme)])
async def get_my_organizations_router(
    get_my_organizations: FromDishka[GetMyOrganizations],
) -> list[MyOrganizationResponse]:
    orgs = await get_my_organizations()
    return [MyOrganizationResponse.model_validate(org) for org in orgs]


@organization_router.post('/current/members/', status_code=201)
async def join_organization_router(
    join_organization: FromDishka[JoinOrganization],
) -> OrganizationMemberResponse:
    member = await join_organization()
    return OrganizationMemberResponse.model_validate(member)


@organization_router.get('/current/members/')
async def get_current_organization_members_router(
    get_all_organization_members: FromDishka[GetAllCurrentOrganizationMembers],
    query: str | None = None,
    roles: Annotated[list[UserRole] | None, Query()] = None,
) -> list[OrganizationMemberDetailResponse]:
    dto = GetAllCurrentOrganizationMembersDTO(query=query, roles=roles)
    members = await get_all_organization_members(dto)
    return [
        OrganizationMemberDetailResponse.model_validate(member)
        for member in members
    ]


@organization_router.get('/current/members/me/')
async def get_current_organization_member_router(
    get_organization_member: FromDishka[GetCurrentOrganizationMember],
) -> OrganizationMemberResponse:
    member = await get_organization_member()
    return OrganizationMemberResponse.model_validate(member)


@organization_router.patch('/current/members/{user_id}/')
async def update_organization_member_router(
    user_id: int,
    data: UpdateOrganizationMemberRequest,
    update_org_member: FromDishka[UpdateOrganizationMember],
) -> OrganizationMemberResponse:
    dto = UpdateOrganizationMemberDTO(user_id, data.role)
    member = await update_org_member(dto)
    return OrganizationMemberResponse.model_validate(member)
