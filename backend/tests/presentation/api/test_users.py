from dataclasses import asdict

import pytest
from classflow.application.use_cases.user import (
    ChangeUserPasswordDTO,
    LoginUserDTO,
    RegisterUserDTO,
    UpdateCurrentUserDTO,
)
from classflow.application.verification.data_generator import VerificationData
from httpx import AsyncClient

from tests.infrastructure.verification.test_data_generator import (
    TEST_VERIFICATION_CODE,
)


@pytest.mark.anyio
async def test_users(client: AsyncClient) -> None:
    register_dto = RegisterUserDTO(
        fullname='Test User',
        email='test@gmail.com',
        phone='+79001112233',
        password='test-password',
    )
    rsp = await client.post('/users/', json=asdict(register_dto))
    token = rsp.json().get('token')
    assert token

    verification_data = VerificationData(
        code=TEST_VERIFICATION_CODE,
        token=token,
    )
    rsp = await client.post(
        '/users/verify-email/',
        json=asdict(verification_data),
    )
    assert rsp.status_code == 204

    login_dto = LoginUserDTO(
        email=register_dto.email,
        password=register_dto.password,
    )
    rsp = await client.post('/users/login/', json=asdict(login_dto))
    assert rsp.status_code == 204
    access = rsp.cookies['access']
    client.cookies.update({'access': access})

    rsp = await client.get('/users/me/')
    data = rsp.json()
    assert data['fullname'] == register_dto.fullname
    assert data['email'] == register_dto.email
    assert data['phone'] == register_dto.phone

    update_dto = UpdateCurrentUserDTO(
        fullname='Updated Test User',
        phone=register_dto.phone,
    )
    rsp = await client.put('/users/me/', json=asdict(update_dto))
    data = rsp.json()
    assert data['fullname'] == update_dto.fullname
    assert data['email'] == register_dto.email
    assert data['phone'] == update_dto.phone

    change_password_dto = ChangeUserPasswordDTO(
        old_password=register_dto.password,
        new_password='updated-test-password',
    )
    rsp = await client.patch(
        '/users/me/change-password/', json=asdict(change_password_dto)
    )
    assert rsp.status_code == 204

    client.cookies.delete('access')
    assert client.cookies.get('access') is None

    login_dto = LoginUserDTO(
        email=register_dto.email,
        password=change_password_dto.new_password,
    )
    rsp = await client.post('/users/login/', json=asdict(login_dto))
    assert rsp.status_code == 204
