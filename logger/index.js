const app = require('express')()
const cors = require('cors')

const { AppsWhatClient } = require('../shared')
const config = require('./config')

const client = new AppsWhatClient(config.mqtt.path, config.mqtt.clientId)

client.on('connect', function() {
  client.subscribe('#')
})

client.on('message', function(packet) {
  console.log(`topic: ${packet.topic}`.concat(packet.retain ? ' (retained)' : ''))
  console.log(packet.payload)
})

app.use(cors())

app.get('/message', function(req, res) {
  try {
    const { topic, start, end } = req.query
    res.json([
      {
        id: req.query.start,
        message: 'start :D',
      },
      {
        id: req.query.end,
        message: 'end :D',
      },
    ])
  } catch(error) {
    res.sendStatus(400)
  }
})

app.listen(config.port, function() {
  console.log(`listening on port ${config.port}`)
})
