const aedes = require('aedes')({
  mq: require('mqemitter-redis')(),
  persistence: require('aedes-persistence-redis')()
})

const websocketPort = 8080
const server = require('websocket-stream').createServer({port: websocketPort}, aedes.handle)

server.on('listening', function() {
  console.log(`listening on port ${websocketPort}`)
})

aedes.on('publish', function(packet, client) {
  console.log('######### publish #########')
  console.log(`client: ${client ? client.id : 'none'}`)
  console.log(Object.assign(packet, {payload: packet.payload.toString()}))
})

aedes.on('client', function(client) {
  console.log('######### client #########')
  console.log(client.id)
})
