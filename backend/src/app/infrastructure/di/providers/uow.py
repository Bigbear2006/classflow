from dishka import Provider, Scope, provide

from app.application.common.uow import UnitOfWork
from app.infrastructure.db.uow import SqlalchemyUnitOfWork


class UnitOfWorkProvider(Provider):
    uow = provide(
        SqlalchemyUnitOfWork,
        scope=Scope.REQUEST,
        provides=UnitOfWork,
    )
