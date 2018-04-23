const { encode } = require('msgpack-lite')

module.exports = function(client, packet, next) {
  next({
    ...packet,
    payload: encode(packet.payload),
  })
}
