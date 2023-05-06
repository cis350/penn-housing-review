const request = require('supertest');
const { closeMongoDBConnection, connect } = require('../DbOperations');
const webapp = require('../server');

// import test utilities function
// const { isInArray, testStudent, insertTestDataToDB, deleteTestDataFromDB} = require('./testUtils');

let mongo;

// TEST POST ENDPOINT
describe('GET FB posts tests', () => {

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

  test('update post likes failed', async () => {
    const resp = await request(webapp).patch('/posts/643dea4e9c2ad1df2f187939');
    expect(resp.status).toEqual(404);
  });

  test('update post likes sucess', async () => {
    const resp = await request(webapp).patch('/posts/643dea4e9c2ad1df2f187939').send({likes: 17});
    expect(resp.status).toEqual(200);
  });

  test('update comment likes without required param', async () => {
    const resp = await request(webapp).patch('/comments/6444a166002029ab86bb0c1f');
    expect(resp.status).toEqual(404);
  });

  test('update comment likes sucessfully', async () => {
    const resp = await request(webapp).patch('/comments/6444a166002029ab86bb0c1f').send({likes: 1});
    expect(resp.status).toEqual(200);
  });
  
});

