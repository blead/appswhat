const { MongoClient } = require('mongodb')

const config = require('./config')

class Database {
  constructor() {
    MongoClient.connect(config.db.url).then(client => {
      this.db = client.db(config.db.name)
    })
  }

  insert(collectionName, data) {
    this._getCollection(collectionName).then(collection => collection.insertOne(data))
  }

  query(collectionName, start, end) {
    this._getCollection(collectionName).then(collection => Promise.all([
      collection,
      collection.findOne({
        id: start
      }),
      collection.findOne({
        id: end
      }),
    ])).then(([collection, startDocument, endDocument]) => collection.find({
      _id: { $gt: startDocument._id, $lt: endDocument._id }
    })).then(cursor => cursor.toArray())
  }

  _getCollection(collectionName) {
    const collection = this.db.collection(collectionName)
    return collection.isCapped().then(capped => {
      if(capped) {
        return collection
      }
      return this.db.command({ convertToCapped: collectionName }).then(() => collection)
    }).catch(error => this.db.createCollection(collectionName, { capped: true }))
  }
}
