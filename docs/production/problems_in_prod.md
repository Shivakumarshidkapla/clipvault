ClipVault Deployment Notes
Final Architecture
                GitHub
                   │
          Push Tag (v1.0.x)
                   │
                   ▼
          GitHub Actions (CI)
        ┌─────────────────────┐
        │ Build Backend Image │
        │ Build Frontend Image│
        │ Push to Docker Hub  │
        └─────────────────────┘
                   │
                   ▼
             Docker Hub
                   │
                   ▼
             AWS EC2 Server
                   │
           docker compose pull
                   │
                   ▼
      ┌────────────────────────────┐
      │ clipvault-frontend (Nginx) │
      │ clipvault-backend (FastAPI)│
      │ PostgreSQL                │
      └────────────────────────────┘
Problems Encountered During Deployment
1. Backend couldn't connect from the browser
Symptom
CORS Error
Root Cause

Frontend was still trying to connect to

http://localhost:8000

Inside the browser:

Browser
↓

localhost

means

My laptop

NOT

EC2 Server

Fix

Frontend .env

VITE_API_URL=http://3.92.21.16:8000
2. .env wasn't available inside Docker
Symptom

Inside compiled JS

baseURL: undefined
Root Cause

Frontend .dockerignore

contained

.env

Docker never copied the file into build context.

Vite therefore built

baseURL: undefined
Fix

Removed

.env

from

frontend/.dockerignore
3. Browser couldn't reach backend
Symptom
ERR_CONNECTION_TIMED_OUT
Root Cause

AWS Security Group

didn't allow

TCP 8000
Fix

Temporary inbound rule

TCP 8000
0.0.0.0/0
4. React routes returned 404
Symptom

Refreshing

/register
/login
/dashboard

returned

404 Not Found
nginx
Root Cause

Default nginx configuration.

Nginx searched for

/register

as a file.

React Router never got a chance.

Fix

Custom

location / {
    try_files $uri $uri/ /index.html;
}
5. PostgreSQL had no tables
Symptom
relation users does not exist
Root Cause

Fresh PostgreSQL container.

Alembic migrations were never executed.

Fix
alembic upgrade head
6. Production API debugging

Instead of guessing, we debugged in layers.

Browser

Developer Tools

↓

Network

Verified:

URL
Status code
Headers

↓

Docker
docker logs

↓

Container
docker exec

↓

PostgreSQL

Verified schema

↓

AWS

Verified

Security Groups
Ports

This is exactly how production debugging should be approached.