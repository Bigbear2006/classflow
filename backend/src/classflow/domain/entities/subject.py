from dataclasses import dataclass, field


@dataclass
class Subject:
    id: int = field(init=False)
    organization_id: int = field(init=False)
    name: str
    image: str
    description: str
