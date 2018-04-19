const { MongoClient } = require('mongodb')

const config = require('./config')

class Database {
  constructor() {
    MongoClient.connect(config.db.url, (err, client) => {
      if(error) {
        throw error
      }
      this.client = client
    })
  }
}
