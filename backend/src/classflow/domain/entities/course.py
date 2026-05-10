from dataclasses import dataclass, field
from datetime import datetime, timedelta
from typing import TYPE_CHECKING

from classflow.domain.entities.organization import OrganizationMember
from classflow.domain.entities.subject import Subject
from classflow.domain.entities.user import User
from classflow.domain.enums import (
    CoursePaymentType,
    CourseTeacherStatus,
    CourseType,
    LessonType,
    StudentStatus,
)

if TYPE_CHECKING:
    from classflow.domain.entities.lesson import Lesson
    from classflow.domain.entities.payment import Payment


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
    teachers: list['CourseTeacher'] = field(init=False, default_factory=list)
    # Manually set these attributes
    selected_teacher: User | None = field(init=False, default=None)
    teachers_count: int | None = field(init=False, default=None)
    students_count: int | None = field(init=False, default=None)
    active_group_id: int | None = field(init=False, default=None)
    user_joined: bool = field(init=False, default=False)


@dataclass
class CourseTeacher:
    id: int = field(init=False)
    organization_id: int = field(init=False)
    course_id: int
    course: Course | None = field(init=False, default=None)
    teacher_id: int
    teacher: OrganizationMember | None = field(init=False, default=None)
    status: CourseTeacherStatus = CourseTeacherStatus.ACTIVE
    created_at: datetime = field(init=False)
    students: list['CourseTeacherStudent'] = field(
        init=False,
        default_factory=list,
    )


@dataclass
class CourseTeacherStudent:
    id: int = field(init=False)
    organization_id: int = field(init=False)
    course_teacher_id: int
    course_teacher: CourseTeacher | None = field(init=False, default=None)
    student_id: int
    student: OrganizationMember | None = field(init=False, default=None)
    status: StudentStatus = StudentStatus.ACTIVE
    created_at: datetime = field(init=False)
    lessons: list['Lesson'] = field(init=False, default_factory=list)
    payments: list['Payment'] = field(init=False, default_factory=list)
