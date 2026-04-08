from datetime import datetime, timedelta

from pydantic import BaseModel, ConfigDict

from app.domain.enums import CoursePaymentType, LessonType
from app.presentation.api.routers.subject.models import SubjectResponse
from app.presentation.api.routers.user.models import UserResponse


class CourseResponse(BaseModel):
    id: int
    organization_id: int
    subject: SubjectResponse
    type: CoursePaymentType
    price: int
    payment_type: CoursePaymentType
    lesson_type: LessonType
    lesson_duration: int
    lessons_count: int | None = None
    duration: timedelta | None = None
    selected_teacher: UserResponse | None = None
    model_config = ConfigDict(from_attributes=True)


class CourseTeacherResponse(BaseModel):
    id: int
    course_id: int
    teacher_id: int
    is_active: bool
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


class CourseTeacherStudentResponse(BaseModel):
    id: int
    course_teacher_id: int
    student_id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
