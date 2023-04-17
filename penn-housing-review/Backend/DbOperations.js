const { MongoClient, ObjectId } = require('mongodb');
const dbURL = 'mongodb+srv://CIS3500:7xAFew9opAfEWxHS@cluster0.xxgvtwj.mongodb.net/PHR?retryWrites=true&w=majority';
let MongoConnection;
// connection to the db
const connect = async () => {
  // always use try/catch to handle any exception
  try {
    MongoConnection = (await MongoClient.connect(
      dbURL,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )); // we return the entire connection, not just the DB
    // check that we are connected to the db
    console.log(`connected to db: ${MongoConnection.db().databaseName}`);
    return MongoConnection;
  } catch (err) {
    console.log(err.message);
  }
};

const getDB = async () => {
    // test if there is an active connection
    if (!MongoConnection) {
      await connect();
    }
    return MongoConnection.db();
  };
  
  /**
   *
   * Close the mongodb connection
   */
const closeMongoDBConnection = async () => {
    await MongoConnection.close();
};

const getApartment = async (id) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('apartments').find({ _id: new ObjectId(id) }).toArray();
    // print the result
    console.log(`Apartment: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const getReviews = async (id) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('reviews').find({ apt_id: new ObjectId(id) }).toArray();
    // print the result
    console.log(`Reviews: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const updateLikes = async (id, likes) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('reviews').updateOne(
      { _id: ObjectId(id) },
      { $set: { likes: likes } },
    );
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

module.exports = {
  closeMongoDBConnection,
  getDB,
  connect,
  getApartment,
  getReviews,
  updateLikes
};