const loadBalancerPath = 'http://localhost:8888/'
let clientId = null
let client = null

function getServerPath(url) {
  return fetch(url).then(function(response) {
    return response.text()
  }).catch(function(error) {
    return getServer(url)
  })
}

function getServerPathSynchronous(url) {
  let request = null
  do {
    request = new XMLHttpRequest()
    request.open('GET', url, false)
    request.send()
  } while(request.status != 200)
  return request.responseText
}

function init(url, clientId) {
  const options = clientId ? { clientId, clean: false } : {}

  console.log(`connecting to ${url}`)
  client = mqtt.connect(url, {
    ...options,
    transformWsUrl: function() {
      return getServerPathSynchronous(loadBalancerPath)
    },
  })

  client.on('connect', function() {
    subscribe('+')
    publish('test', {message: 'Hello World!'})
  })

  client.on('message', function(topic, message, packet) {
    const data = msgpack.decode(message)
    console.log(`topic: ${topic}`.concat(packet.retain ? ' (retained)' : ''))
    console.log(data)
  })
}

function subscribe(topic) {
  client.subscribe(topic)
}

function publish(topic, data) {
  client.publish(topic, msgpack.encode(data), {qos: 2, retain: true})
}

getServerPath(loadBalancerPath).then(function(url) {
  init(url, clientId)
})
