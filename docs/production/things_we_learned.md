Things We Learned
Docker Build vs Runtime

Vite

reads .env

during

npm run build

NOT

during

docker run

Huge difference.

Docker Ignore

Git

and

Docker

have completely different ignore systems.

.gitignore

does NOT affect Docker.

.dockerignore

does.

localhost

This was probably the biggest networking lesson.

localhost always means:

the machine making the request.

Examples:

Browser
localhost

↓

Your laptop

curl on EC2
localhost

↓

EC2

Container
localhost

↓

That container

Docker Networking

Compose automatically creates

clipvault_default

Every service gets DNS.

Backend connects using

postgres

instead of

172.xx.xx.xx
Connection String
postgresql+psycopg://clipvault:password@postgres:5432/clipvault

means

Driver:
postgresql+psycopg

User:
clipvault

Password:
password

Host:
postgres

Port:
5432

Database:
clipvault
Production Improvements Required

Your deployment works, but it is still an MVP deployment.

1. Remove Public Backend

Current

Internet

↓

80

↓

Frontend

↓

8000

↓

Backend

Backend is exposed.

Instead

Internet

↓

80 / 443

↓

Nginx Reverse Proxy

↓

Backend

No public port 8000.

2. HTTPS

Current

http://

Need

https://

using

Domain
Let's Encrypt
Certbot
3. Reverse Proxy

Instead of

http://3.92.21.16:8000

Frontend should call

/api

Nginx forwards

/api

↓

FastAPI

Result

No CORS
Cleaner URLs
Backend hidden
4. Environment Variables

Instead of committing frontend .env

Use

GitHub Secrets

during build.

Backend secrets

should never live inside

docker-compose.yml

Eventually

AWS Secrets Manager

or

Kubernetes Secrets
5. Database Backups

Current

Volume only.

Need

Automated backup
Restore procedure
6. Health Checks

Docker

healthcheck:

Backend

/health

Already started with

/health/db
7. Logging

Need

Loki
Promtail
Grafana
8. Monitoring

Need

Prometheus
Grafana

Metrics

CPU
RAM
API latency
Request count
9. Security

Current

SECRET_KEY

inside compose.

Should become

Secrets.

Kubernetes Changes

When we move to Kubernetes

Docker Compose disappears.

Instead of

docker-compose.yml

we'll have resources such as:

Deployment
Service
Ingress
ConfigMap
Secret
PersistentVolume
PersistentVolumeClaim

Mapping looks like this:

Docker Compose	Kubernetes
services	Deployment
ports	Service
environment	ConfigMap / Secret
volumes	PersistentVolumeClaim
depends_on	Readiness & Liveness Probes
restart	Deployment controller
CI/CD Changes

Current

GitHub

↓

GitHub Actions

↓

Docker Hub

↓

SSH

↓

docker compose pull

↓

docker compose up

Future

GitHub

↓

GitHub Actions

↓

Docker Hub

↓

Update Kubernetes Manifest

↓

Argo CD

↓

Kubernetes

No SSH.

No manual deployment.

Git becomes the source of truth.