from typing import Any, NewType

from sqlalchemy import (
    BIGINT,
    Column,
    DateTime,
    ForeignKey,
    Index,
    MetaData,
    text,
)
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import registry

# AsyncSession without app.current_org_id set
RawSession = NewType('RawSession', AsyncSession)

metadata = MetaData()
mapper_registry = registry(metadata=metadata)


def organization_id_fk() -> Column[Any]:
    return Column(
        'organization_id',
        BIGINT,
        ForeignKey('organizations.id'),
        nullable=False,
        server_default=text(
            "current_setting('app.current_org_id', true)::bigint",
        ),
    )


def created_at_column() -> Column[Any]:
    return Column(
        'created_at',
        DateTime(timezone=True),
        nullable=False,
        server_default=text('NOW()'),
    )


def gin_trgm_index(name: str, column: str) -> Index:
    return Index(
        name,
        column,
        postgresql_ops={column: 'gin_trgm_ops'},
        postgresql_using='gin',
    )
