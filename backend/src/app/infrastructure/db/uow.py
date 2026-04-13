from types import TracebackType

from sqlalchemy.ext.asyncio import AsyncSession

from app.application.common.uow import UnitOfWork


class SqlalchemyUnitOfWork(UnitOfWork):
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def commit(self) -> None:
        await self.session.commit()

    async def rollback(self) -> None:
        await self.session.rollback()

    async def flush(self) -> None:
        await self.session.flush()

    async def __aenter__(self) -> 'SqlalchemyUnitOfWork':
        return self

    async def __aexit__(
        self,
        exc_type: type[BaseException] | None,
        exc_val: BaseException | None,
        exc_tb: TracebackType | None,
    ) -> None:
        try:
            await self.commit()
        except:
            await self.rollback()
