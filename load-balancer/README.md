# AppsWhat Load Balancer

Load balancer maintains a subscription to each registered server's total client count.
When a client sends a request, the load balancer responds with the path of the least populated server.

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
