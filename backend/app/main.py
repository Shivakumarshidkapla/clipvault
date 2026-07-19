from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.config import settings
from app.database.dependencies import get_db

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
)


@app.get("/")
def root():
    return {"message": "ClipVault API Running"}


@app.get("/health/db")
def database_health(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {"status": "Database connection successful"}