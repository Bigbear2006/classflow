from dataclasses import dataclass, field
from datetime import datetime

from classflow.domain.entities.user import User
from classflow.domain.enums import UserRole


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
