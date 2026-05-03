from datetime import datetime

from pydantic import BaseModel, ConfigDict

from classflow.presentation.api.routers.cabinet.models import (
    DetailCabinetResponse,
)
from classflow.presentation.api.routers.course.models import (
    DetailCourseTeacherStudentResponse,
)
from classflow.presentation.api.routers.group.models import DetailGroupResponse
from classflow.presentation.api.routers.organization.models import (
    OrganizationMemberDetailResponse,
)


class UpdateLessonRequest(BaseModel):
    conducted_by_id: int
    start_date: datetime
    end_date: datetime
    cabinet_id: int | None = None
    url: str | None = None
    group_id: int | None = None
    course_teacher_student_id: int | None = None


class BaseLessonResponse(BaseModel):
    id: int
    start_date: datetime
    end_date: datetime
    url: str | None = None
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


class LessonResponse(BaseLessonResponse):
    conducted_by_id: int
    cabinet_id: int | None = None
    group_id: int | None = None
    course_teacher_student_id: int | None = None


class DetailLessonResponse(BaseLessonResponse):
    conducted_by: OrganizationMemberDetailResponse
    cabinet: DetailCabinetResponse | None = None
    group: DetailGroupResponse | None = None
    course_teacher_student: DetailCourseTeacherStudentResponse | None = None
