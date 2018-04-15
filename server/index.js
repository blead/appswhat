const aedes = require('aedes')({
  mq: require('mqemitter-redis')(),
  persistence: require('aedes-persistence-redis')(),
  authorizePublish: authorizePublish,
})

const packetHandler = require('./packet-handler')
const config = require('./config')

const server = require('websocket-stream').createServer({port: config.websocketPort}, aedes.handle)

server.on('listening', function() {
  console.log(`listening on port ${config.websocketPort}`)
})

function authorizePublish(client, packet, callback) {
  try {
    packetHandler.handle(packet, function(newPacket) {
      Object.keys(newPacket).forEach(function(key) {
        packet[key] = newPacket[key]
      })
      callback(null)
    })
  } catch(error) {
    callback(error)
  }
}
