from asyncpg import UniqueViolationError
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from classflow.application.repositories.user import UserRepository
from classflow.domain.entities import User
from classflow.domain.exceptions import AlreadyExistsError
from classflow.infrastructure.db.repositories.base import create, exclude_none
from classflow.infrastructure.db.tables import users_table


class UserRepositoryImpl(UserRepository):
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(self, user: User) -> User:
        try:
            return await create(self.session, user)
        except UniqueViolationError as e:
            raise AlreadyExistsError(
                'User already exists',
                email=user.email,
            ) from e

    async def get_by_id(self, id: int) -> User | None:
        stmt = select(User).where(users_table.c.id == id)
        rows = await self.session.execute(stmt)
        return rows.unique().scalar_one_or_none()

    async def get_by_email(self, email: str) -> User | None:
        stmt = select(User).where(users_table.c.email == email)
        rows = await self.session.execute(stmt)
        return rows.unique().scalar_one_or_none()

    async def update(
        self,
        id: int,
        *,
        fullname: str | None = None,
        phone: str | None = None,
        password: str | None = None,
    ) -> User:
        data = exclude_none(fullname=fullname, phone=phone, password=password)
        stmt = (
            update(User)
            .where(users_table.c.id == id)
            .values(data)
            .returning(User)
        )
        rows = await self.session.execute(stmt)
        return rows.scalar_one()
