# Backend Notes

## Framework

FastAPI

---

## Database

PostgreSQL

---

## ORM

SQLAlchemy

---

## Migration Tool

Alembic

---

## Authentication

JWT

---

## Folder Structure

app/

routers/

services/

models/

schemas/

database/

core/

---

## API Endpoints

### Authentication

POST /auth/register

POST /auth/login

GET /users/me

### Clipboards

GET /clipboards

POST /clipboards

PUT /clipboards/{id}

DELETE /clipboards/{id}

POST /clipboards/{id}/share

### Public

POST /public/share

GET /public/{code}