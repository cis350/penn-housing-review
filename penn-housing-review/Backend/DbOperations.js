const { MongoClient, ObjectId } = require('mongodb');
const dburl = 'mongodb+srv://PHR:fjz8AQYGYZtfWLKq@cluster0.0pdxrtn.mongodb.net/PHR?retryWrites=true&w=majority'
let MongoConnection;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const createUniqueIndexForUsername = async () => {
  try {
    const db = await getDB();
    await db.collection('users').createIndex({ username: 1 }, { unique: true });
    console.log('Unique index for username created');
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

// connection to the db
const connect = async () => {
  // always use try/catch to handle any exception
  try {
    MongoConnection = (await MongoClient.connect(
      dburl,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )); // we return the entire connection, not just the DB
    // check that we are connected to the db
    console.log(`connected to db: ${MongoConnection.db().databaseName}`);
    await createUniqueIndexForUsername();
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
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const updateLikes = async (id, likes) => {
  try {
    // get the db
    const db = await getDB();
    console.log(id); 
    const result = await db.collection('reviews').updateOne(
      { _id: new ObjectId(id) },
      { $set: { likes: likes } },
    );
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

const createUser = async (username, email, password, followedPosts) => {
  try {
    console.log("creating user DB");
    const db = await getDB();
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = {
      username: username,
      email: email,
      password: hashedPassword,
      followedPosts: followedPosts || [],
    };
    const result = await db.collection('users').insertOne(newUser);
    console.log(`User created: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw err;
  }
};

const getUserPassword = async (username) => {
  try {
    const db = await getDB();
    const user = await db.collection('users').findOne({ username: username });
    if (!user) {
      throw new Error('User not found');
    }
    console.log(`User password: ${user.password}`);
    return user.password;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw err;
  }
};

const searchHouses = async (query) => {
  try {
    const db = await getDB();
    const regexQuery = new RegExp(query, 'i');
    const results = await db.collection('houses').find({ name: { $regex: regexQuery } }).toArray();
    console.log(`Houses matching the query: ${JSON.stringify(results)}`);
    return results;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw err;
  }
};


module.exports = {
  closeMongoDBConnection,
  getDB,
  connect,
  getApartment,
  getReviews,
  updateLikes, 
  createUser,
  getUserPassword, 
  searchHouses
};