from dataclasses import dataclass, field
from datetime import datetime

from classflow.domain.entities.address import Cabinet
from classflow.domain.entities.course import Course


@dataclass
class Group:
    id: int = field(init=False)
    name: str
    course_id: int
    course: Course | None = field(init=False, default=None)
    max_users_count: int
    default_cabinet_id: int | None = None
    default_cabinet: Cabinet | None = field(init=False, default=None)
    created_at: datetime = field(init=False)


@dataclass
class UserGroup:
    id: int = field(init=False)
    user_id: int
    group_id: int
    is_active: bool = True
    created_at: datetime = field(init=False)
