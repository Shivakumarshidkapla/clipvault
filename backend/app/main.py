from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.config import settings
from app.database.dependencies import get_db
from app.routers.auth import router as auth_router
from app.routers.users import router as users_router
from app.routers.clipboard import router as clipboard_router
from app.routers.public import router as public_router

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
)
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(clipboard_router)
app.include_router(public_router)

@app.get("/")
def root():
    return {"message": "ClipVault API Running"}


@app.get("/health/db")
def database_health(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {"status": "Database connection successful"}