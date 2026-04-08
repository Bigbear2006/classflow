from pydantic import BaseModel, ConfigDict


class CabinetResponse(BaseModel):
    id: int
    number: int
    model_config = ConfigDict(from_attributes=True)


class CabinetDetailResponse(CabinetResponse):
    address_id: int
