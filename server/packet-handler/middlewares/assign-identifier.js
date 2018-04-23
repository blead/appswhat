const nanoid = require('nanoid')

module.exports = function(client, packet, next) {
  next({
    ...packet,
    payload: {
      ...packet.payload,
      id: nanoid(),
    },
  })
}
