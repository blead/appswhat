const app = require('express')()
const cors = require('cors')

const { AppsWhatClient } = require('../shared')
const Database = require('./database')
const config = require('./config')

const client = new AppsWhatClient(config.mqtt.path, config.mqtt.clientId)
const database = new Database(config.database)

client.on('connect', function() {
  client.subscribe('#')
})

client.on('message', function(packet) {
  if(!packet.retain) {
    database.insert(packet.topic, packet)
  }
})

app.use(cors())

app.get('/message', function(req, res) {
  try {
    const { topic, start, end } = req.query
    database.query(topic, start, end).then(function(packets) {
      res.json(packets)
    }).catch(function(error) {
      throw error
    })
  } catch(error) {
    res.sendStatus(400)
  }
})

app.listen(config.port, function() {
  console.log(`listening on port ${config.port}`)
})
