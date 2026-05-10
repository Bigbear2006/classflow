from datetime import datetime

from pydantic import BaseModel

from classflow.presentation.api.common.models import BaseLessonResponse
from classflow.presentation.api.routers.cabinet.models import (
    CabinetDetailResponse,
)
from classflow.presentation.api.routers.course.models import (
    CourseTeacherStudentDetailResponse,
)
from classflow.presentation.api.routers.group.models import GroupDetailResponse
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


class LessonDetailResponse(BaseLessonResponse):
    conducted_by: OrganizationMemberDetailResponse
    cabinet: CabinetDetailResponse | None = None
    group: GroupDetailResponse | None = None
    course_teacher_student: CourseTeacherStudentDetailResponse | None = None
