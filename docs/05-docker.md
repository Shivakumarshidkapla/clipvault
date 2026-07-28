# Docker

Dockerfile Notes
Dockerfile
A Dockerfile is a blueprint used to build a Docker Image.
It contains a sequence of instructions executed from top to bottom.
Each instruction creates a new Docker Layer.
Docker caches each layer to speed up future builds.

FROM
FROM python:3.14-slim
Specifies the base image.
First instruction in every Dockerfile.
Downloads the image from Docker Hub if not available locally.
python:3.14-slim includes:
Linux userspace
Python 3.14
pip
Does not include the Linux kernel (shares host kernel).

WORKDIR
WORKDIR /app
Sets the working directory inside the container.
Creates the directory if it doesn't exist.
Equivalent to:
mkdir -p /app
cd /app
All subsequent instructions execute inside this directory.

COPY
COPY requirements.txt .
Copies a file from the host machine to the container.
Syntax:
COPY <source> <destination>
Used to copy dependency files before application code.
Helps Docker reuse cached dependency layers.

COPY . .
Copies the entire project into the working directory.
Executed after dependencies are installed.
Only rebuilds this layer when application code changes.

RUN
RUN pip install --no-cache-dir -r requirements.txt
Executes commands during image build.
Installs application dependencies.
--no-cache-dir prevents pip cache from being stored.
Produces a smaller Docker image.

EXPOSE
EXPOSE 8000
Documents which port the application listens on.
Does not publish the port.
Port mapping happens using:

docker run -p 8000:8000
CMD

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
Specifies the default command executed when the container starts.
Runs only during container runtime.
Can be overridden using docker run.
Docker Layer Caching

Docker creates one layer per instruction.

Example:

FROM
↓

WORKDIR
↓

COPY requirements.txt
↓

RUN pip install
↓

COPY source code
↓

CMD

Benefits:

Faster builds
Reuses unchanged layers
Avoids reinstalling dependencies unnecessarily
Why copy requirements.txt first?

Good practice:

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

Reason:

Source code changes do not reinstall dependencies.
Only changes in requirements.txt invalidate the dependency layer.
Build vs Runtime

During Image Build
FROM
WORKDIR
COPY
RUN
During Container Runtime
CMD

Docker Compose Notes
Docker Compose
Used to run multiple containers together.
Defines the complete application stack in one YAML file.
Starts all services with one command:
docker compose up
services
services:
Defines all containers in the application.
Each service becomes one Docker container.

Example:

services:
  frontend:
  backend:
  postgres:
image
image: postgres:17
Uses an existing Docker image.
Downloads it from Docker Hub.
No Dockerfile required.
build
build:
  context: ./backend
Builds a Docker image from a Dockerfile.
context specifies the build directory.
Equivalent to:
docker build ./backend
container_name
container_name: clipvault-backend
Assigns a custom container name.
Easier to identify using:
docker ps
ports
ports:
  - "8000:8000"

Maps:

Host Port
↓

Container Port

Format:

HOST_PORT:CONTAINER_PORT
environment
environment:
  DATABASE_URL: ...
Passes environment variables into the container.
Overrides values from .env.
Keeps configuration separate from application code.
depends_on
depends_on:
  - postgres
Starts PostgreSQL before Backend.
Controls startup order only.
Does not wait until PostgreSQL is ready.
Docker Networking

Docker Compose automatically creates a private network.

Services communicate using service names.

Example:

Backend
↓

postgres

instead of

localhost

Database URL:

postgresql://clipvault:password@postgres:5432/clipvault
volumes
volumes:
  postgres-data:
Creates a named Docker Volume.
Stores persistent data outside the container.
Data survives container deletion.
Volume Mount
volumes:
  - postgres-data:/var/lib/postgresql/data

Maps:

Docker Volume
↓

PostgreSQL Data Directory

Purpose:

Persist database files.
Prevent data loss after container recreation.
Current ClipVault Architecture
Browser
    │
    ▼
Frontend Container
    │
    ▼
Backend Container
    │
    ▼
PostgreSQL Container
    │
    ▼
Docker Volume