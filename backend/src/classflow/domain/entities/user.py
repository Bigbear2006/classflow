from dataclasses import dataclass, field
from datetime import datetime

import phonenumbers
from email_validator import EmailNotValidError, validate_email

from classflow.domain.exceptions import ValidationError


@dataclass
class User:
    id: int = field(init=False)
    fullname: str
    email: str
    password: str
    phone: str
    is_active: bool = False
    created_at: datetime = field(init=False)

    def __post_init__(self) -> None:
        try:
            validate_email(self.email)
        except EmailNotValidError as e:
            raise ValidationError('Invalid email') from e

        self.phone = (
            self.phone if self.phone.startswith('+') else f'+{self.phone}'
        )
        try:
            parsed_phone = phonenumbers.parse(self.phone)
        except phonenumbers.NumberParseException as e:
            raise ValidationError('Invalid phone number') from e

        if not phonenumbers.is_valid_number(parsed_phone):
            raise ValidationError('Invalid phone number')
