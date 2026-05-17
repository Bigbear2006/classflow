from classflow.application.common.password_hasher import PasswordHasher
from classflow.domain.entities import Organization, OrganizationMember, User
from classflow.domain.enums import UserRole
from classflow.infrastructure.di.container import container

password_hasher = container.get_sync(PasswordHasher)

password_hasher.hash_password()

users = [
    User(
        fullname='Alex Johnson',
        email='alex.johnson@test.com',
        password=password_hasher.hash_password('password'),
        phone='+711111111',
        is_active=True,
    ),
    User(
        fullname='Emma Wilson',
        email='emma.wilson@test.com',
        password=password_hasher.hash_password('password'),
        phone='+722222222',
        is_active=True,
    ),
    User(
        fullname='Michael Brown',
        email='michael.brown@test.com',
        password=password_hasher.hash_password('password'),
        phone='+733333333',
        is_active=True,
    ),
    User(
        fullname='Sophia Davis',
        email='sophia.davis@test.com',
        password=password_hasher.hash_password('password'),
        phone='+744444444',
        is_active=True,
    ),
    User(
        fullname='Daniel Miller',
        email='daniel.miller@test.com',
        password=password_hasher.hash_password('password'),
        phone='+755555555',
        is_active=True,
    ),
    User(
        fullname='Olivia Moore',
        email='olivia.moore@test.com',
        password=password_hasher.hash_password('password'),
        phone='+766666666',
        is_active=True,
    ),
    User(
        fullname='James Taylor',
        email='james.taylor@test.com',
        password=password_hasher.hash_password('password'),
        phone='+777777777',
        is_active=True,
    ),
    User(
        fullname='Charlotte Anderson',
        email='charlotte.anderson@test.com',
        password=password_hasher.hash_password('password'),
        phone='+788888888',
        is_active=True,
    ),
    User(
        fullname='Benjamin Thomas',
        email='benjamin.thomas@test.com',
        password=password_hasher.hash_password('password'),
        phone='+799999999',
        is_active=True,
    ),
    User(
        fullname='Mia Martinez',
        email='mia.martinez@test.com',
        password=password_hasher.hash_password('password'),
        phone='+710101010',
        is_active=True,
    ),
]

# предполагаем что users уже сохранены
# users[i].id доступны

organizations = [
    Organization(
        name='Bright Future Academy',
        slug='bright-future-academy',
        created_by_id=1,  # Alex
    ),
    Organization(
        name='Nordic Skills Center',
        slug='nordic-skills-center',
        created_by_id=2,  # Emma
    ),
    Organization(
        name='CodeBridge Institute',
        slug='codebridge-institute',
        created_by_id=3,  # Michael
    ),
]

# предполагаем что organizations уже сохранены
# organizations[i].id доступны

organization_members = [
    # Bright Future Academy (6 users)
    OrganizationMember(
        organization_id=1,
        user_id=1,
        role=UserRole.OWNER,
    ),
    OrganizationMember(
        organization_id=1,
        user_id=2,
        role=UserRole.ADMIN,
    ),
    OrganizationMember(
        organization_id=1,
        user_id=3,
        role=UserRole.TEACHER,
    ),
    OrganizationMember(
        organization_id=1,
        user_id=4,
        role=UserRole.TEACHER,
    ),
    OrganizationMember(
        organization_id=1,
        user_id=5,
        role=UserRole.STUDENT,
    ),
    OrganizationMember(
        organization_id=1,
        user_id=6,
        role=UserRole.STUDENT,
    ),
    # Nordic Skills Center (7 users)
    OrganizationMember(
        organization_id=2,
        user_id=2,
        role=UserRole.OWNER,
    ),
    OrganizationMember(
        organization_id=2,
        user_id=1,
        role=UserRole.ADMIN,
    ),
    OrganizationMember(
        organization_id=2,
        user_id=4,
        role=UserRole.TEACHER,
    ),
    OrganizationMember(
        organization_id=2,
        user_id=7,
        role=UserRole.TEACHER,
    ),
    OrganizationMember(
        organization_id=2,
        user_id=8,
        role=UserRole.STUDENT,
    ),
    OrganizationMember(
        organization_id=2,
        user_id=9,
        role=UserRole.STUDENT,
    ),
    OrganizationMember(
        organization_id=2,
        user_id=5,
        role=UserRole.STUDENT,
    ),
    # CodeBridge Institute (5 users)
    OrganizationMember(
        organization_id=3,
        user_id=3,
        role=UserRole.OWNER,
    ),
    OrganizationMember(
        organization_id=3,
        user_id=2,
        role=UserRole.ADMIN,
    ),
    OrganizationMember(
        organization_id=3,
        user_id=7,
        role=UserRole.TEACHER,
    ),
    OrganizationMember(
        organization_id=3,
        user_id=10,
        role=UserRole.STUDENT,
    ),
    OrganizationMember(
        organization_id=3,
        user_id=6,
        role=UserRole.STUDENT,
    ),
]
