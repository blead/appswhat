const { MongoClient } = require('mongodb')

class Database {
  constructor({ url, name, size = 512 * 1024 * 1024, max = 1000000 }) {
    this.collectionOptions = {
      size,
      max,
    }

    MongoClient.connect(url).then(client => {
      this.db = client.db(name)
    })
  }

  insert(collectionName, data) {
    this._getCollection(collectionName).then(collection => collection.insertOne(data))
  }

  query(collectionName, start, end) {
    return this._getCollection(collectionName).then(collection => Promise.all([
      collection,
      start ? collection.findOne({
        'payload.id': start
      }) : {},
      end ? collection.findOne({
        'payload.id': end
      }) : {},
    ])).then(([collection, startDocument, endDocument]) => collection.find(Object.assign({},
      startDocument ? { '$gt': startDocument._id } : {},
      endDocument ? { '$lt': endDocument._id } : {}
    )), {
      projection: { _id: 0 }
    }).then(cursor => cursor.toArray())
  }

  _getCollection(collectionName) {
    const collection = this.db.collection(collectionName)
    return collection.isCapped().then(capped => {
      if(capped) {
        return collection
      }
      return this.db.command({
        convertToCapped: collectionName,
        size: this.collectionOptions.size,
        max: this.collectionOptions.max,
      }).then(() => collection)
    }).catch(error => this.db.createCollection(collectionName, {
      capped: true,
      size: this.collectionOptions.size,
      max: this.collectionOptions.max,
    }))
  }
}

module.exports = Database
