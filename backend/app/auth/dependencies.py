from fastapi import Depends

from jose import JWTError
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.oauth2 import oauth2_scheme
from app.core.security import decode_access_token
from app.database.dependencies import get_db
from app.models.user import User
from app.core.exceptions import InvalidCredentialsException


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:

    payload = decode_access_token(token)

    if payload is None:
        raise InvalidCredentialsException()

    user_id = payload.get("sub")

    if not user_id:
        raise InvalidCredentialsException()

    user = db.execute(
        select(User).where(
            User.id == user_id
        )
    ).scalar_one_or_none()

    if not user:
        raise InvalidCredentialsException()

    return user