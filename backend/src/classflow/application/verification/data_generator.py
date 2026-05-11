from dataclasses import dataclass
from typing import Protocol


@dataclass
class VerificationData:
    code: str
    token: str


class VerificationDataGenerator(Protocol):
    def generate_data(self) -> VerificationData:
        pass
