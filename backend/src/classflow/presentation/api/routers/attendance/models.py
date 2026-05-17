from pydantic import BaseModel, ConfigDict

from classflow.domain.enums import AttendanceStatus
from classflow.presentation.api.routers.course.models import (
    CourseWithSubjectResponse,
)
from classflow.presentation.api.routers.group.models import GroupResponse
from classflow.presentation.api.routers.organization.models import (
    OrganizationMemberDetailResponse,
)


class AttendanceResponse(BaseModel):
    id: int
    lesson_id: int
    student_id: int
    status: AttendanceStatus
    model_config = ConfigDict(from_attributes=True)


class CourseAttendanceStatsResponse(BaseModel):
    course: CourseWithSubjectResponse
    group: GroupResponse | None
    teacher: OrganizationMemberDetailResponse | None
    conducted_lessons: int
    present_lessons: int
    rate: int
    model_config = ConfigDict(from_attributes=True)
