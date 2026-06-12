from classflow.infrastructure.di.container import providers
from dishka import make_async_container

from tests.infrastructure.di.providers.test_database import (
    TestDatabaseProvider,
)
from tests.infrastructure.di.providers.test_verification import (
    TestVerificationProvider,
)

test_providers = [TestDatabaseProvider(), TestVerificationProvider()]
test_container = make_async_container(*providers, *test_providers)
