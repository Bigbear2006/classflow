from dataclasses import dataclass, field
from datetime import datetime

from classflow.domain.entities.address import Cabinet
from classflow.domain.entities.course import CourseTeacherStudent
from classflow.domain.entities.group import Group
from classflow.domain.entities.organization import OrganizationMember
from classflow.domain.exceptions import PermissionDeniedError, ValidationError


@dataclass
class Lesson:
    id: int = field(init=False)
    topic: str
    organization_id: int = field(init=False)
    conducted_by_id: int
    conducted_by: OrganizationMember | None = field(init=False, default=None)
    start_date: datetime
    end_date: datetime
    cabinet_id: int | None = None
    cabinet: Cabinet | None = field(init=False, default=None)
    url: str | None = None
    group_id: int | None = None
    group: Group | None = field(init=False, default=None)
    course_teacher_student_id: int | None = None
    course_teacher_student: CourseTeacherStudent | None = field(
        init=False,
        default=None,
    )
    is_active: bool = True
    created_at: datetime = field(init=False)
    # Manually set this attribute
    payment_id: int | None = field(init=False, default=None)

    def __post_init__(self):
        if self.start_date.date() != self.end_date.date():
            raise ValidationError(
                'start_date must be on the same day as end_date',
            )

        if self.start_date > self.end_date:
            raise ValidationError('start_date must be before end_date')

        if not self.cabinet_id and not self.url:
            raise ValidationError('cabinet_id or url must be provided')

        if not self.group_id and not self.course_teacher_student_id:
            raise ValidationError(
                'group_id or course_teacher_student_id must be provided',
            )

        if self.group_id and self.course_teacher_student_id:
            raise ValidationError(
                'group_id and course_teacher_student_id '
                'cannot both be provided',
            )

    def teacher_has_access(self, teacher_id: int) -> bool:
        return teacher_id == self.conducted_by_id

    def ensure_teacher_access(self, teacher_id: int) -> None:
        if not self.teacher_has_access(teacher_id):
            raise PermissionDeniedError()
