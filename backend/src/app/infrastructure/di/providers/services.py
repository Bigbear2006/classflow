from dishka import Provider, Scope, provide

from app.application.services.permission import PermissionService


class ServicesProvider(Provider):
    scope = Scope.REQUEST

    permission = provide(PermissionService)
