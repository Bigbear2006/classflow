from datetime import UTC, datetime
from typing import cast

from sqlalchemy import Date, func, or_, select, update

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
    get_one,
    set_current_org_id,
)
from classflow.infrastructure.db.tables import (
    RawSession,
    courses_table,
    groups_table,
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
        return get_one(rows)

    async def get_all(self, query: str) -> list[Organization]:
        stmt = (
            select(Organization)
            .where(
                or_(
                    organizations_table.c.name.op('%')(query),
                    organizations_table.c.slug.op('%')(query),
                ),
            )
            .order_by(
                func.greatest(
                    func.similarity(organizations_table.c.name, query),
                    func.similarity(organizations_table.c.slug, query),
                ).desc(),
            )
            .limit(10)
        )
        rows = await self.session.scalars(stmt)
        return cast(list[Organization], rows.all())

    async def get_by_slug(self, slug: str) -> Organization | None:
        stmt = select(Organization).where(organizations_table.c.slug == slug)
        rows = await self.session.execute(stmt)
        return rows.scalar()

    async def get_owned_count(self, user_id: int) -> int:
        stmt = (
            select(func.count('*'))
            .select_from(Organization)
            .join(
                organization_members_table,
                organizations_table.c.id
                == organization_members_table.c.organization_id,
            )
            .where(
                organization_members_table.c.user_id == user_id,
                organization_members_table.c.role == UserRole.OWNER,
            )
            .distinct()
        )
        rows = await self.session.execute(stmt)
        return get_one(rows)

    async def get_user_organizations(self, user_id: int) -> list[Organization]:
        stmt = (
            select(Organization, organization_members_table.c.role)
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
        return orgs

    async def get_role_counts(self, org_id: int) -> list[RoleCount]:
        stmt = select(
            func.count().filter(
                organization_members_table.c.role == UserRole.OWNER,
            ),
            func.count().filter(
                organization_members_table.c.role == UserRole.ADMIN,
            ),
            func.count().filter(
                organization_members_table.c.role == UserRole.TEACHER,
            ),
            func.count().filter(
                organization_members_table.c.role == UserRole.STUDENT,
            ),
        ).where(organization_members_table.c.organization_id == org_id)
        rows = await self.session.execute(stmt)
        row = rows.one()
        return [
            RoleCount(role=UserRole.OWNER, count=row[0]),
            RoleCount(role=UserRole.ADMIN, count=row[1]),
            RoleCount(role=UserRole.TEACHER, count=row[2]),
            RoleCount(role=UserRole.STUDENT, count=row[3]),
        ]

    async def get_stats(self, org_id: int) -> OrganizationStats:
        courses_subquery = (
            select(func.count('*'))
            .select_from(Course)
            .where(courses_table.c.organization_id == org_id)
            .scalar_subquery()
        )
        teachers_subquery = (
            select(func.count('*'))
            .select_from(OrganizationMember)
            .where(
                organization_members_table.c.organization_id == org_id,
                organization_members_table.c.role == UserRole.TEACHER,
            )
            .scalar_subquery()
        )
        students_subquery = (
            select(func.count('*'))
            .select_from(OrganizationMember)
            .where(
                organization_members_table.c.organization_id == org_id,
                organization_members_table.c.role == UserRole.STUDENT,
            )
            .scalar_subquery()
        )
        group_subquery = (
            select(func.count('*'))
            .select_from(Group)
            .where(groups_table.c.organization_id == org_id)
            .scalar_subquery()
        )
        lessons_subquery = (
            select(func.count('*'))
            .select_from(Lesson)
            .where(
                lessons_table.c.organization_id == org_id,
                lessons_table.c.start_date.cast(Date)
                == datetime.now(UTC).date(),
            )
            .scalar_subquery()
        )
        income_subquery = (
            select(func.coalesce(func.sum(payments_table.c.amount), 0))
            .select_from(Payment)
            .where(payments_table.c.organization_id == org_id)
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
