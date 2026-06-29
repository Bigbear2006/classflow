from dataclasses import asdict

import pytest
from classflow.application.use_cases.address import CreateAddressDTO
from classflow.presentation.api.routers.address.models import (
    UpdateAddressRequest,
)
from httpx import AsyncClient


@pytest.mark.anyio
async def test_addresses(
    client: AsyncClient,
    owner_cookies: dict[str, str],
) -> None:
    client.cookies.update(owner_cookies)

    create_dto = CreateAddressDTO(address='Test Address')
    rsp = await client.post('/addresses/', json=asdict(create_dto))
    assert rsp.status_code == 201
    data = rsp.json()
    address_id = data['id']
    assert data['address'] == create_dto.address

    rsp = await client.get('/addresses/')
    assert rsp.status_code == 200
    data = rsp.json()
    assert any(create_dto.address == address['address'] for address in data)

    update_dto = UpdateAddressRequest(address='Updated Test Address')
    rsp = await client.patch(
        f'/addresses/{address_id}/', json=update_dto.model_dump()
    )
    assert rsp.status_code == 200
    data = rsp.json()
    assert data['address'] == update_dto.address

    rsp = await client.delete(f'/addresses/{address_id}/')
    assert rsp.status_code == 204

    rsp = await client.get('/addresses/')
    assert rsp.status_code == 200
    data = rsp.json()
    assert not any(
        create_dto.address == address['address'] for address in data
    )
