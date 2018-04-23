module.exports = function(client, packet, next) {
  next({
    ...packet,
    payload: {
      ...packet.payload,
      senderId: client.id,
    },
  })
}
