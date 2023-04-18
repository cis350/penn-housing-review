const request = require('supertest');
const { closeMongoDBConnection, connect } = require('../DbOperations');
const webapp = require('../server');

// import test utilities function
// const { isInArray, testStudent, insertTestDataToDB, deleteTestDataFromDB} = require('./testUtils');

let mongo;

// TEST POST ENDPOINT
describe('Post FB posts tests', () => {

  // eslint-disable-next-line no-unused-vars
  let db;
 
  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();
    

  });


  afterAll(async () => {
    try {
      await mongo.close();
      await closeMongoDBConnection(); // mongo client that started server.
    } catch (err) {
      return err;
    }
  });

  test('add post with missing fields', async () => {
    const resp = await request(webapp).put('/posts?category=Social');
    expect(resp.status).toEqual(404);
  });
});