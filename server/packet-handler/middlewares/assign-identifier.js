const nanoid = require('nanoid')

module.exports = function(packet, next) {
  const payload = (typeof packet.payload === 'object') ? packet.payload : {message: packet.payload}

  next({
    ...packet,
    payload: {
      ...payload,
      id: nanoid(),
    },
  })
}
