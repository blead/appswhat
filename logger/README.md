# AppsWhat Logger

Logger subscribes to all topics and maintains a database of all published messages.

## Setup

Required: [Node.js](https://nodejs.org)

1. Install dependencies.

  ```sh
  npm install
  ```

2. (Optional) Create `config/config.js`. Refer to `config/config.default.js` for available properties.

## Usage

```sh
npm start
```

# AppsWhat Logger Database

Logger uses MongoDB to store messages.

## Database Setup

Either install it in your machine, or use Docker.

### Local install

See https://www.mongodb.com/download-center#community, (Community Server tab).

### Docker

Required: [Docker](https://docs.docker.com/install/)

#### Setup

1. Pull the image from [Docker Hub](https://hub.docker.com/_/mongo/).

  ```sh
  docker pull mongo
  ```

2. Start the container.

  ```sh
  docker run --name appswhat-mongo -p 27017:27017 -d mongo
  ```
  - `appswhat-mongo` is the container name.
  - `27017:27017` specifies that the container's port 27017 is published to the host (format: `hostPort:containerPort`).
  - `mongo` is the name of the image pulled earlier.

#### Teardown

1. Stop the container.

  ```sh
  docker stop appswhat-mongo
  ```
  - `appswhat-mongo` is the container name.

2. Remove the container.

  ```sh
  docker container rm appswhat-mongo
  ```
  - `appswhat-mongo` is the container name.

3. Remove unused volume.

  ```sh
  docker volume prune
  ```

Refer to [`simple-docker-guide`](https://github.com/blead/simple-docker-guide) (or any other guide) for more information.
