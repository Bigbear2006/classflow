from sqlalchemy import BIGINT, Column, String, Table, text

from classflow.domain.entities import User
from classflow.infrastructure.db.tables.base import (
    created_at_column,
    gin_trgm_index,
    mapper_registry,
    metadata,
)

users_table = Table(
    'users',
    metadata,
    Column('id', BIGINT, primary_key=True, autoincrement=True),
    Column('fullname', String(100), nullable=False),
    Column('email', String(150), unique=True, nullable=False),
    Column('phone', String(20), nullable=False, server_default=text("''")),
    Column('password', String(128), nullable=False),
    created_at_column(),
    gin_trgm_index('ix_users_fullname_trgm', column='fullname'),
    gin_trgm_index('ix_users_email_trgm', column='email'),
)

mapper_registry.map_imperatively(User, users_table)
