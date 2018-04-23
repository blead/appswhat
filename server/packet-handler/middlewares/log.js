module.exports = function(client, packet, next) {
  if(client) {
    console.log(`[${new Date().toLocaleTimeString()}] PACKET ${JSON.stringify(packet, null, 2)}\nFROM ${client.id}`)
  }
  next(packet)
}
