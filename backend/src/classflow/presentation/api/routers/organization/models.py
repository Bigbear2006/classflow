from datetime import datetime

from pydantic import BaseModel, ConfigDict

from classflow.domain.enums import UserRole
from classflow.presentation.api.routers.user.models import UserResponse


class OrganizationResponse(BaseModel):
    id: int
    name: str
    slug: str
    created_by_id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


class MyOrganizationResponse(OrganizationResponse):
    role: UserRole | None = None


class OrganizationMemberResponse(BaseModel):
    organization_id: int
    user_id: int
    role: UserRole
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


class OrganizationMemberDetailResponse(BaseModel):
    organization_id: int
    user: UserResponse
    role: UserRole
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


class UpdateOrganizationMemberRequest(BaseModel):
    role: UserRole
