const insertTestFBPostDataToDB = async (db, testData) => {
    const result = await db.collection('posts').insertOne(testData);
    return result.insertedId;
}

const deleteTestFBPostDataFromDB = async (db, testData) => {
    try {
        const result = await db.collection('posts').deleteMany({ name: testData });
        const { deletedCount } = result;
        if (deletedCount === 1) {
            console.log("Successfully deleted test FB post");
        } else {
            console.log("Error deleting test FB post");
        }
    } catch (err) {
        console.log("Error deleting test FB post", err.message);
    }
}

const testFBPost = {
    username: "testUser",
    title: "testTitle",
    housingType: "Off Campus",
    category: "Lease Info",
    content: "testContent",
    likes: 0,
    comments: 0
};

const isInArray = (arr, val) =>{
    let value = false;
    arr.map((x) =>{
        if(String(x._id) === String(val)){
            value = true;
        }
    });
    return value;
}

module.exports = {
    insertTestFBPostDataToDB,
    deleteTestFBPostDataFromDB,
    testFBPost,
    isInArray
}