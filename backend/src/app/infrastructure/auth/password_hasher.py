import argon2
from argon2.exceptions import (
    InvalidHashError,
    VerificationError,
    VerifyMismatchError,
)


class PasswordHasherImpl:
    def __init__(self, hasher: argon2.PasswordHasher) -> None:
        self.hasher = hasher

    def hash_password(self, password: str) -> str:
        return self.hasher.hash(password)

    def verify_password(
        self,
        hashed_password: str,
        raw_password: str,
    ) -> bool:
        try:
            return self.hasher.verify(hashed_password, raw_password)
        except (VerifyMismatchError, VerificationError, InvalidHashError):
            return False
