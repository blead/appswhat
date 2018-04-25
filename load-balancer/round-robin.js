let count = 0

module.exports = (items) => () => items[(count++)%items.length]
