from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.dependencies import get_db
from app.models.user import User
from app.schemas.clipboard import (
    ClipboardCreateRequest,
    ClipboardResponse,
    ClipboardUpdateRequest,
    ShareClipboardResponse
)

from app.services.clipboard_service import (
    create_clipboard,
    get_clipboards,
    get_clipboard,
    update_clipboard,
    delete_clipboard,
    share_clipboard
)
from fastapi import Response

router = APIRouter(
    prefix="/clipboards",
    tags=["Clipboards"],
)


@router.post(
    "",
    response_model=ClipboardResponse,
    status_code=status.HTTP_201_CREATED,
)
def create(
    clipboard: ClipboardCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_clipboard(
        db=db,
        current_user=current_user,
        clipboard_data=clipboard,
    )

@router.get(
    "",
    response_model=list[ClipboardResponse],
)
def get_all(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_clipboards(
        db=db,
        current_user=current_user,
    )

@router.get(
    "/{clipboard_id}",
    response_model=ClipboardResponse,
)
def get_one(
    clipboard_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_clipboard(
        db=db,
        clipboard_id=clipboard_id,
        current_user=current_user,
    )

@router.put(
    "/{clipboard_id}",
    response_model=ClipboardResponse,
)
def update(
    clipboard_id: str,
    clipboard: ClipboardUpdateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return update_clipboard(
        db=db,
        clipboard_id=clipboard_id,
        current_user=current_user,
        clipboard_data=clipboard,
    )

@router.delete(
    "/{clipboard_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete(
    clipboard_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    delete_clipboard(
        db=db,
        clipboard_id=clipboard_id,
        current_user=current_user,
    )

    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.post(
    "/{clipboard_id}/share",
    response_model=ShareClipboardResponse,
)
def share(
    clipboard_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return share_clipboard(
        db=db,
        clipboard_id=clipboard_id,
        current_user=current_user,
    )