from collections.abc import Sequence
from dataclasses import dataclass, field
from datetime import datetime
from typing import TYPE_CHECKING

from classflow.domain.entities.user import User
from classflow.domain.enums import AttendanceStatus, UserRole

if TYPE_CHECKING:
    from classflow.domain.entities.course import Course


@dataclass
class Organization:
    id: int = field(init=False)
    name: str
    slug: str
    created_by_id: int
    created_at: datetime = field(init=False)
    # Manually set this attribute
    role: UserRole | None = field(init=False, default=None)


@dataclass
class OrganizationMember:
    id: int = field(init=False)
    organization_id: int
    user_id: int
    user: User | None = field(init=False, default=None)
    role: UserRole
    created_at: datetime = field(init=False)
    # Manually set this attribute
    attendance_status: AttendanceStatus | None = field(
        init=False,
        default=None,
    )

    def has_role(self, role: UserRole) -> bool:
        return self.role == role

    def has_any_role(self, roles: Sequence[UserRole]) -> bool:
        if self.role in roles:
            return True
        return False

    @property
    def is_owner(self) -> bool:
        return self.has_role(UserRole.OWNER)

    @property
    def is_teacher(self) -> bool:
        return self.has_role(UserRole.TEACHER)

    @property
    def is_student(self) -> bool:
        return self.has_role(UserRole.STUDENT)

    @property
    def is_admin_or_more(self) -> bool:
        return self.has_any_role([UserRole.ADMIN, UserRole.OWNER])

    @property
    def is_teacher_or_more(self) -> bool:
        return self.has_any_role(
            [UserRole.TEACHER, UserRole.ADMIN, UserRole.OWNER],
        )


class TeacherWithFeedback(OrganizationMember):
    rating: int
    feedback_count: int
    user_can_add_feedback: bool
    courses: list['Course']


@dataclass
class RoleCount:
    role: UserRole
    count: int


@dataclass
class OrganizationStats:
    courses: int
    teachers: int
    students: int
    groups: int
    today_lessons: int
    total_income: int
