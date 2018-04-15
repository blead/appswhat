const { encode } = require('msgpack-lite')

module.exports = function(packet, next) {
  next({
    ...packet,
    payload: encode(packet.payload),
  })
}
