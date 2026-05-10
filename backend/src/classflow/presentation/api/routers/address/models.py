from pydantic import BaseModel

from classflow.presentation.api.common.models import AddressResponse
from classflow.presentation.api.routers.cabinet.models import CabinetResponse


class AddressDetailResponse(AddressResponse):
    cabinets: list[CabinetResponse]


class UpdateAddressRequest(BaseModel):
    address: str
