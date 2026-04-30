from sqlalchemy import (
    BIGINT,
    Column,
    String,
    Table,
    Text,
    UniqueConstraint,
    text,
)

from classflow.domain.entities import Subject
from classflow.infrastructure.db.tables.base import (
    created_at_column,
    mapper_registry,
    metadata,
    organization_id_fk,
)

subjects_table = Table(
    'subjects',
    metadata,
    Column('id', BIGINT, primary_key=True),
    organization_id_fk(),
    Column('name', String(255), nullable=False),
    Column('image', Text, nullable=False),
    Column('description', Text, nullable=False, server_default=text("''")),
    created_at_column(),
    UniqueConstraint('organization_id', 'id'),
    UniqueConstraint('organization_id', 'name'),
)

mapper_registry.map_imperatively(Subject, subjects_table)
