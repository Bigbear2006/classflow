from pydantic import BaseModel, ConfigDict

from classflow.domain.enums import AttendanceStatus
from classflow.presentation.api.routers.course.models import (
    CourseWithSubjectResponse,
)
from classflow.presentation.api.routers.group.models import GroupResponse
from classflow.presentation.api.routers.lesson.models import (
    LessonDetailResponse,
)
from classflow.presentation.api.routers.organization.models import (
    OrganizationMemberDetailResponse,
)


class BaseAttendanceResponse(BaseModel):
    id: int
    status: AttendanceStatus
    model_config = ConfigDict(from_attributes=True)


class AttendanceResponse(BaseAttendanceResponse):
    lesson_id: int
    student_id: int


class AttendanceDetailResponse(BaseAttendanceResponse):
    lesson: LessonDetailResponse
    student: OrganizationMemberDetailResponse


class CourseAttendanceStatsResponse(BaseModel):
    course: CourseWithSubjectResponse
    group: GroupResponse | None
    teacher: OrganizationMemberDetailResponse | None
    conducted_lessons: int
    present_lessons: int
    rate: int
    model_config = ConfigDict(from_attributes=True)
