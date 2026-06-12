from classflow.application.verification.data_generator import (
    VerificationDataGenerator,
)
from classflow.application.verification.email_sender import EmailSender
from dishka import Provider, Scope, provide

from tests.infrastructure.verification.test_data_generator import (
    TestVerificationDataGenerator,
)
from tests.infrastructure.verification.test_email_sender import TestEmailSender


class TestVerificationProvider(Provider):
    data_generator = provide(
        TestVerificationDataGenerator,
        provides=VerificationDataGenerator,
        scope=Scope.APP,
        override=True,
    )
    email_sender = provide(
        TestEmailSender,
        provides=EmailSender,
        scope=Scope.REQUEST,
        override=True,
    )
