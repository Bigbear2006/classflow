import logging

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from classflow.domain.exceptions import (
    AlreadyExistsError,
    ApplicationError,
    CannotDeleteEntityError,
    InvalidCredentialsError,
    InvalidVerificationCodeError,
    NotAuthenticatedError,
    NotFoundError,
    OrganizationNotResolvedError,
    PermissionDeniedError,
    TooManyAttemptsError,
    ValidationError,
)
from classflow.presentation.api.common.models import ErrorResponse

logger = logging.getLogger('classflow')

CODES_MAPPING = {
    ApplicationError: 'APPLICATION_ERROR',
    NotFoundError: 'NOT_FOUND',
    AlreadyExistsError: 'ALREADY_EXISTS',
    CannotDeleteEntityError: 'CANNOT_DELETE_ENTITY',
    InvalidCredentialsError: 'INVALID_CREDENTIALS',
    TooManyAttemptsError: 'TOO_MANY_ATTEMPTS',
    InvalidVerificationCodeError: 'INVALID_VERIFICATION_CODE',
    NotAuthenticatedError: 'NOT_AUTHENTICATED',
    OrganizationNotResolvedError: 'ORGANIZATION_NOT_RESOLVED',
    PermissionDeniedError: 'PERMISSION_DENIED',
    ValidationError: 'BAD_REQUEST',
}

STATUSES_MAPPING = {
    ApplicationError: 500,
    NotFoundError: 404,
    AlreadyExistsError: 409,
    CannotDeleteEntityError: 409,
    InvalidCredentialsError: 401,
    InvalidVerificationCodeError: 422,
    TooManyAttemptsError: 429,
    NotAuthenticatedError: 401,
    OrganizationNotResolvedError: 400,
    PermissionDeniedError: 403,
    ValidationError: 422,
}


async def application_exception_handler(
    request: Request,
    exc: ApplicationError,
) -> JSONResponse:
    exc_type = type(exc)
    if isinstance(exc_type, ValidationError):
        exc_type = ValidationError

    code = CODES_MAPPING.get(exc_type, 'INTERNAL_SERVER_ERROR')
    status = STATUSES_MAPPING.get(exc_type, 500)

    error_rsp = ErrorResponse(
        code=code,
        message=exc.message,
        context=exc.context,
    )
    return JSONResponse(error_rsp.model_dump(), status_code=status)


async def unknown_exception_handler(
    request: Request,
    exc: Exception,
) -> JSONResponse:
    error_rsp = ErrorResponse(
        code='INTERNAL_SERVER_ERROR',
        message='Internal Server Error',
        context={},
    )
    logger.exception(
        f'{request.url} {exc.__class__.__name__}: {exc}',
        exc_info=exc,
    )
    return JSONResponse(error_rsp.model_dump(), status_code=500)


def setup_exception_handlers(app: FastAPI) -> None:
    app.add_exception_handler(ApplicationError, application_exception_handler)  # type: ignore
    app.add_exception_handler(Exception, unknown_exception_handler)
