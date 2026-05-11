import hashlib
import hmac
import logging
from typing import Any

from asyncpg.pgproto.pgproto import timedelta
from redis.asyncio import Redis

from classflow.application.verification.data_generator import VerificationData
from classflow.application.verification.repository import (
    VerificationDataRepository,
)
from classflow.domain.exceptions import (
    InvalidVerificationCodeError,
    TooManyAttemptsError,
)

MAX_ATTEMPTS = 5
CODE_TTL = timedelta(minutes=10)
RESEND_TTL = timedelta(minutes=3)

logger = logging.getLogger(__name__)


def _hash_code(code: str) -> str:
    return hashlib.sha256(code.encode()).hexdigest()


class RedisVerificationDataRepository(VerificationDataRepository):
    def __init__(self, redis: Redis) -> None:
        self.redis = redis

    async def save(self, data: VerificationData, user_id: int) -> None:
        hashed_code = _hash_code(str(data.code))
        key = f'verify_email:{data.token}'
        await self.redis.hset(
            key,
            mapping={'code': hashed_code, 'user_id': user_id, 'attempts': 0},
        )
        await self.redis.expire(key, CODE_TTL)

    async def _get_saved_data(self, token: str) -> dict[str, Any]:
        key = f'verify_email:{token}'
        saved_data = await self.redis.hgetall(key)
        if not saved_data:
            raise InvalidVerificationCodeError()
        return saved_data

    async def verify(self, data: VerificationData) -> int:
        saved_data = await self._get_saved_data(data.token)

        attempts = saved_data.get('attempts', 0)
        if int(attempts) >= MAX_ATTEMPTS:
            raise TooManyAttemptsError()

        if hmac.compare_digest(
            saved_data.get('code', ''),
            _hash_code(data.code),
        ):
            user_id = saved_data.get('user_id')
            if user_id and user_id.isdigit():
                return int(user_id)
            logger.info(f'Saved user_id is invalid: {user_id}')
            raise InvalidVerificationCodeError()

        saved_data['attempts'] = attempts + 1
        await self.redis.hset(f'verify_email:{data.token}', mapping=saved_data)
        raise InvalidVerificationCodeError()
