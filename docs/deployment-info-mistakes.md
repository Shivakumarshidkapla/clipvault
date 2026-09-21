ClipVault Environment Cheat Sheet
1. Local Development (Fastest)

Purpose:

Write code
Debug quickly
Hot Reload

Architecture:

Browser
     │
localhost:5173
     │
     ▼
Vite Dev Server
     │
     ▼
Vite Proxy
     │
     ▼
localhost:8000
     │
     ▼
FastAPI (Uvicorn)

Run with:

npm run dev
uvicorn app.main:app --reload

Axios:

baseURL: "/api"

Proxy:

vite.config.ts

CORS:

✅ Enabled

Docker:

❌ Not used

Nginx:

❌ Not used

2. Local Docker (Integration Testing)

Purpose:

Verify Docker images
Verify Docker Compose
Verify Nginx
Verify production-like behavior

Architecture:

Browser
      │
localhost
      │
      ▼
Nginx Container
 ├── React
 └── FastAPI

Run with:

docker compose up

Axios:

baseURL: "/api"

Proxy:

nginx.conf

CORS:

❌ Not needed

Vite:

❌ Not used

Uvicorn:

Runs inside Docker

3. Production

Purpose:

Real users

Architecture:

Internet
      │
      ▼
AWS EC2
      │
      ▼
Nginx
 ├── React
 └── FastAPI
      │
      ▼
PostgreSQL

Run:

docker compose pull
docker compose up -d

Axios:

baseURL: "/api"

Proxy:

nginx.conf

CORS:

❌ Disabled

Backend Port:

❌ Not exposed publicly

The biggest lesson

Notice this:

Frontend

Never changes.

axios.create({
    baseURL: "/api"
})

Always the same.

Only the proxy changes.

Development

Browser

↓

Vite Proxy

↓

FastAPI

Production

Browser

↓

Nginx

↓

FastAPI

The frontend never knows.

Who is responsible for what?
React

Responsible for:

UI
Sending requests to /api

NOT responsible for:

Backend IP
Backend Port
Docker
Nginx
Vite

Only exists during development.

Responsible for:

/api

↓

localhost:8000

Nothing else.

Nginx

Only exists in Docker.

Responsible for:

/api

↓

backend:8000

and serving React.

FastAPI

Responsible for:

Business logic.

Should never know:

Vite exists
Nginx exists
Docker exists
Docker Compose

Responsible for:

Networks
Containers
Environment Variables
Port Mapping

NOT routing.

Routing belongs to Nginx.

Three different kinds of ports

This confused almost everyone (including me when I started).

Uvicorn Port
--port 8000

Application listens.

Dockerfile
EXPOSE 8000

Documentation.

Doesn't publish.

Docker Compose
ports:
  - "8000:8000"

Publishes.

Removes isolation.

Environment Variables

Development

.env

Production

.env.production

Eventually Kubernetes

Secrets
ConfigMaps

Your application shouldn't care where variables come from.

CORS

Development

Required

because

localhost:5173

↓

localhost:8000

Different origins.

Production

Not required

because

Browser

↓

Nginx

↓

FastAPI

Same origin.

Common mistakes
Mistake 1

Changing Axios every environment.

❌

Correct:

Always

baseURL: "/api"
Mistake 2

Changing nginx.conf for local.

❌

Local uses Vite Proxy.

Mistake 3

Using localhost in nginx.conf

Never.

Inside Docker

localhost

means

"My own container."

Use

backend

because Docker DNS resolves it.

Mistake 4

Thinking EXPOSE publishes ports.

No.

Only

ports:

publishes.

Mistake 5

Restarting a container after editing source.

Doesn't work.

Need

Build

↓

Push

↓

Pull

↓

Restart
The question I ask whenever something breaks

Whenever you see a problem, ask these in order:

Which environment am I in?
Local (npm + uvicorn)
Local Docker
Production
Who should be proxying?
Vite?
Nginx?
Where is the request going?
/api/...
Who should receive it?
Uvicorn?
Docker backend?
Is the application actually running?
uvicorn?
docker compose ps?

If you answer those five questions before diving into logs, you'll often identify the problem much faster.