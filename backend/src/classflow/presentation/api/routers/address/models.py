from pydantic import BaseModel, ConfigDict

from classflow.presentation.api.routers.cabinet.models import CabinetResponse


class AddressResponse(BaseModel):
    id: int
    address: str
    model_config = ConfigDict(from_attributes=True)


class AddressDetailResponse(AddressResponse):
    cabinets: list[CabinetResponse]


class UpdateAddressRequest(BaseModel):
    address: str
