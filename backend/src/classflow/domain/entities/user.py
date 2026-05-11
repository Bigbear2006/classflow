from dataclasses import dataclass, field
from datetime import datetime


@dataclass
class User:
    id: int = field(init=False)
    fullname: str
    email: str
    password: str
    phone: str
    is_active: bool = False
    created_at: datetime = field(init=False)
