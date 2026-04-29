from dataclasses import dataclass, field


@dataclass
class Address:
    id: int = field(init=False)
    organization_id: int
    address: str
    cabinets: list['Cabinet'] = field(default_factory=list)


@dataclass
class Cabinet:
    id: int = field(init=False)
    address_id: int
    address: Address | None = field(init=False, default=None)
    number: str
