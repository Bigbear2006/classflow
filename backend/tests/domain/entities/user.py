from classflow.application.common.password_hasher import PasswordHasher
from classflow.domain.entities import User

from tests.infrastructure.di.container import test_container

password_hasher = test_container.get_sync(PasswordHasher)

test_owner_password = 'owner-password'
test_owner = User(
    fullname='Owner',
    email='owner@gmail.com',
    password=password_hasher.hash_password(test_owner_password),
    phone='79001234567',
    is_active=True,
)

test_admin_password = 'admin-password'
test_admin = User(
    fullname='Admin',
    email='admin@gmail.com',
    password=password_hasher.hash_password(test_admin_password),
    phone='79011234567',
    is_active=True,
)

test_teacher_password = 'teacher-password'
test_teacher = User(
    fullname='Teacher',
    email='teacher@gmail.com',
    password=password_hasher.hash_password(test_teacher_password),
    phone='79021234567',
    is_active=True,
)

test_student_password = 'student-password'
test_student = User(
    fullname='Student',
    email='student@gmail.com',
    password=password_hasher.hash_password(test_student_password),
    phone='79031234567',
    is_active=True,
)

test_user_password = 'user-password'
test_user = User(
    fullname='User',
    email='user@gmail.com',
    password=password_hasher.hash_password(test_user_password),
    phone='79001112233',
    is_active=True,
)

test_users = [test_owner, test_admin, test_teacher, test_student, test_user]
