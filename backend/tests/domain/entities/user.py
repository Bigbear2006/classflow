from classflow.application.common.password_hasher import PasswordHasher
from classflow.domain.entities import User

from tests.infrastructure.di.container import test_container

password_hasher = test_container.get_sync(PasswordHasher)

test_owner_password = 'g2md21-n3xd0'
test_owner = User(
    fullname='Owner',
    email='owner@gmail.com',
    password=password_hasher.hash_password(test_owner_password),
    phone='79001234567',
    is_active=True,
)

test_users = [test_owner]
