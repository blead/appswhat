module.exports = {
  servers: [
    {
      url: 'ws://server-a:8080',
    },
    {
      url: 'ws://server-b:8081',
    },
  ],
  loggers: [
    {
      url: 'http://logger:8888',
    }
  ],
  port: process.env.PORT || 8008,
}
