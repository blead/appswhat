# AppsWhat Persistence

## Setup
Either install it in your machine, or use Docker.

### Local install
See https://redis.io/download.

### Docker
Required: [Docker](https://docs.docker.com/install/)

#### Setup
1. Pull the image from [Docker Hub](https://hub.docker.com/_/redis/).

  ```sh
  docker pull redis
  ```

2. Start the container.

  ```sh
  docker run --name appswhat-redis -p 6379:6379 -d redis
  ```
  - `appswhat-redis` is the container name.
  - `6379:6379` specifies that the container's port 6379 is published to the host (format: `hostPort:containerPort`).
  - `redis` is the image name which was pulled earlier.

#### Teardown
1. Stop the container.

  ```sh
  docker stop appswhat-redis
  ```
  - `appswhat-redis` is the container name.

2. Remove the container.

  ```sh
  docker container rm appswhat-redis
  ```
  - `appswhat-redis` is the container name.

3. Remove unused volume.

  ```sh
  docker volume prune
  ```

Refer to [`simple-docker-guide`](https://github.com/blead/simple-docker-guide) (or any other guide) for more information.
