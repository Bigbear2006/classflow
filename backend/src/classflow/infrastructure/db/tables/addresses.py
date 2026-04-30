from sqlalchemy import (
    BIGINT,
    Column,
    ForeignKeyConstraint,
    String,
    Table,
    Text,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship

from classflow.domain.entities import Address, Cabinet
from classflow.infrastructure.db.tables.base import (
    mapper_registry,
    metadata,
    organization_id_fk,
)

addresses_table = Table(
    'addresses',
    metadata,
    Column('id', BIGINT, primary_key=True),
    organization_id_fk(),
    Column('address', Text, nullable=False),
    UniqueConstraint('organization_id', 'id'),
    UniqueConstraint('organization_id', 'address'),
)

cabinets_table = Table(
    'cabinets',
    metadata,
    Column('id', BIGINT, primary_key=True),
    organization_id_fk(),
    Column('address_id', BIGINT, nullable=False),
    Column('number', String(10), nullable=False),
    ForeignKeyConstraint(
        ['organization_id', 'address_id'],
        ['addresses.organization_id', 'addresses.id'],
    ),
    UniqueConstraint('organization_id', 'id'),
    UniqueConstraint('address_id', 'number'),
)

mapper_registry.map_imperatively(
    Cabinet,
    cabinets_table,
    properties={'address': relationship(Address, back_populates='cabinets')},
)

mapper_registry.map_imperatively(
    Address,
    addresses_table,
    properties={'cabinets': relationship(Cabinet, back_populates='address')},
)
