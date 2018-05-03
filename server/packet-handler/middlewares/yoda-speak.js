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
    .then(client => client.yodaTalkAsync({ yodaTalkRequest: message }))
    .then(result => result[0].return)
    .then(removeExtras(message, extras))
    .catch(error => {
      console.log(error)
      return yodaSpeak(message, url)
    })
}

module.exports = function(client, packet, next) {
  if (packet.payload.yoda) {
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

