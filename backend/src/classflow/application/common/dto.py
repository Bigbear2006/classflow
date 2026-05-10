from dataclasses import dataclass
from typing import BinaryIO


@dataclass
class FileDTO:
    file: BinaryIO
    content_type: str
