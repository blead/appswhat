const app = require('express')()
const cors = require('cors')

const AppsWhatClient = require('./appswhat-client')
const config = require('./config')

const client = new AppsWhatClient(config.mqtt.path, config.mqtt.clientId)

client.on('connect', function() {
  client.subscribe('+')
  client.publish('test', {message: 'Hello World!'})
})

client.on('message', function(packet) {
  console.log(`topic: ${packet.topic}`.concat(packet.retain ? ' (retained)' : ''))
  console.log(packet.payload)
})
