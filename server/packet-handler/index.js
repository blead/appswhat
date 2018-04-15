const PacketHandler = new require('./packet-handler')
const decode = require('./middlewares/decode')
const assignIdentifier = require('./middlewares/assign-identifier')
const encode = require('./middlewares/encode')

const packetHandler = new PacketHandler()

packetHandler.use(decode)
packetHandler.use(assignIdentifier)
packetHandler.use(encode)

module.exports = packetHandler
