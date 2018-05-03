module.exports = {
  port: process.env.PORT || 8888,
  mqtt: {
    path: process.env.MQTT_PATH || 'http://localhost:8008',
    clientId: process.env.MQTT_ID || null,
  },
  database: {
    url: process.env.DB_URL || 'mongodb://localhost:27017',
    name: process.env.DB_NAME || 'appswhat',
    size: 512 * 1024 * 1024, // 512 MB
    max: 1000000, // documents
  },
}
