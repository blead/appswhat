module.exports = function(client, packet, next) {
  next({
    ...packet,
    payload: {
      ...packet.payload,
      timestamp: Date.now(),
    },
  })
}
