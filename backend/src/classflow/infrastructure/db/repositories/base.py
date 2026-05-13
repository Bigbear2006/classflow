from typing import Any

from sqlalchemy import Result, text
from sqlalchemy.exc import NoResultFound
from sqlalchemy.ext.asyncio import AsyncSession

from classflow.domain.exceptions import NotFoundError


async def create[T](session: AsyncSession, obj: T) -> T:
    session.add(obj)
    await session.flush()
    return obj


def get_one[T](result: Result[T]) -> T:
    try:
        return result.scalar_one()
    except NoResultFound as e:
        raise NotFoundError() from e


async def set_current_org_id(session: AsyncSession, org_id: int) -> None:
    await session.execute(text(f'SET LOCAL app.current_org_id = {org_id}'))


def exclude_none(**data: Any) -> dict[str, Any]:
    return {k: v for k, v in data.items() if v is not None}
