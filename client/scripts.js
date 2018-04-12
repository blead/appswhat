const url = 'ws://localhost:8080'

console.log(`connecting to ${url}`)

const client = mqtt.connect(url)

client.on('connect', function() {
  client.subscribe('test')
  client.publish('test', 'Hello World!')
})

client.on('message', function(topic, message) {
  console.log(`[${topic}] ${message.toString()}`)
})
