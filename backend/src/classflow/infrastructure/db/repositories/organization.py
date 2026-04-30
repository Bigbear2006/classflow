from datetime import UTC, datetime
from typing import cast

from sqlalchemy import Date, func, or_, select, update
from sqlalchemy.orm import InstrumentedAttribute

from classflow.application.repositories.organization import (
    OrganizationRepository,
)
from classflow.domain.entities import (
    Course,
    Group,
    Lesson,
    Organization,
    OrganizationMember,
    OrganizationStats,
    Payment,
    RoleCount,
)
from classflow.domain.enums import UserRole
from classflow.infrastructure.db.repositories.base import (
    create,
    exclude_none,
    set_current_org_id,
)
from classflow.infrastructure.db.tables import (
    RawSession,
    lessons_table,
    organization_members_table,
    organizations_table,
    payments_table,
)


class OrganizationRepositoryImpl(OrganizationRepository):
    def __init__(self, session: RawSession) -> None:
        self.session = session

    async def create(self, org: Organization) -> Organization:
        org = await create(self.session, org)
        await set_current_org_id(self.session, org.id)
        return org

    async def update(
        self,
        id: int,
        name: str | None = None,
        slug: str | None = None,
    ) -> Organization:
        data = exclude_none(name=name, slug=slug)
        stmt = (
            update(Organization)
            .where(organizations_table.c.id == id)
            .values(data)
            .returning(Organization)
        )
        rows = await self.session.execute(stmt)
        return rows.scalar_one()

    async def get_all(self) -> list[Organization]:
        stmt = select(Organization)
        rows = await self.session.scalars(stmt)
        return cast(list[Organization], rows.all())

    async def search(self, query: str) -> list[Organization]:
        stmt = select(Organization).where(
            or_(
                organizations_table.c.name.ilike(query),
                organizations_table.c.slug.ilike(query),
            ),
        )
        rows = await self.session.scalars(stmt)
        return cast(list[Organization], rows.all())

    async def get_by_slug(self, slug: str) -> Organization | None:
        stmt = select(Organization).where(organizations_table.c.slug == slug)
        rows = await self.session.execute(stmt)
        return rows.scalar()

    async def get_user_organization(self, user_id: int) -> Organization | None:
        stmt = (
            select(Organization)
            .join(
                organization_members_table,
                organizations_table.c.id
                == organization_members_table.c.organization_id,
            )
            .where(organization_members_table.c.user_id == user_id)
        )
        rows = await self.session.execute(stmt)
        return rows.scalar()

    async def get_user_organizations(self, user_id: int) -> list[Organization]:
        stmt = (
            select(
                Organization,
                cast(InstrumentedAttribute[UserRole], OrganizationMember.role),
            )
            .join(
                organization_members_table,
                organizations_table.c.id
                == organization_members_table.c.organization_id,
            )
            .where(organization_members_table.c.user_id == user_id)
            .distinct()
        )
        rows = await self.session.execute(stmt)
        orgs = []
        for org, role in rows:
            org.role = role
            orgs.append(org)
        return cast(list[Organization], orgs)

    async def get_role_counts(self, org_id: int) -> list[RoleCount]:
        await set_current_org_id(self.session, org_id)
        stmt = (
            select(OrganizationMember.role, func.count('*'))
            .select_from(OrganizationMember)
            .group_by(organization_members_table.c.role)
        )
        rows = await self.session.execute(stmt)
        return [RoleCount(role=role, count=count) for (role, count) in rows]

    async def get_stats(self, org_id: int) -> OrganizationStats:
        await set_current_org_id(self.session, org_id)

        courses_subquery = (
            select(func.count('*')).select_from(Course).scalar_subquery()
        )
        teachers_subquery = (
            select(func.count('*'))
            .select_from(OrganizationMember)
            .where(organization_members_table.c.role == UserRole.TEACHER)
            .scalar_subquery()
        )
        students_subquery = (
            select(func.count('*'))
            .select_from(OrganizationMember)
            .where(organization_members_table.c.role == UserRole.STUDENT)
            .scalar_subquery()
        )
        group_subquery = (
            select(func.count('*')).select_from(Group).scalar_subquery()
        )
        lessons_subquery = (
            select(func.count('*'))
            .select_from(Lesson)
            .where(
                lessons_table.c.start_date.cast(Date)
                == datetime.now(UTC).date(),
            )
            .scalar_subquery()
        )
        income_subquery = (
            select(func.coalesce(func.sum(payments_table.c.amount), 0))
            .select_from(Payment)
            .scalar_subquery()
        )

        stmt = select(
            courses_subquery,
            teachers_subquery,
            students_subquery,
            group_subquery,
            lessons_subquery,
            income_subquery,
        )
        rows = await self.session.execute(stmt)
        result = rows.one()

        return OrganizationStats(
            courses=result[0],
            teachers=result[1],
            students=result[2],
            groups=result[3],
            today_lessons=result[4],
            total_income=result[5],
        )
