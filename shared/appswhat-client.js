const EventEmitter = require('events')
const mqtt = require('mqtt')
const request = require('then-request')
const syncRequest = require('sync-request')
const { encode, decode } = require('msgpack-lite')

class AppsWhatClient extends EventEmitter {
  constructor(path, clientId) {
    super()

    const options = clientId ? { clientId, clean: false } : {}

    this._getServerUrl(path).then(url => {
      this.client = mqtt.connect(url, Object.assign(options, {
        transformWsUrl: () => this._getServerUrlSynchronous(path),
      }))

      this.client.on('message', (topic, message, packet) => {
        this.emit('message', Object.assign(packet, {
          payload: packet.payload ? decode(packet.payload) : packet.payload
        }))
      })

      ;['packetsend', 'packetreceive'].forEach(event => this.client.on(event, packet => {
        this.emit(event, Object.assign(packet, {
          payload: packet.payload ? decode(packet.payload) : packet.payload
        }))
      }))

      ;['connect', 'reconnect', 'close', 'offline', 'error', 'end'].forEach(event => {
        this.client.on(event, (...args) => this.emit(event, ...args))
      })
    })
  }

  publish(topic, data) {
    this.client.publish(topic, encode(data), { qos: 2, retain: true })
  }

  subscribe(topic) {
    this.client.subscribe(topic)
  }

  _getServerUrl(path) {
    return request('GET', path, { retry: true }).getBody('utf8')
  }

  _getServerUrlSynchronous(path) {
    return syncRequest('GET', path, { retry: true }).getBody('utf8')
  }
}

module.exports = AppsWhatClient
