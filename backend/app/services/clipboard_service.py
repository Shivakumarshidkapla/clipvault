from sqlalchemy.orm import Session
import secrets
import string

from app.models.clipboard import Clipboard
from app.models.user import User
from app.schemas.clipboard import (
    ClipboardCreateRequest,
    ClipboardUpdateRequest,
    ShareClipboardResponse
)
from sqlalchemy import select

from app.core.exceptions import ClipboardNotFoundException
from app.core.exceptions import InvalidShareCodeException


def generate_share_code(length: int = 6) -> str:
    alphabet = string.ascii_uppercase + string.digits

    return "".join(
        secrets.choice(alphabet)
        for _ in range(length)
    )


def create_clipboard(
    db: Session,
    current_user: User,
    clipboard_data: ClipboardCreateRequest,
) -> Clipboard:

    clipboard = Clipboard(
        title=clipboard_data.title,
        content=clipboard_data.content,
        owner_id=current_user.id,
    )

    db.add(clipboard)
    db.commit()
    db.refresh(clipboard)

    return clipboard


def get_clipboard_or_404(
    db: Session,
    clipboard_id: str,
    current_user: User,
) -> Clipboard:

    clipboard = db.execute(
        select(Clipboard).where(
            Clipboard.id == clipboard_id,
            Clipboard.owner_id == current_user.id,
        )
    ).scalar_one_or_none()

    if clipboard is None:
        raise ClipboardNotFoundException()

    return clipboard

def get_clipboards(
    db: Session,
    current_user: User,
) -> list[Clipboard]:

    return (
        db.execute(
            select(Clipboard)
            .where(
                Clipboard.owner_id == current_user.id
            )
            .order_by(
                Clipboard.updated_at.desc()
            )
        )
        .scalars()
        .all()
    )

def get_clipboard(
    db: Session,
    clipboard_id: str,
    current_user: User,
) -> Clipboard:
    return get_clipboard_or_404(
        db=db,
        clipboard_id=clipboard_id,
        current_user=current_user,
    )

def update_clipboard(
    db: Session,
    clipboard_id: str,
    current_user: User,
    clipboard_data: ClipboardUpdateRequest,
) -> Clipboard:

    clipboard = get_clipboard_or_404(
        db=db,
        clipboard_id=clipboard_id,
        current_user=current_user,
    )

    clipboard.title = clipboard_data.title
    clipboard.content = clipboard_data.content

    db.commit()
    db.refresh(clipboard)

    return clipboard

def delete_clipboard(
    db: Session,
    clipboard_id: str,
    current_user: User,
) -> None:

    clipboard = get_clipboard_or_404(
        db=db,
        clipboard_id=clipboard_id,
        current_user=current_user,
    )

    db.delete(clipboard)
    db.commit()

def share_clipboard(
    db: Session,
    clipboard_id: str,
    current_user: User,
) -> ShareClipboardResponse:

    clipboard = get_clipboard_or_404(
        db=db,
        clipboard_id=clipboard_id,
        current_user=current_user,
    )

    if clipboard.share_code is None:

        while True:
            code = generate_share_code()

            existing = db.execute(
                select(Clipboard).where(
                    Clipboard.share_code == code
                )
            ).scalar_one_or_none()

            if existing is None:
                clipboard.share_code = code
                db.commit()
                db.refresh(clipboard)
                break

    return ShareClipboardResponse(
        share_code=clipboard.share_code,
        share_url=f"/clip/{clipboard.share_code}",
    )


def get_shared_clipboard(
    db: Session,
    share_code: str,
) -> Clipboard:

    clipboard = db.execute(
        select(Clipboard).where(
            Clipboard.share_code == share_code
        )
    ).scalar_one_or_none()

    if clipboard is None:
        raise InvalidShareCodeException()

    return clipboard