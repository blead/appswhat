const { createClientAsync } = require('soap')

const extras = [
  { pattern: / Hmmmmmm\./g, replacement: '' },
  { pattern: / Herh herh herh\./g, replacement: '' },
  { pattern: / Yeesssssss\./g, replacement: '' },
  { pattern: / Yes, hmmm\./g, replacement: '' },
  { pattern: /, hmm\?/g, replacement: '?' },
]

function removeExtras(originalMessage, extras) {
  return message => extras
    .filter(extra => !extra.pattern.test(originalMessage))
    .reduce((message, extra) => message.replace(extra.pattern, extra.replacement), message)
    .replace(/ {2,}/g, ' ')
}

function yodaSpeak(message, url = 'http://www.yodaspeak.co.uk/webservice/yodatalk.php?wsdl') {
  return createClientAsync(url)
    .then(client => {
      console.log('yodaSpeak client created')
    }).then(client => client.yodaTalkAsync({ yodaTalkRequest: message }))
    .then(result => {
      console.log(result[0])
    }).then(result => result[0].return)
    .then(removeExtras(message, extras))
    .catch(error => {
      console.log(error)
      return message
    })
}

module.exports = function(client, packet, next) {
  if (packet.payload.yoda && packet.payload.message) {
    yodaSpeak(packet.payload.message).then(result => {
      next({
        ...packet,
        payload: {
          ...packet.payload,
          message: result,
        }
      })
    })
  } else {
    next(packet)
  }
}

