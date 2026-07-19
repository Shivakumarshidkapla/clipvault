from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.schemas.user import UserRegisterRequest, UserResponse
from app.services.auth_service import register_user
from app.schemas.user import (
    UserLoginRequest,
    TokenResponse,
)
from app.services.auth_service import (
    login_user,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=201,
)
def register(
    user: UserRegisterRequest,
    db: Session = Depends(get_db),
):
    return register_user(db, user)


@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    user: UserLoginRequest,
    db: Session = Depends(get_db),
):
    return login_user(db, user)