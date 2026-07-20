from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.schemas.public_clipboard import (
    PublicClipboardCreateRequest,
    PublicClipboardCreateResponse,
    PublicClipboardResponse,
)
from app.services.public_clipboard_service import (
    create_public_clipboard,
    get_public_clipboard,
)

router = APIRouter(
    prefix="/public",
    tags=["Public Clipboard"],
)

@router.post(
    "/share",
    response_model=PublicClipboardCreateResponse,
)
def create(
    clipboard: PublicClipboardCreateRequest,
    db: Session = Depends(get_db),
):
    return create_public_clipboard(
        db=db,
        data=clipboard,
    )

@router.get(
    "/{share_code}",
    response_model=PublicClipboardResponse,
)
def get(
    share_code: str,
    db: Session = Depends(get_db),
):
    return get_public_clipboard(
        db=db,
        share_code=share_code,
    )