from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.presentation.api.routers.cabinet.models import DetailCabinetResponse
from app.presentation.api.routers.course.models import (
    CourseWithSubjectResponse,
)


class UpdateGroupRequest(BaseModel):
    name: str
    course_id: int
    max_users_count: int
    default_cabinet_id: int | None = None


class BaseGroupResponse(BaseModel):
    id: int
    name: str
    max_users_count: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


class GroupResponse(BaseGroupResponse):
    course_id: int
    default_cabinet_id: int | None = None


class DetailGroupResponse(BaseGroupResponse):
    course: CourseWithSubjectResponse
    default_cabinet: DetailCabinetResponse | None = None
