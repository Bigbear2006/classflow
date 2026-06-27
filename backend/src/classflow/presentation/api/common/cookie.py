from fastapi import Response
from fastapi.security import APIKeyCookie

from classflow.infrastructure.auth.config import JWTConfig
from classflow.infrastructure.auth.token_processor import TokenType
from classflow.infrastructure.di.container import container

cookie_scheme = APIKeyCookie(name='access')


def _set_token_cookie(
    response: Response,
    token_type: TokenType,
    value: str,
    max_age: int | None = None,
) -> None:
    jwt_config = container.get_sync(JWTConfig)
    domain = jwt_config.DOMAIN

    if max_age is None:
        if token_type == TokenType.ACCESS:
            max_age = int(jwt_config.ACCESS_TOKEN_LIFETIME.total_seconds())
        else:
            max_age = int(jwt_config.REFRESH_TOKEN_LIFETIME.total_seconds())

    response.set_cookie(
        token_type.value.lower(),
        value,
        domain=domain,
        secure=bool(domain),
        httponly=True,
        samesite='strict' if domain else 'lax',
        max_age=max_age,
    )


def set_access_cookie(response: Response, access: str) -> None:
    _set_token_cookie(response, TokenType.ACCESS, access)


def delete_access_cookie(response: Response) -> None:
    _set_token_cookie(response, TokenType.ACCESS, value='', max_age=0)


def set_refresh_cookie(response: Response, refresh: str) -> None:
    _set_token_cookie(response, TokenType.REFRESH, refresh)


def delete_refresh_cookie(response: Response) -> None:
    _set_token_cookie(response, TokenType.REFRESH, value='', max_age=0)
