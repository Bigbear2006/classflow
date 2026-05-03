export interface Address {
  id: number;
  address: string;
}

export interface AddressDetail extends Address {
  cabinets: Cabinet[];
}

export interface Cabinet {
  id: number;
  number: string;
}

export interface CabinetDetail extends Cabinet {
  address: Address;
}
