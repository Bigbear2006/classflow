import secrets

from classflow.application.verification.data_generator import (
    VerificationData,
    VerificationDataGenerator,
)

TEST_VERIFICATION_CODE = str(999_999)


class TestVerificationDataGenerator(VerificationDataGenerator):
    def generate_data(self) -> VerificationData:
        return VerificationData(
            code=TEST_VERIFICATION_CODE,
            token=secrets.token_urlsafe(32),
        )
