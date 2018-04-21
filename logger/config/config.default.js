module.exports = {
  port: process.env.PORT || 80,
  mqtt: {
    path: process.env.MQTT_PATH || 'http://localhost:80',
    clientId: process.env.MQTT_ID || null,
  },
  database: {
    url: process.env.DB_URL || 'mongodb://localhost:27017',
    name: process.env.DB_NAME || 'appswhat',
  },
}
