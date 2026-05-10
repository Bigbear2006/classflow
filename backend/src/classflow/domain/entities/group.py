from dataclasses import dataclass, field
from datetime import datetime
from typing import TYPE_CHECKING

from classflow.domain.entities.address import Cabinet
from classflow.domain.entities.course import Course
from classflow.domain.entities.organization import OrganizationMember
from classflow.domain.entities.payment import Payment
from classflow.domain.enums import StudentStatus

if TYPE_CHECKING:
    from classflow.domain.entities.lesson import Lesson


@dataclass
class Group:
    id: int = field(init=False)
    organization_id: int = field(init=False)
    name: str
    course_id: int
    course: Course | None = field(init=False, default=None)
    max_users_count: int
    default_cabinet_id: int | None = None
    default_cabinet: Cabinet | None = field(init=False, default=None)
    created_at: datetime = field(init=False)
    students: list['StudentGroup'] = field(init=False, default_factory=list)
    lessons: list['Lesson'] = field(init=False, default_factory=list)
    # Manually set this attribute
    total_paid: int | None = field(init=False, default=None)


@dataclass
class StudentGroup:
    id: int = field(init=False)
    organization_id: int = field(init=False)
    student_id: int
    student: OrganizationMember | None = field(init=False, default=None)
    group_id: int
    status: StudentStatus = StudentStatus.PENDING
    created_at: datetime = field(init=False)
    payments: list[Payment] = field(init=False, default_factory=list)
