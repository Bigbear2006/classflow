from dataclasses import dataclass, field
from datetime import datetime

from classflow.domain.exceptions import ValidationError


@dataclass
class Payment:
    id: int = field(init=False)
    organization_id: int = field(init=False)
    amount: int
    created_by_id: int
    date: datetime
    student_group_id: int | None = None
    course_teacher_student_id: int | None = None
    lesson_id: int | None = None
    comment: str = ''

    def __post_init__(self) -> None:
        if self.amount <= 0:
            raise ValidationError('amount must be greater than 0')

        if not self.student_group_id and not self.course_teacher_student_id:
            raise ValidationError(
                'student_group_id or course_teacher_student_id '
                'must be provided',
            )

        if self.student_group_id and self.course_teacher_student_id:
            raise ValidationError(
                'student_group_id and course_teacher_student_id '
                'are mutually exclusive',
            )
