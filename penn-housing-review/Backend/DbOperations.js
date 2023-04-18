/**
 * This file contains all the CRUD operation descibed
 * in the API documentation with mongoDB
 */

// import the mongodb driver
// this app will be exeuceted on nodejs
// we are usign commonJS modules export/require
const { MongoClient, ObjectId } = require('mongodb');
const dburl = 'mongodb+srv://PHR:fjz8AQYGYZtfWLKq@cluster0.0pdxrtn.mongodb.net/PHR?retryWrites=true&w=majority'
let MongoConnection;
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
        return MongoConnection;
    } catch (err) {
        console.log(err.message);
    }
};

const getDB = async () => {
// test if the connection is alive
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
};

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
};

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
};

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
// updatePostLike(10, '643dea4e9c2ad1df2f187939')
// getFilteredPostByCategory('Discussion');

module.exports = {
    connect,
    closeMongoDBConnection,
    getDB,
    getAllPosts,
    getFilteredPostByHousingType,
    getFilteredPostByCategory,
    getFilteredPost,
    addNewPost,
    updatePostLike
};