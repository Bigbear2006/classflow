from dataclasses import dataclass, field


@dataclass
class Subject:
    id: int = field(init=False)
    organization_id: int
    name: str
    image: str
    description: str
