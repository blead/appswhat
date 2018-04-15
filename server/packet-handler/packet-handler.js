class PacketHandler {
  use(handle) {
    this.handle = (previousHandle => (packet, next) =>
      previousHandle(packet, newPacket => {
        handle(newPacket, next)
    }))(this.handle)
  }
  handle(packet, next) {
    next(packet)
  }
}

module.exports = PacketHandler
