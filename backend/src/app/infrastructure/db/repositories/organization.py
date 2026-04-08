from typing import cast

from sqlalchemy import or_, select, update

from app.application.repositories.organization import OrganizationRepository
from app.domain.entities import Organization, OrganizationMember
from app.infrastructure.db.models import (
    RawSession,
    organization_members_table,
    organizations_table,
)
from app.infrastructure.db.repositories.base import (
    create,
    exclude_none,
    set_current_org_id,
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
            select(Organization, OrganizationMember.role)
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
        for org, role in rows.__iter__():
            org.role = role
            orgs.append(org)
        return cast(list[Organization], orgs)
