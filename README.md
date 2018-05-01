# AppsWhat

## [Client](client)
- Web-based chat client.

## [Load Balancer](load-balancer)
- Monitors the status of each server and responds to client requests with the least populated server. (default port: 8008)

## [Logger](logger)
- Subscribes to all topics and maintains a capped collection of published messages. (default port: 8888)

## [Server](server)
- MQTT broker. (default port: 8080)

## [Shared](shared)
- Shared dependencies used by above implementations.
