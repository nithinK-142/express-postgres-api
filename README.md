# Express PostgreSQL API Documentation

## Setup PostgreSQL using Docker

### Prerequisites
- Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
- Install the pgAdmin extension within Docker.

### Steps

#### Pull the PostgreSQL Image
```bash
docker pull postgres
```

#### Run the PostgreSQL Container
```bash
docker run --name postgres-db -e POSTGRES_PASSWORD=8080 -p :5432 -d postgres
```
**Note:** Port mapping is dynamic in this setup to avoid errors that occurred when specifying a static port.

#### Connect to pgAdmin
- **Host Name/Address:** `host.docker.internal`
- **Port:** Dynamic (it changes each time the container runs).

#### Connect to the Container
```bash
docker exec -it postgres-db psql -U postgres
```

## Useful Docker Commands

### View All Running Containers
```bash
docker ps
```

### Inspect Container Details
```bash
docker inspect <container_id>
```

### Start/Stop a Container
- Start:
  ```bash
  docker start postgres-db
  ```
- Stop:
  ```bash
  docker stop postgres-db
  ```

