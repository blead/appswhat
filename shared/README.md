# AppsWhat Shared

Shared dependencies used in AppsWhat.

## Setup

Required: [Node.js](https://nodejs.org)

1. Install dependencies.

  ```sh
  npm install
  ```

## Usage

### `AppsWhatClient`

#### Example

```js
const { AppsWhatClient } = require('../shared')

const client = new AppsWhatClient('ws:test.mosquitto.org:8080', 'client-id')

client.on('connect', function() {
  client.subscribe('presence')
  client.publish('presence', {message: 'Hello World!'})
})

client.on('message', function(packet) {
  console.log(packet.topic)
  // presence
  console.log(packet.retain)
  // false
  console.log(packet.payload)
  // Object { message: 'Hello World!' }
})
```

#### API

- `AppsWhatClient(path, [clientId])`

  Creates an `AppsWhatClient` instance, requesting a server path from load balancer and connecting as `clientId`.

  - `path : String` to load balancer.
  - `clientId : String`, unique value used to persist session.

  Refer to [MQTT.js](https://github.com/mqttjs/MQTT.js/blob/master/README.md#mqttclientstreambuilder-options) for detailed information on emitted events. Note that the `'message'` event passes only the `packet` argument.

  ##### Event `'connect'`

  `function (connack) {}`

  ##### Event `'reconnect'`

  `function () {}`

  ##### Event `'close'`

  `function () {}`

  ##### Event `'offline'`

  `function () {}`

  ##### Event `'error'`

  `function (error) {}`

  ##### Event `'end'`

  `function () {}`

  ##### Event `'message'`

  `function (packet) {}`

  ##### Event `'packetsend'`

  `function (packet) {}`

  ##### Event `'packetreceive'`

  `function (packet) {}`

- `AppsWhatClient#publish(topic, data)`

  Publishes message to a topic. Messages are published with QoS 2 and positive retain flag.

  - `topic : String`, the topic to publish to.
  - `data : Object` of the message to publish.
    - `data.message : String`, the chat message to publish.

- `AppsWhatClient#subscribe(topic)`

  Subscribes to a topic or topics.

  - `topic : `
    - `String`, topic to subscribe to.
    - `Array` of topics to subscribe to.
    - `Object` with topic names as keys and QoS as values, e.g. `{'test1': 0, 'test2': 1}`.

    MQTT topic wildcard characters are supported (`+` for single level and `#` for multi level)
