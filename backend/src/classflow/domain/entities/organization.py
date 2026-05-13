import re
from collections.abc import Sequence
from dataclasses import dataclass, field
from datetime import datetime
from typing import TYPE_CHECKING

from classflow.domain.entities.user import User
from classflow.domain.enums import AttendanceStatus, UserRole
from classflow.domain.exceptions import ValidationError

if TYPE_CHECKING:
    from classflow.domain.entities.course import Course

RESERVED_SUBDOMAINS = [
    'www',
    'app',
    'api',
    'auth',
    'admin',
    'mail',
    'service',
    '_dmarc',
]

SLUG_REGEX = re.compile(r'^[a-z0-9]+(?:-[a-z0-9]+)*$')


@dataclass
class Organization:
    id: int = field(init=False)
    name: str
    slug: str
    created_by_id: int
    created_at: datetime = field(init=False)
    # Manually set this attribute
    role: UserRole | None = field(init=False, default=None)

    def __post_init__(self) -> None:
        self.slug = self.slug.strip().lower()
        if not SLUG_REGEX.match(self.slug):
            raise ValidationError('Invalid slug')

        if len(self.slug) < 3:
            raise ValidationError(
                'Organization slug must be at least 3 characters long',
            )

        if len(self.slug) > 50:
            raise ValidationError(
                'Organization slug must be less than 50 characters long',
            )

        if self.slug in RESERVED_SUBDOMAINS:
            raise ValidationError(f'{self.slug} is reserved')


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
