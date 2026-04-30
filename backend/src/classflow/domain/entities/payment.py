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
    user_group_id: int | None = None
    lesson_id: int | None = None

    def __post_init__(self) -> None:
        if self.amount <= 0:
            raise ValidationError('amount must be greater than 0')

        if not self.user_group_id and not self.lesson_id:
            raise ValidationError(
                'user_group_id or lesson_id must be provided',
            )

        if self.user_group_id and self.lesson_id:
            raise ValidationError(
                'user_group_id and lesson_id are mutually exclusive',
            )
