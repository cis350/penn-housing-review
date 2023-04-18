// /**
//  * GET method test module
//  */
// const request = require('supertest');
// const { connect, closeDBConnection } = require('../DbOperations');
// let mongo;
// let db;
// let testFilterHousingType;
// // import testUtils
// const { insertTestDataToDB, testFBPost } = require('./testUtils');


// beforeAll(async () => {
//     mongo = await connect();
//     db = mongo.db();
//     // test 
//     testFilterHousingType = await insertTestDataToDB(db, testFBPost);
//     console.log(`testFilterHousingType: ${JSON.stringify(testFilterHousingType)}`);
// });

// afterAll(async () => {
//     await deleteTestDataFromDB(db, testFilterHousingType);
// });