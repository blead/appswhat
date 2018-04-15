const url = 'http://localhost/'
let client = null

function getServer(url, retryTimeout, callback) {
  console.log(`requesting server path from ${url}`)
  const request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if(request.readyState == XMLHttpRequest.DONE) {
      if(request.status == 200) {
        callback(request.responseText)
      } else {
        setTimeout(getServer, retryTimeout, url, retryTimeout, callback)
      }
    }
  }
  request.open('GET', url, true)
  request.send()
}

function subscribe(topic) {
  client.subscribe(topic)
}

function publish(topic, data) {
  client.publish(topic, msgpack.encode(data))
}

getServer(url, 1000, function(url) {
  console.log(`connecting to ${url}`)

  client = mqtt.connect(url)

  client.on('connect', function() {
    subscribe('+')
    publish('test', {message: 'Hello World!'})
  })

  client.on('message', function(topic, message) {
    const data = msgpack.decode(message)
    console.log(`topic: ${topic}`)
    console.log(data)
  })
})
