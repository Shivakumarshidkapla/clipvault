from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.schemas.clipboard import PublicClipboardResponse
from app.services.clipboard_service import get_shared_clipboard

router = APIRouter(
    tags=["Public"],
)


@router.get(
    "/clip/{share_code}",
    response_model=PublicClipboardResponse,
)
def get_shared(
    share_code: str,
    db: Session = Depends(get_db),
):
    return get_shared_clipboard(
        db=db,
        share_code=share_code,
    )