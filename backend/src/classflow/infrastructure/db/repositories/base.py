from typing import Any

from sqlalchemy import Result, text
from sqlalchemy.exc import IntegrityError, NoResultFound
from sqlalchemy.ext.asyncio import AsyncSession

from classflow.domain.exceptions import AlreadyExistsError, NotFoundError


async def create[T](session: AsyncSession, obj: T) -> T:
    session.add(obj)
    try:
        await session.flush()
        return obj
    except IntegrityError as e:
        if 'UniqueViolationError' in str(e.orig):
            raise AlreadyExistsError('Object already exists') from e
        raise e


def get_one[T](result: Result[T]) -> T:
    try:
        return result.scalar_one()
    except NoResultFound as e:
        raise NotFoundError() from e


async def set_current_org_id(session: AsyncSession, org_id: int) -> None:
    await session.execute(text(f'SET LOCAL app.current_org_id = {org_id}'))


def exclude_none(**data: Any) -> dict[str, Any]:
    return {k: v for k, v in data.items() if v is not None}
