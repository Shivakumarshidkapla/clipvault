# 🚀 ClipVault - Secure Cloud Clipboard

ClipVault is a secure cloud clipboard application that allows users to save, organize, and securely share clipboard content across devices.

The project was built to demonstrate full-stack development and modern DevOps practices, including Docker, CI/CD, and cloud deployment.

---

# ✨ Features

- 🔐 JWT Authentication
- 👤 User Registration & Login
- 📋 Personal Clipboard Management
- ➕ Create, Update & Delete Clipboards
- 🌍 Public Clipboard Sharing
- 🔑 Unique Share Code Generation
- 📥 Import Shared Clipboards into Personal Account
- 🚪 Guest & Protected Routes
- 🐳 Docker Development Environment
- 🚀 Production-Ready Docker Images
- 📦 Multi-stage Frontend Docker Build
- 💾 PostgreSQL Database
- ⚡ FastAPI Backend
- ⚛️ React + TypeScript Frontend

---

# 🏗️ Architecture

```
                   Browser
                      │
                      ▼
              React + Vite (Development)
                      │
                      ▼
                 FastAPI Backend
                      │
                      ▼
                 PostgreSQL Database
```

Production Architecture

```
                 Browser
                    │
                    ▼
                 Nginx
                    │
                    ▼
              FastAPI Backend
                    │
                    ▼
             PostgreSQL Database
```

---

# 🛠️ Tech Stack

## Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- TanStack Query
- Axios
- React Router

## Backend

- FastAPI
- SQLAlchemy
- Alembic
- PostgreSQL
- JWT Authentication
- Pydantic

## DevOps

- Docker
- Docker Compose
- Multi-stage Docker Builds
- Nginx
- Git & GitHub

---

# 📂 Project Structure

```
clipvault/
│
├── backend/
│   ├── app/
│   ├── Dockerfile
│   ├── Dockerfile.prod
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   ├── Dockerfile.prod
│   └── package.json
│
├── docs/
│
├── docker-compose.yml
├── docker-compose.prod.yml
└── README.md
```

---

# 🐳 Running with Docker (Development)

Clone the repository

```bash
git clone <repository-url>
```

Go into the project

```bash
cd clipvault
```

Start the application

```bash
docker compose up --build
```

Application URLs

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:8000
```

Swagger API

```
http://localhost:8000/docs
```

---

# 🏭 Production Build

Frontend production image

```bash
docker build \
-f Dockerfile.prod \
-t clipvault-frontend-prod .
```

Backend production image

```bash
docker build \
-f Dockerfile.prod \
-t clipvault-backend-prod .
```

---

# 📚 What I Learned

During this project I learned:

- Designing REST APIs with FastAPI
- JWT Authentication
- Database migrations using Alembic
- React state management
- Docker fundamentals
- Multi-stage Docker builds
- Docker volumes & bind mounts
- Docker networking
- Development vs Production containers
- Image optimization
- Containerized application deployment

---

# 🚀 Roadmap

- [x] Authentication
- [x] Clipboard CRUD
- [x] Public Clipboard Sharing
- [x] Clipboard Import
- [x] Docker Support
- [x] Production Docker Images
- [ ] GitHub Actions CI/CD
- [ ] Docker Hub Integration
- [ ] AWS EC2 Deployment
- [ ] HTTPS with Nginx
- [ ] Kubernetes Deployment
- [ ] Monitoring (Prometheus + Grafana)

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Shivakumar Shidkapla

Master's Student – Cybersecurity (HDBW)

IT Administrator | DevOps & Cloud Enthusiast

Munich, Germany s
