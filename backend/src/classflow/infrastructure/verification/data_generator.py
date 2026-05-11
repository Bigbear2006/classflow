import secrets

from classflow.application.verification.data_generator import (
    VerificationData,
    VerificationDataGenerator,
)


class VerificationDataGeneratorImpl(VerificationDataGenerator):
    def generate_data(self) -> VerificationData:
        return VerificationData(
            code=str(secrets.randbelow(900_000) + 100_000),
            token=secrets.token_urlsafe(32),
        )
