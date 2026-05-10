from datetime import datetime

from pydantic import BaseModel, ConfigDict

from classflow.domain.enums import StudentStatus
from classflow.presentation.api.common.models import (
    LessonWithPaymentIdResponse,
)
from classflow.presentation.api.routers.cabinet.models import (
    CabinetDetailResponse,
)
from classflow.presentation.api.routers.course.models import (
    CourseWithSubjectResponse,
)
from classflow.presentation.api.routers.organization.models import (
    OrganizationMemberDetailResponse,
)
from classflow.presentation.api.routers.payment.models import PaymentResponse


class UpdateGroupRequest(BaseModel):
    name: str
    course_id: int
    max_users_count: int
    default_cabinet_id: int | None = None


class UpdateStudentGroupRequest(BaseModel):
    status: StudentStatus


class BaseGroupResponse(BaseModel):
    id: int
    name: str
    max_users_count: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


class GroupResponse(BaseGroupResponse):
    course_id: int
    default_cabinet_id: int | None = None


class GroupDetailResponse(BaseGroupResponse):
    course: CourseWithSubjectResponse
    default_cabinet: CabinetDetailResponse | None = None


class BaseStudentGroupResponse(BaseModel):
    id: int
    status: StudentStatus
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


class StudentGroupDetailResponse(BaseStudentGroupResponse):
    group_id: int
    student: OrganizationMemberDetailResponse


class StudentGroupWithPaymentsResponse(BaseStudentGroupResponse):
    total_paid: int
    student: OrganizationMemberDetailResponse
    payments: list[PaymentResponse]


class GroupWithPaymentsResponse(GroupDetailResponse):
    total_paid: int
    students: list[StudentGroupWithPaymentsResponse]
    lessons: list[LessonWithPaymentIdResponse]


class GroupWithStudentsResponse(GroupDetailResponse):
    students: list[StudentGroupDetailResponse]
