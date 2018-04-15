const { decode } = require('msgpack-lite')

module.exports = function(packet, next) {
  next({
    ...packet,
    payload: decode(packet.payload),
  })
}
