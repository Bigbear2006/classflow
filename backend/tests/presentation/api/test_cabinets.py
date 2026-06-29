from dataclasses import asdict

import pytest
from classflow.application.use_cases.cabinet import CreateCabinetDTO
from httpx import AsyncClient

from tests.domain.entities.address import test_address


@pytest.mark.anyio
async def test_cabinets(
    client: AsyncClient, owner_cookies: dict[str, str]
) -> None:
    client.cookies.update(owner_cookies)

    create_dto = CreateCabinetDTO(address_id=test_address.id, number='101')
    rsp = await client.post('/cabinets/', json=asdict(create_dto))
    assert rsp.status_code == 201
    data = rsp.json()
    cabinet_id = data['id']
    assert data['number'] == create_dto.number

    rsp = await client.get('/cabinets/')
    assert rsp.status_code == 200
    data = rsp.json()
    assert any(
        cabinet['id'] == cabinet_id
        and cabinet['address']['id'] == create_dto.address_id
        and cabinet['number'] == create_dto.number
        for cabinet in data
    )

    rsp = await client.delete(f'/cabinets/{cabinet_id}/')
    assert rsp.status_code == 204

    rsp = await client.get('/cabinets/')
    assert rsp.status_code == 200
    data = rsp.json()
    assert not any(cabinet['id'] == cabinet_id for cabinet in data)
