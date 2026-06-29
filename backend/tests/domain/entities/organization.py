from classflow.domain.entities import Organization, OrganizationMember
from classflow.domain.enums import UserRole

test_organization = Organization(
    name='Test Organization',
    slug='test',
    created_by_id=1,
)

test_organization_members = [
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
        role=UserRole.STUDENT,
    ),
]
