from pydantic import BaseModel, ConfigDict


class CabinetResponse(BaseModel):
    id: int
    number: int
    model_config = ConfigDict(from_attributes=True)


# Duplicate class to avoid circular import
class _AddressResponse(BaseModel):
    id: int
    address: str
    model_config = ConfigDict(from_attributes=True)


class DetailCabinetResponse(CabinetResponse):
    address: _AddressResponse
