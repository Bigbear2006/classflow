from sqlalchemy import (
    BIGINT,
    Column,
    Enum,
    ForeignKey,
    String,
    Table,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship

from classflow.domain.entities import Organization, OrganizationMember, User
from classflow.domain.enums import UserRole
from classflow.infrastructure.db.tables.base import (
    created_at_column,
    gin_trgm_index,
    mapper_registry,
    metadata,
    organization_id_fk,
)

user_role_enum = Enum(UserRole, name='user_role')

organizations_table = Table(
    'organizations',
    metadata,
    Column('id', BIGINT, primary_key=True, autoincrement=True),
    Column('name', String(255), unique=True, nullable=False),
    Column('slug', String(50), unique=True, nullable=False),
    Column('created_by_id', BIGINT, nullable=False, index=True),
    created_at_column(),
    gin_trgm_index('ix_organizations_name_trgm', column='name'),
    gin_trgm_index('ix_organizations_slug_trgm', column='slug'),
)

organization_members_table = Table(
    'organization_members',
    metadata,
    Column('id', BIGINT, primary_key=True, autoincrement=True),
    organization_id_fk(),
    Column(
        'user_id',
        BIGINT,
        ForeignKey('users.id'),
        nullable=False,
        index=True,
    ),
    Column('role', user_role_enum, nullable=False),
    created_at_column(),
    UniqueConstraint('organization_id', 'user_id', name='uq_org_user'),
)

mapper_registry.map_imperatively(Organization, organizations_table)
mapper_registry.map_imperatively(
    OrganizationMember,
    organization_members_table,
    properties={'user': relationship(User)},
)
