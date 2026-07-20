import secrets
import string

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.public_clipboard import PublicClipboard
from app.schemas.public_clipboard import (
    PublicClipboardCreateRequest,
    PublicClipboardCreateResponse,
)
from app.core.exceptions import InvalidShareCodeException

def generate_public_code(length: int = 6) -> str:
    alphabet = string.ascii_uppercase + string.digits

    return "".join(
        secrets.choice(alphabet)
        for _ in range(length)
    )

def create_public_clipboard(
    db: Session,
    data: PublicClipboardCreateRequest,
) -> PublicClipboardCreateResponse:

    while True:

        code = generate_public_code()

        existing = db.execute(
            select(PublicClipboard).where(
                PublicClipboard.share_code == code
            )
        ).scalar_one_or_none()

        if existing is None:
            break

    clipboard = PublicClipboard(
        content=data.content,
        share_code=code,
    )

    db.add(clipboard)
    db.commit()

    return PublicClipboardCreateResponse(
        code=code,
    )

def get_public_clipboard(
    db: Session,
    share_code: str,
) -> PublicClipboard:

    clipboard = db.execute(
        select(PublicClipboard).where(
            PublicClipboard.share_code == share_code
        )
    ).scalar_one_or_none()

    if clipboard is None:
        raise InvalidShareCodeException()

    return clipboard