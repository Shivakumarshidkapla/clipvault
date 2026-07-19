from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from app.core.exceptions import UserAlreadyExistsException
from app.core.security import hash_password
from app.models.user import User
from app.schemas.user import UserRegisterRequest


def register_user(
    db: Session,
    user_data: UserRegisterRequest,
) -> User:

    existing_user = db.execute(
        select(User).where(
            or_(
                User.email == user_data.email,
                User.username == user_data.username,
            )
        )
    ).scalar_one_or_none()

    if existing_user:
        raise UserAlreadyExistsException(
            "Email or username already exists."
        )

    user = User(
        username=user_data.username,
        email=user_data.email,
        hashed_password=hash_password(user_data.password),
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user