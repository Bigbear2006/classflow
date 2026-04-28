export interface CreateCabinetData {
  address_id: number;
  number: string;
}

export interface CabinetResponse {
  id: number;
  number: string;
}

interface _AddressResponse {
  id: number;
  address: string;
}

export interface CabinetDetailResponse extends CabinetResponse {
  address: _AddressResponse;
}
