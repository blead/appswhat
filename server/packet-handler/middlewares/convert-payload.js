module.exports = function(client, packet, next) {
  next({
    ...packet,
    payload: (typeof packet.payload === 'object') ? packet.payload : {message: packet.payload},
  })
}
