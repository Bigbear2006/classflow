from typing import cast

from asyncpg import UniqueViolationError
from sqlalchemy import func, or_, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import contains_eager

from classflow.application.repositories.organization_member import (
    OrganizationMemberRepository,
)
from classflow.domain.entities import OrganizationMember
from classflow.domain.enums import UserRole
from classflow.domain.exceptions import AlreadyExistsError
from classflow.infrastructure.db.repositories.base import create
from classflow.infrastructure.db.tables import (
    organization_members_table,
    users_table,
)


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
        *,
        query: str | None = None,
        roles: list[UserRole] | None = None,
    ) -> list[OrganizationMember]:
        stmt = (
            select(OrganizationMember)
            .join(
                users_table,
                organization_members_table.c.user_id == users_table.c.id,
            )
            .where(
                organization_members_table.c.organization_id == org_id,
            )
            .options(contains_eager(OrganizationMember.user))  # type: ignore[arg-type]
            .limit(10)
        )

        if query:
            fullname_sml = func.similarity(users_table.c.fullname, query)
            email_sml = func.similarity(users_table.c.email, query)

            stmt = stmt.where(
                or_(fullname_sml >= 0.3, email_sml >= 0.3),
            ).order_by(func.greatest(fullname_sml, email_sml).desc())

        if roles:
            stmt = stmt.where(organization_members_table.c.role.in_(roles))

        rows = await self.session.scalars(stmt)
        return cast(list[OrganizationMember], rows.all())
