module.exports = {
  servers: [
    {
      url: 'ws://localhost:8080',
      internalPath: 'ws://server-a:8080',
    },
    {
      url: 'ws://localhost:8081',
      internalPath: 'ws://server-b:8081',
    },
  ],
  loggers: [
    {
      url: 'http://localhost:8888',
    }
  ],
  port: process.env.PORT || 8008,
}
