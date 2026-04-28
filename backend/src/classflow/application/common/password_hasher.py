from typing import Protocol


class PasswordHasher(Protocol):
    def hash_password(self, password: str) -> str:
        pass

    def verify_password(self, hashed_password: str, raw_password: str) -> bool:
        pass
