const EventEmitter = require('events')
const mqtt = require('mqtt')
const fetch = require('node-fetch')
const { XMLHttpRequest } = require('xmlhttprequest')
const { encode, decode } = require('msgpack-lite')

class AppsWhatClient extends EventEmitter {
  constructor(path, clientId) {
    super()

    this._getServerPath(path).then(url => {
      const options = clientId ? { clientId, clean: false } : {}

      this.client = mqtt.connect(url, {
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
    })
  }

  subscribe(topic) {
    this.client.subscribe(topic)
  }

  publish(topic, data) {
    this.client.publish(topic, encode(data), { qos: 2, retain: true })
  }

  _getServerPath(url) {
    return fetch(url).then(response => response.text()).catch(error => _getServerPath(url))
  }

  _getServerPathSynchronous(url) {
    let request = null
    do {
      request = new XMLHttpRequest()
      request.open('GET', url, false)
      request.send()
    } while (request.status != 200)
    return request.responseText
  }
}

module.exports = AppsWhatClient
