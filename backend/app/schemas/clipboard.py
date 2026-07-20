from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class ClipboardCreateRequest(BaseModel):
    title: str = Field(
        min_length=1,
        max_length=255,
    )

    content: str = Field(
        min_length=1,
    )


class ClipboardUpdateRequest(BaseModel):
    title: str = Field(
        min_length=1,
        max_length=255,
    )

    content: str = Field(
        min_length=1,
    )


class ClipboardResponse(BaseModel):
    id: UUID
    title: str
    content: str
    share_code: str | None

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )

class ShareClipboardResponse(BaseModel):
    share_code: str
    share_url: str

class PublicClipboardResponse(BaseModel):
    title: str
    content: str

    model_config = ConfigDict(
        from_attributes=True,
    )