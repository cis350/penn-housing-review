const { MongoClient, ObjectId } = require('mongodb');
const dbURL = 'mongodb+srv://CIS3500:7xAFew9opAfEWxHS@cluster0.xxgvtwj.mongodb.net/PHR?retryWrites=true&w=majority';
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
      dbURL,
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

const createUser = async (username, email, password, followedPosts) => {
  try {
    const db = await getDB();
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = {
      username: username,
      email: email,
      password: hashedPassword,
      followedPosts: followedPosts || [],
    };
    const result = await db.collection('users').insertOne(newUser);
    console.log(`User created: ${JSON.stringify(result.ops[0])}`);
    return result.ops[0];
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


module.exports = {
  closeMongoDBConnection,
  getDB,
  connect,
  getApartment,
  getReviews,
  updateLikes, 
  createUser,
  getUserPassword
};