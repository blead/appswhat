const app = require('express')()
const mqtt = require('mqtt')
const FibonacciHeap = require('@tyriar/fibonacci-heap')

const config = require('./config')

const servers = config.servers.map(function(server) {
  return {
    url: server.url,
    connection: mqtt.connect(server.url),
    load: null,
    poolItem: null,
  }
})

const serverPool = new FibonacciHeap()

servers.forEach(function(server) {
  server.connection.on('connect', function() {
    server.connection.subscribe('$SYS/+/clients/total')
  })

  server.connection.on('offline', function() {
    server.load = null
    if(server.poolItem !== null) {
      serverPool.delete(server.poolItem)
      server.poolItem = null
    }
  })

  server.connection.on('message', function(topic, message) {
    server.load = Number(message.toString())
    if(server.poolItem === null) {
      server.poolItem = serverPool.insert(server.load, server.url)
    } else if(server.load < server.poolItem.key) {
      serverPool.decreaseKey(server.poolItem, server.load)
    } else if(server.load > server.poolItem.key) {
      serverPool.delete(server.poolItem)
      server.poolItem = serverPool.insert(server.load, server.url)
    }
  })
})

app.get('/', function(req, res) {
  const server = serverPool.findMinimum()
  if(server) {
    res.send(server.value)
  } else {
    res.sendStatus(503)
  }
})

app.listen(config.port, function() {
  console.log(`listening on port ${config.port}`)
})
