const EventEmitter = require('events')
const mqtt = require('mqtt')
const syncRequest = require('sync-request')
const { encode, decode } = require('msgpack-lite')

class AppsWhatClient extends EventEmitter {
  constructor(path, clientId) {
    super()

    const options = clientId ? { clientId, clean: false } : {}

    this.client = mqtt.connect({
      ...options,
      transformWsUrl: () => this._getServerPathSynchronous(path),
    })

    this.client.on('message', (topic, message, packet) => {
      this.emit('message', {
        ...packet,
        payload: packet.payload ? decode(packet.payload) : packet.payload
      })
    })

    ;['packetsend', 'packetreceive'].forEach(event => this.client.on(event, packet => {
      this.emit(event, {
        ...packet,
        payload: packet.payload ? decode(packet.payload) : packet.payload
      })
    }))

    ;['connect', 'reconnect', 'close', 'offline', 'error', 'end'].forEach(event => {
      this.client.on(event, (...args) => this.emit(event, ...args))
    })
  }

  publish(topic, data) {
    this.client.publish(topic, encode(data), { qos: 2, retain: true })
  }

  subscribe(topic) {
    this.client.subscribe(topic)
  }

  _getServerPathSynchronous(url) {
    return syncRequest('GET', url).getBody()
  }
}

module.exports = AppsWhatClient
