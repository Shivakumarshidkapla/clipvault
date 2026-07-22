# Development Setup

## Backend

### Create Virtual Environment

```bash
python -m venv .venv
```

Activate

```bash
source .venv/bin/activate
```

Install packages

```bash
pip install -r requirements.txt
```

Run server

```bash
uvicorn app.main:app --reload
```

---

## Frontend

Install dependencies

```bash
npm install
```

Run

```bash
npm run dev
```

---

## Database

Start PostgreSQL

Create database

```sql
CREATE DATABASE clipvault;
```

Run migrations

```bash
alembic upgrade head
```