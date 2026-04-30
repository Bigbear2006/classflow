from dataclasses import dataclass, field
from datetime import datetime, timedelta

from classflow.domain.entities.organization import OrganizationMember
from classflow.domain.entities.subject import Subject
from classflow.domain.entities.user import User
from classflow.domain.enums import CoursePaymentType, CourseType, LessonType


@dataclass
class Course:
    id: int = field(init=False)
    organization_id: int = field(init=False)
    subject_id: int
    subject: Subject | None = field(init=False, default=None)
    type: CourseType
    price: int
    payment_type: CoursePaymentType
    lesson_type: LessonType
    lesson_duration: timedelta
    lessons_count: int | None = None
    duration: timedelta | None = None
    created_at: datetime = field(init=False)
    # Manually set these attributes
    selected_teacher: User | None = field(init=False, default=None)
    teachers_count: int | None = field(init=False, default=None)
    students_count: int | None = field(init=False, default=None)


@dataclass
class CourseTeacher:
    id: int = field(init=False)
    organization_id: int = field(init=False)
    course_id: int
    course: Course | None = field(init=False, default=None)
    teacher_id: int
    teacher: OrganizationMember | None = field(init=False, default=None)
    is_active: bool = True
    created_at: datetime = field(init=False)


@dataclass
class CourseTeacherStudent:
    id: int = field(init=False)
    organization_id: int = field(init=False)
    course_teacher_id: int
    course_teacher: CourseTeacher | None = field(init=False, default=None)
    student_id: int
    student: OrganizationMember | None = field(init=False, default=None)
    created_at: datetime = field(init=False)
