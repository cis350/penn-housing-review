/* eslint-disable no-console */
const { MongoClient, ObjectId } = require('mongodb');

const dburl = 'mongodb+srv://PHR:fjz8AQYGYZtfWLKq@cluster0.0pdxrtn.mongodb.net/PHR?retryWrites=true&w=majority';
let MongoConnection;
const bcrypt = require('bcrypt');

const saltRounds = 10;

// connection to the db

const connect = async () => {
  // always use try/catch to handle any exception
  try {
    MongoConnection = await MongoClient.connect(dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }); // we return the entire connection, not just the DB
    // check that we are connected to the db
    console.log(`connected to db: ${MongoConnection.db().databaseName}`);
    // eslint-disable-next-line no-use-before-define
    await createUniqueIndexForUsername();
    return MongoConnection;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

const getDB = async () => {
  // test if there is an active connection
  if (!MongoConnection) {
    await connect();
  }
  return MongoConnection.db();
};

const createUniqueIndexForUsername = async () => {
  try {
    const db = await getDB();
    await db.collection('users').createIndex({ username: 1 }, { unique: true });
    console.log('Unique index for username created');
    return null;
  } catch (err) {
    console.log(`error: ${err.message}`);
    return null;
  }
};

const closeMongoDBConnection = async () => {
  await MongoConnection.close();
};

/**
 * retrieves all the FB posts from the database
 */
const getAllPosts = async () => {
  try {
    // get the db
    const db = await getDB();
    const fbPosts = await db.collection('posts').find({}).toArray();
    // console.log(`FB posts: ${JSON.stringify(fbPosts)}`);
    return fbPosts;
  } catch (err) {
    console.log('Error retrieving FB posts', err.message);
    return null;
  }
};

/**
 * filter FB posts by housingType
 */
const getFilteredPostByHousingType = async (housingType) => {
  try {
    // get the db
    const db = await getDB();
    const postByHousing = await db
      .collection('posts')
      .find({ housingType })
      .toArray();
    // console.log(`FB posts filtered by housing type: ${JSON.stringify(postByHousing)}`);
    return postByHousing;
  } catch (err) {
    console.log('Error retrieving FB posts by housing type', err.message);
    return null;
  }
};

/**
 * filter FB posts by category
 */
const getFilteredPostByCategory = async (category) => {
  try {
    // get the db
    const db = await getDB();
    const postByCategory = await db
      .collection('posts')
      .find({ category })
      .toArray();
    // console.log(`FB posts filtered by category: ${JSON.stringify(postByCategory)}`);
    return postByCategory;
  } catch (err) {
    console.log('Error retrieving FB posts by category', err.message);
    return null;
  }
};

/**
 * filter FB posts by housing type and category
 */
const getFilteredPost = async (housingType, category) => {
  try {
    // get the db
    const db = await getDB();
    const filteredPosts = await db
      .collection('posts')
      .find({ housingType, category })
      .toArray();
    console.log(
      `FB posts filtered by housing type and category: ${JSON.stringify(
        filteredPosts,
      )}`,
    );
    return filteredPosts;
  } catch (err) {
    console.log(
      'Error retrieving FB posts by housing type and category',
      err.message,
    );
    return null;
  }
};

/**
 * update the likes of a post
 */
const updatePostLike = async (updateLikes, pid) => {
  try {
    // get the db
    const db = await getDB();
    const response = await db
      .collection('posts')
      .updateOne({ _id: new ObjectId(pid) }, { $set: { likes: updateLikes } });
    // console.log(`Update likes: ${JSON.stringify(response)}`);
    return response;
  } catch (err) {
    console.log('Error updating likes', err.message);
    return null;
  }
};

/**
 * add a new post on forum board
 */
const addNewPost = async (post) => {
  try {
    // get the db
    const db = await getDB();
    const response = await db.collection('posts').insertOne(post);
    console.log('postcscsac', post);
    console.log(`Add new post: ${JSON.stringify(response)}`);
    return response;
  } catch (err) {
    console.log('Error adding new post', err.message);
    return null;
  }
};

/**
 * get comments of a post
 */
const getAllCommentsByPostId = async (pid) => {
  try {
    // get the db
    const db = await getDB();
    const comments = await db
      .collection('comments')
      .find({ pid })
      .toArray();
    // console.log(`Comments: ${JSON.stringify(comments)}`);
    return comments;
  } catch (err) {
    console.log('Error retrieving comments', err.message);
    return null;
  }
};

/**
 * add new comment
 */
const addNewComment = async (comment) => {
  console.log('add new comment');
  try {
    // get the db
    const db = await getDB();
    const response = await db.collection('comments').insertOne(comment);
    console.log(`Add new comment: ${JSON.stringify(response)}`);
    return response;
  } catch (err) {
    console.log('Error adding new comment', err.message);
    return null;
  }
};

/**
 * update the likes of a comment
 */
const updateCommentLike = async (updateLikes, cid) => {
  try {
    // get the db
    const db = await getDB();
    const response = await db
      .collection('comments')
      .updateOne({ _id: new ObjectId(cid) }, { $set: { likes: updateLikes } });
    console.log(`Update likes: ${JSON.stringify(response)}`);
    return response;
  } catch (err) {
    console.log('Error updating likes', err.message);
    return null;
  }
};

const getApartment = async (id) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db
      .collection('apartments')
      .find({ _id: new ObjectId(id) })
      .toArray();
    // print the result
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
    return null;
  }
};

const getReviews = async (id) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db
      .collection('reviews')
      .find({ apt_id: new ObjectId(id) })
      .toArray();
    // print the result
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
    return null;
  }
};

const updateLikes = async (id, likes) => {
  try {
    const db = await getDB();
    console.log(id);
    const result = await db
      .collection('reviews')
      .updateOne({ _id: new ObjectId(id) }, { $set: { likes } });
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
    return null;
  }
};

const createUser = async (username, email, password, followedPosts) => {
  try {
    console.log('creating user DB');
    const db = await getDB();
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = {
      username,
      email,
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
    const user = await db.collection('users').findOne({ username });
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

const getUserData = async (username) => {
  try {
    const db = await getDB();
    const user = await db.collection('users').findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw err;
  }
};

const updateFollowedPosts = async (username, followedPosts) => {
  try {
    const db = await getDB();
    const result = await db.collection('users').updateOne({ username }, { $set: { followedPosts } });

    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw err;
  }
};

const searchHouses = async (query) => {
  try {
    const db = await getDB();
    const regexQuery = new RegExp(query, 'i');
    const results = await db
      .collection('houses')
      .find({ name: { $regex: regexQuery } })
      .toArray();
    console.log(`Houses matching the query: ${JSON.stringify(results)}`);
    return results;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw err;
  }
};

const addReview = async (review) => {
  console.log('Add review');
  try {
    const db = await getDB();
    console.log(review);
    const response = await db.collection('reviews').insertOne(review);
    return response;
  } catch (err) {
    console.log('Error adding new review', err.message);
    return null;
  }
};

const getPost = async (id) => {
  try {
    const db = await getDB();
    const results = await db.collection('posts').findOne({ _id: new ObjectId(id) });
    return results;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw err;
  }
};

const updatePassword = async (username, newPassword) => {
  try {
    const db = await getDB();
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    console.log('username:', username);

    const results = await db.collection('users').updateOne({ username }, { $set: { password: hashedPassword } });
    return results;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw err;
  }
};

const addHouse = async (house) => {
  try {
    const db = await getDB();
    const houseToAdd = {
      name: house.name,
      description: house.description,
      image: 'https://via.placeholder.com/200',
      ratings: {
        security: 5,
        amenities: 5,
        overall: 5,
      },
      filters: {
        roomTypes: {
          studio: house.studio,
          '1b': house.single,
          '2b': house.double,
          '3b': house.triple,
          '4b': house.quad,
        },
        freshman: house.freshman,
        onCampus: house.onCampus,
        price: parseInt(house.price, 10),
      },
    };

    const result = await db.collection('houses').insertOne(houseToAdd);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw err;
  }
};

const getFilteredHouses = async (
  studio,
  single,
  double,
  triple,
  quad,
  price = 5000,
  freshman = false,
  onCampus = false,
) => {
  try {
    const db = await getDB();

    // Create a base query object with the boolean filters
    const query = {
      'filters.freshman': freshman,
      'filters.onCampus': onCampus,
      'filters.price': { $lte: Number(price) },
    };

    // Create an array of possible room type filter objects
    const roomTypes = [
      studio && { 'filters.roomTypes.studio': true },
      single && { 'filters.roomTypes.1b': true },
      double && { 'filters.roomTypes.2b': true },
      triple && { 'filters.roomTypes.3b': true },
      quad && { 'filters.roomTypes.4b': true },
    ].filter(Boolean);

    // If there is at least one room type filter, add it to the query using the $or operator
    if (roomTypes.length > 0) {
      query.$or = roomTypes;
    }

    const results = await db.collection('houses').find(query).toArray();
    console.log(`Filtered houses: ${JSON.stringify(results)}`);
    return results;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw err;
  }
};

module.exports = {
  connect,
  closeMongoDBConnection,
  getDB,
  getAllPosts,
  getFilteredPostByHousingType,
  getFilteredPostByCategory,
  getFilteredPost,
  addNewPost,
  getAllCommentsByPostId,
  addNewComment,
  updateCommentLike,
  updatePostLike,
  getApartment,
  getReviews,
  updateLikes,
  createUser,
  getUserPassword,
  searchHouses,
  getUserData,
  updateFollowedPosts,
  getPost,
  updatePassword,
  addHouse,
  getFilteredHouses,
  addReview,
};
