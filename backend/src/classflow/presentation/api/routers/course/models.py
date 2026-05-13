from datetime import datetime, timedelta

from pydantic import BaseModel, ConfigDict

from classflow.domain.enums import (
    CoursePaymentType,
    CourseTeacherStatus,
    CourseType,
    LessonType,
    StudentStatus,
)
from classflow.presentation.api.common.models import LessonResponse
from classflow.presentation.api.routers.organization.models import (
    OrganizationMemberDetailResponse,
)
from classflow.presentation.api.routers.payment.models import PaymentResponse
from classflow.presentation.api.routers.subject.models import SubjectResponse
from classflow.presentation.api.routers.user.models import UserResponse


class UpdateCourseRequest(BaseModel):
    subject_id: int
    type: CourseType
    price: int
    payment_type: CoursePaymentType
    lesson_type: LessonType
    lesson_duration: timedelta
    lessons_count: int | None = None
    duration: timedelta | None = None


class UpdateCourseTeacherRequest(BaseModel):
    status: CourseTeacherStatus


class UpdateCourseTeacherStudentRequest(BaseModel):
    status: StudentStatus


class CourseResponse(BaseModel):
    id: int
    type: CourseType
    price: int
    payment_type: CoursePaymentType
    lesson_type: LessonType
    lesson_duration: timedelta
    lessons_count: int | None = None
    duration: timedelta | None = None
    selected_teacher: UserResponse | None = None
    model_config = ConfigDict(from_attributes=True)


class CourseWithSubjectResponse(CourseResponse):
    subject: SubjectResponse


class CourseDetailResponse(CourseWithSubjectResponse):
    teachers_count: int
    students_count: int
    active_group_id: int | None
    student_status: str | None


class BaseCourseTeacherResponse(BaseModel):
    id: int
    status: CourseTeacherStatus
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


class CourseTeacherResponse(BaseCourseTeacherResponse):
    course_id: int
    teacher_id: int


class CourseTeacherDetailResponse(BaseCourseTeacherResponse):
    course: CourseWithSubjectResponse
    teacher: OrganizationMemberDetailResponse


class BaseCourseTeacherStudentResponse(BaseModel):
    id: int
    created_at: datetime
    status: StudentStatus
    model_config = ConfigDict(from_attributes=True)


class CourseTeacherStudentResponse(BaseCourseTeacherStudentResponse):
    course_teacher_id: int
    student_id: int


class CourseTeacherStudentDetailResponse(BaseCourseTeacherStudentResponse):
    course_teacher: CourseTeacherDetailResponse
    student: OrganizationMemberDetailResponse


class IndividualCourseTeacherStudentResponse(BaseCourseTeacherStudentResponse):
    course_teacher_id: int
    student: OrganizationMemberDetailResponse


class IndividualCourseTeacherResponse(BaseCourseTeacherResponse):
    course_id: int
    teacher: OrganizationMemberDetailResponse
    students: list[IndividualCourseTeacherStudentResponse]


class IndividualCourseResponse(CourseWithSubjectResponse):
    teachers: list[IndividualCourseTeacherResponse]


class CourseTeacherStudentWithPaymentsResponse(
    CourseTeacherStudentDetailResponse,
):
    lessons: list[LessonResponse]
    payments: list[PaymentResponse]
