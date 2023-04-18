/**
 * This file contains all the CRUD operation descibed
 * in the API documentation with mongoDB
 */

// import the mongodb driver
// this app will be exeuceted on nodejs
// we are usign commonJS modules export/require

const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

// URL of the mongoDB server
const dburl = 'mongodb+srv://PHR:fjz8AQYGYZtfWLKq@cluster0.0pdxrtn.mongodb.net/PHR?retryWrites=true&w=majority'

// mongodb connection variable
let mongoConnection;

/**
 * connect to mongoDB server
 */

const connect = async () => {
    try {
        mongoConnection = (await MongoClient.connect(
            dburl, 
            { useNewUrlParser: true, useUnifiedTopology: true },
            ));
        // console.log("Connected to MongoDB", mongoConnection.db().databaseName);
        return mongoConnection;
    }
    catch (err) {
        console.log("Error connecting to MongoDB", err.message);
    }
}

/**
 * close the connection to the mongoDB server
 */
const closeDBConnection = async () => {
    await mongoConnection.close();
}

/**
 * connect to the mongoDB and return the db
 */
const getDB = async () => {
    // test if the connection is alive
    if (!mongoConnection) {
        await connect();
    }
    return mongoConnection.db();
}

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
    }
    catch (err) {
        console.log("Error retrieving FB posts", err.message);
    }
}

/** 
 * filter FB posts by housingType
 */
const getFilteredPostByHousingType = async (housingType) => {
    try {
        // get the db
        const db = await getDB();
        const postByHousing = await db.collection('posts').find({housingType: housingType}).toArray();
        // console.log(`FB posts filtered by housing type: ${JSON.stringify(postByHousing)}`);
        return postByHousing;
    }
    catch (err) {
        console.log("Error retrieving FB posts by housing type", err.message);
    }
}

/**
 * filter FB posts by category
 */
const getFilteredPostByCategory = async (category) => {
    try {
        // get the db
        const db = await getDB();
        const postByCategory = await db.collection('posts').find({category: category}).toArray();
        // console.log(`FB posts filtered by category: ${JSON.stringify(postByCategory)}`);
        return postByCategory;
    }
    catch (err) {
        console.log("Error retrieving FB posts by category", err.message);
    }
}

/**
 * filter FB posts by housing type and category
 */
const getFilteredPost = async (housingType, category) => {
    try {
        // get the db
        const db = await getDB();
        const filteredPosts = await db.collection('posts').find({housingType: housingType, category: category}).toArray();
        console.log(`FB posts filtered by housing type and category: ${JSON.stringify(filteredPosts)}`);
        return filteredPosts;
    }
    catch (err) {
        console.log("Error retrieving FB posts by housing type and category", err.message);
    }
}

/**
 * update the likes of a post
 */
const updatePostLike = async (updateLikes, pid) => {
    try {
        // get the db
        const db = await getDB();
        const response = await db.collection('posts').updateOne(
            { _id: new ObjectId(pid) },
            { $set: { likes: updateLikes } }
        );
        // console.log(`Update likes: ${JSON.stringify(response)}`);
        return response;
    }
    catch (err) {
        console.log("Error updating likes", err.message);
    }
}

/**
 * add a new post on forum board
 */
const addNewPost = async (post) => {
    try {
        // get the db
        const db = await getDB();
        const response = await db.collection('posts').insertOne(post);
        console.log(`Add new post: ${JSON.stringify(response)}`);
        return response;
    }
    catch (err) {
        console.log("Error adding new post", err.message);
    }
}

// addNewPost({
//     "username": "test",
//     "title": "test",
//     "category": "Off Campus",
//     "housingType": "Lease Info",
//     "content": "testtttt",
//     "likes": 0,
//     "comments": 0
// });
updatePostLike(10, '643dea4e9c2ad1df2f187939')


getFilteredPostByCategory('Discussion');

module.exports = {
    connect,
    closeDBConnection,
    getDB,
    getAllPosts,
    getFilteredPostByHousingType,
    getFilteredPostByCategory,
    getFilteredPost,
    addNewPost,
    updatePostLike
};