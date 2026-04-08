from dishka import FromDishka
from dishka.integrations.fastapi import DishkaRoute
from fastapi import APIRouter

from app.application.use_cases.address.create import (
    CreateAddress,
    CreateAddressDTO,
)
from app.application.use_cases.address.delete import (
    DeleteAddress,
    DeleteAddressDTO,
)
from app.application.use_cases.address.get_all import GetAllAddresses
from app.application.use_cases.address.update import (
    UpdateAddress,
    UpdateAddressDTO,
)
from app.presentation.api.routers.address.models import (
    AddressDetailResponse,
    AddressResponse,
    UpdateAddressRequest,
)

address_router = APIRouter(
    prefix='/addresses',
    route_class=DishkaRoute,
    tags=['addresses'],
)


@address_router.post('/', status_code=201)
async def create_address_router(
    data: CreateAddressDTO,
    create_address: FromDishka[CreateAddress],
) -> AddressResponse:
    address = await create_address(data)
    return AddressResponse.model_validate(address)


@address_router.get('/')
async def get_addresses_router(
    get_all_addresses: FromDishka[GetAllAddresses],
) -> list[AddressDetailResponse]:
    addresses = await get_all_addresses()
    return [AddressDetailResponse.model_validate(addr) for addr in addresses]


@address_router.patch('/{address_id}/')
async def update_address_router(
    address_id: int,
    data: UpdateAddressRequest,
    update_address: FromDishka[UpdateAddress],
) -> AddressResponse:
    dto = UpdateAddressDTO(id=address_id, address=data.address)
    address = await update_address(dto)
    return AddressResponse.model_validate(address)


@address_router.delete('/{address_id}/', status_code=204)
async def delete_address_router(
    address_id: int,
    delete_address: FromDishka[DeleteAddress],
) -> None:
    dto = DeleteAddressDTO(id=address_id)
    await delete_address(dto)
