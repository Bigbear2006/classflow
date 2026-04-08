from dataclasses import dataclass, field
from datetime import timedelta
from typing import Literal

from environs import env

env.read_env()

Algorithm = Literal[
    'HS256',
    'HS384',
    'HS512',
    'RS256',
    'RS384',
    'RS512',
]


@dataclass
class JWTConfig:
    SECRET_KEY: str = field(default_factory=lambda: env('JWT_SECRET_KEY'))
    EXPIRATION: timedelta = timedelta(days=7)
    ALGORITHM: Algorithm = 'HS256'
