from typing import cast

from asyncpg import UniqueViolationError
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import InstrumentedAttribute, joinedload

from app.application.repositories.organization_member import (
    OrganizationMemberRepository,
)
from app.domain.entities import OrganizationMember, User
from app.domain.enums import UserRole
from app.domain.exceptions import AlreadyExistsError
from app.infrastructure.db.models import organization_members_table
from app.infrastructure.db.repositories.base import create


class OrganizationMemberRepositoryImpl(OrganizationMemberRepository):
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(self, member: OrganizationMember) -> OrganizationMember:
        try:
            return await create(self.session, member)
        except UniqueViolationError as e:
            raise AlreadyExistsError(
                'User already joined this organization',
                organization_id=member.organization_id,
                user_id=member.user_id,
            ) from e

    async def update(
        self,
        org_id: int,
        user_id: int,
        *,
        role: UserRole,
    ) -> OrganizationMember:
        stmt = (
            update(OrganizationMember)
            .where(
                organization_members_table.c.organization_id == org_id,
                organization_members_table.c.user_id == user_id,
            )
            .values(role=role)
            .returning(OrganizationMember)
        )
        rows = await self.session.execute(stmt)
        return rows.scalar_one()

    async def get(
        self,
        org_id: int,
        user_id: int,
    ) -> OrganizationMember:
        stmt = select(OrganizationMember).where(
            organization_members_table.c.organization_id == org_id,
            organization_members_table.c.user_id == user_id,
        )
        rows = await self.session.execute(stmt)
        return rows.scalar_one()

    async def get_organization_members(
        self,
        org_id: int,
    ) -> list[OrganizationMember]:
        stmt = (
            select(OrganizationMember)
            .where(
                organization_members_table.c.organization_id == org_id,
            )
            .options(
                joinedload(
                    cast(InstrumentedAttribute[User], OrganizationMember.user),
                ),
            )
        )
        rows = await self.session.scalars(stmt)
        return cast(list[OrganizationMember], rows.all())
