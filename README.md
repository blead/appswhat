# AppsWhat

## [Client](client)
- Web-based chat client. (default dev server port: 9000)

## [Load Balancer](load-balancer)
- Monitors the status of each server and responds to client requests with the least populated server. (default port: 8008)

## [Logger](logger)
- Subscribes to all topics and maintains a capped collection of published messages. (default port: 8888)

## [Server](server)
- MQTT broker. (default port: 8080)

## [Shared](shared)
- Shared dependencies used by above implementations.

## Deploying with Docker Compose

Required: [Docker Compose](https://docs.docker.com/compose/install/)

Each service is deployed according to the following table.

| Service       | Tag             | Host-to-container Access    | Container-to-container Access |
| ------------- | --------------- | --------------------------- | ----------------------------- |
| Client        | `client`        | `http://localhost:9000`     | None                          |
| Load Balancer | `load-balancer` | `http://localhost:8008`     | None                          |
| Logger        | `logger`        | `http://localhost:8888`     | None                          |
| Server A      | `server-a`      | `ws://localhost:8080`       | None                          |
| Server B      | `server-b`      | `ws://localhost:8081`       | None                          |
| Redis         | `redis`         | None                        | `redis://redis:6379`          |
| Mongo         | `mongo`         | `mongodb://localhost:27017` | None                          |

### Setup

```sh
docker-compose up
```

### Teardown

Clean up containers, volumes, networks, and images created by `up`.

```sh
docker-compose down
```

### Rebuilding

Each `node_modules` directory is stored in a separate data volume created during the build process.
As a result, each image has to be rebuilt after making changes to `package.json` (which would also modify the `node_modules` directory).

```sh
docker-compose build --no-cache service-tag
```
