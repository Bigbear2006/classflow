from dataclasses import dataclass, field
from datetime import datetime

from classflow.domain.exceptions import ValidationError


@dataclass
class Feedback:
    id: int = field(init=False)
    organization_id: int = field(init=False)
    author_id: int
    rating: int
    teacher_id: int | None = None
    course_id: int | None = None
    text: str = ''
    is_active: bool = True
    created_at: datetime = field(init=False)

    def __post_init__(self) -> None:
        if self.rating < 1 or self.rating > 5:
            raise ValidationError('rating must be between 1 and 5')

        if not self.teacher_id and not self.course_id:
            raise ValidationError(
                'teacher_id ot course_id id must be provided',
            )

        if self.teacher_id and self.course_id:
            raise ValidationError(
                'teacher_id and course_id are mutually exclusive',
            )
