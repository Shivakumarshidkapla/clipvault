                Development

Browser
     │
localhost:5173
     │
     ▼
Vite Proxy
     │
     ▼
FastAPI
     │
     ▼
PostgreSQL


          Local Docker / Production

Browser
     │
     ▼
Nginx
 ├── React
 └── FastAPI
      │
      ▼
PostgreSQL


# ClipVault - Environment Guide

This document explains how ClipVault runs in different environments and the responsibilities of each component.

---

# Architecture Overview

ClipVault supports three environments:

1. Local Development
2. Local Docker (Production-like)
3. Production (AWS)

The frontend code remains identical across all environments.

```ts
export const api = axios.create({
    baseURL: "/api",
});
```

Only the proxy changes.

---

# 1. Local Development

## Purpose

- Develop new features
- Debug quickly
- Hot Module Replacement (HMR)

## Components

- React (Vite)
- FastAPI (Uvicorn)
- PostgreSQL (optional Docker/local)

## Start

Backend

```bash
cd backend
uvicorn app.main:app --reload
```

Frontend

```bash
cd frontend
npm install
npm run dev
```

## Architecture

```
Browser
     │
localhost:5173
     │
     ▼
Vite Dev Server
     │
Vite Proxy
     │
     ▼
localhost:8000
     │
     ▼
FastAPI
```

## Proxy

Vite handles API proxying.

Configuration:

```
frontend/vite.config.ts
```

```ts
server: {
    proxy: {
        "/api": {
            target: "http://localhost:8000",
            changeOrigin: true,
        },
    },
}
```

## CORS

Enabled.

Reason:

```
localhost:5173

↓

localhost:8000
```

Different origins require CORS.

---

# 2. Local Docker

## Purpose

- Test Docker images
- Verify Docker Compose
- Verify Nginx configuration
- Simulate production locally

## Start

```bash
docker compose up --build
```

## Architecture

```
Browser
     │
localhost
     │
     ▼
Nginx Container
 ├── React
 └── FastAPI
      │
      ▼
PostgreSQL
```

## Proxy

Handled by

```
frontend/nginx.conf
```

```nginx
location /api/ {
    proxy_pass http://backend:8000;
}
```

Docker Compose provides internal DNS.

```
backend
```

automatically resolves to the backend container.

## CORS

Disabled.

Reason:

Everything is served from the same origin through Nginx.

---

# 3. Production

## Purpose

Production deployment on AWS EC2.

## Components

- Docker Compose
- Nginx
- FastAPI
- PostgreSQL

## Deployment

GitHub Actions

↓

Docker Hub

↓

EC2

↓

docker compose pull

↓

docker compose up -d

## Architecture

```
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
```

## Proxy

Handled by

```
frontend/nginx.conf
```

Backend is reachable only inside the Docker network.

---

# Environment Variables

## Development

```
backend/.env
```

```
ENVIRONMENT=development
DEBUG=True
```

## Production

```
backend/.env.production
```

```
ENVIRONMENT=production
DEBUG=False
```

Docker Compose loads the production environment file.

---

# Proxy Responsibility

| Environment | Proxy |
|-------------|-------|
| Local Development | Vite |
| Local Docker | Nginx |
| Production | Nginx |

The frontend never knows where the backend is.

It always sends requests to:

```
/api
```

---

# Port Usage

## Backend

Application listens on:

```
8000
```

## Dockerfile

```dockerfile
EXPOSE 8000
```

This documents that the application listens on port 8000.

It does NOT publish the port.

## Docker Compose

```yaml
ports:
  - "8000:8000"
```

Publishes the container port to the host.

Production no longer exposes the backend port publicly.

---

# CORS

| Environment | Enabled |
|------------|---------|
| Development | Yes |
| Local Docker | No |
| Production | No |

CORS is enabled only during local development because React and FastAPI run on different origins.

---

# Common Commands

## Local Development

Backend

```bash
uvicorn app.main:app --reload
```

Frontend

```bash
npm run dev
```

---

## Local Docker

```bash
docker compose up --build
```

Stop

```bash
docker compose down
```

---

## Production

Pull latest images

```bash
docker compose -f docker-compose.prod.yml pull
```

Restart

```bash
docker compose -f docker-compose.prod.yml up -d
```

Logs

```bash
docker compose -f docker-compose.prod.yml logs -f
```

---

# Troubleshooting

## Browser requests fail locally

Check:

- Is Vite running?
- Is Uvicorn running?
- Is Vite proxy configured?

---

## Docker requests fail

Check:

- Is the backend container running?
- Is nginx.conf using

```
proxy_pass http://backend:8000;
```

- Are all containers on the same Docker network?

---

## Production requests fail

Check:

- GitHub Actions completed successfully.
- Images were pushed to Docker Hub.
- EC2 pulled the latest images.
- Containers restarted successfully.
- Nginx logs.
- Backend logs.

---

# Design Principles

- Frontend never knows the backend address.
- Reverse proxy handles request routing.
- Backend is not publicly exposed.
- Docker networking uses service names instead of IP addresses.
- Configuration is environment-specific.
- Production mirrors local Docker as closely as possible.