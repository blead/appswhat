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

| Service       | Host-to-container Access | Container-to-container Access |
| ------------- | ------------------------ | ----------------------------- |
| Client        | `http://localhost:9000`  | `http://client:9000`          |
| Load Balancer | `http://localhost:8008`  | `http://load-balancer:8008`   |
| Logger        | None                     | `http://logger:8888`          |
| Server A      | `ws://localhost:8080`    | `ws://server-a:8080`          |
| Server B      | `ws://localhost:8081`    | `ws://server-b:8081`          |
| Redis         | None                     | `redis://redis:6379`          |
| Mongo         | None                     | `mongodb://mongo:27017`       |

### Setup

```sh
docker-compose up
```

### Teardown

Clean up containers, volumes, networks, and images created by `up`.

```sh
docker-compose down
```
