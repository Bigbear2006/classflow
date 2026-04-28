from typing import Any


class ApplicationError(Exception):
    def __init__(
        self,
        message: str,
        **context: Any,
    ) -> None:
        self.message = message
        self.context = context


class NotFoundError(ApplicationError):
    pass


class AlreadyExistsError(ApplicationError):
    pass


class CannotDeleteEntityError(ApplicationError):
    pass


class InvalidCredentialsError(ApplicationError):
    def __init__(self, **context: Any) -> None:
        super().__init__('Invalid email or password', **context)


class NotAuthenticatedError(ApplicationError):
    def __init__(self, **context: Any) -> None:
        super().__init__('Not authenticated', **context)


class OrganizationNotResolvedError(ApplicationError):
    def __init__(self, **context: Any) -> None:
        super().__init__('Failed to determine current organization', **context)


class PermissionDeniedError(ApplicationError):
    def __init__(self, **context: Any) -> None:
        super().__init__(
            'Permission denied for your role in current organization',
            **context,
        )


class ValidationError(ApplicationError):
    pass


class DefaultCabinetIsNotSetError(ValidationError):
    def __init__(self) -> None:
        super().__init__(
            'Field cabinet_id is required because default cabinet is not set',
        )
