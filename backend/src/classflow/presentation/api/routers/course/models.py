from datetime import datetime, timedelta

from pydantic import BaseModel, ConfigDict

from classflow.domain.enums import CoursePaymentType, CourseType, LessonType
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
    # TODO: remove default values
    teachers_count: int = 111
    students_count: int = 111


class BaseCourseTeacherResponse(BaseModel):
    id: int
    is_active: bool
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


class CourseTeacherResponse(BaseCourseTeacherResponse):
    course_id: int
    teacher_id: int


class CourseTeacherDetailResponse(BaseCourseTeacherResponse):
    course: CourseWithSubjectResponse
    teacher: UserResponse


class DetailCourseTeacherResponse(BaseCourseTeacherResponse):
    course: CourseWithSubjectResponse
    teacher: UserResponse


class BaseCourseTeacherStudentResponse(BaseModel):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


class CourseTeacherStudentResponse(BaseCourseTeacherStudentResponse):
    course_teacher_id: int
    student_id: int


class DetailCourseTeacherStudentResponse(BaseCourseTeacherStudentResponse):
    course_teacher: CourseTeacherDetailResponse
    student: UserResponse
