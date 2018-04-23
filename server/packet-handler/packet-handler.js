class PacketHandler {
  use(handle) {
    this.handle = (previousHandle => (client, packet, next) =>
      previousHandle(client, packet, newPacket => {
        handle(client, newPacket, next)
    }))(this.handle)
  }
  handle(client, packet, next) {
    next(packet)
  }
}

module.exports = PacketHandler
