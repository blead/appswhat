module.exports = {
  servers: [
    {
      url: 'ws://localhost:8080',
    },
    {
      url: 'ws://localhost:8081',
    },
  ],
  loggers: [
    {
      url: 'http://localhost:8888',
    }
  ],
  port: process.env.PORT || 8008,
}
