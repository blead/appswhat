const url = 'ws://localhost:8080'

console.log(`connecting to ${url}`)

const client = mqtt.connect(url)

client.on('connect', function() {
  client.subscribe('+')
  client.publish('test', msgpack.encode({message: 'Hello World!'}))
})

client.on('message', function(topic, message) {
  const data = msgpack.decode(message)
  console.log(`topic: ${topic}`)
  console.log(data)
})
