from pydantic import BaseModel, ConfigDict

from classflow.presentation.api.common.models import AddressResponse


class CabinetResponse(BaseModel):
    id: int
    number: str
    model_config = ConfigDict(from_attributes=True)


class CabinetDetailResponse(CabinetResponse):
    address: AddressResponse
