from pydantic import BaseModel, ConfigDict, Field


class PublicClipboardCreateRequest(BaseModel):
    content: str = Field(
        min_length=1,
    )


class PublicClipboardCreateResponse(BaseModel):
    code: str


class PublicClipboardResponse(BaseModel):
    content: str

    model_config = ConfigDict(
        from_attributes=True,
    )