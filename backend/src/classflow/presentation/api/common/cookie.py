from fastapi import Response
from fastapi.security import APIKeyCookie

cookie_scheme = APIKeyCookie(name='access')


def set_access_cookie(response: Response, access: str, *, domain: str | None = None) -> None:
    response.set_cookie(
        'access',
        access,
        domain=domain,
        secure=True,
        httponly=True,
        samesite='strict' if domain else 'none',
    )


def set_refresh_cookie(response: Response, refresh: str, *, domain: str | None = None) -> None:
    response.set_cookie(
        'refresh',
        refresh,
        path='/api/v1/users/refresh-token/',
        domain=domain,
        secure=True,
        httponly=True,
        samesite='strict' if domain else 'none',
    )
