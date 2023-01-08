const MongoClient = require('mongodb').MongoClient;

const config = require('../config');
const uri = 'mongodb+srv://avner123:av6134321@cluster0.akgdmem.mongodb.net/?retryWrites=true&w=majority';

module.exports = {
  getCollection,
};

// Database Name
// const dbName = 'MISTER_TOY';
const dbName = 'tab_db';

var dbConn = null;

async function getCollection(collectionName) {
  try {
    const db = await connect();
    const collection = await db.collection(collectionName);

    return collection;
  } catch (err) {
    logger.error('Failed to get Mongo collection', err);
    throw err;
  }
}

async function connect() {
  if (dbConn) return dbConn;
  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    dbConn = db;
    return db;
  } catch (err) {
    logger.error('Cannot Connect to DB', err);
    throw err;
  }
}
