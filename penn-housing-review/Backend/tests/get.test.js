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

  test('Get all FB posts', async () => {
    const resp = await request(webapp).get('/posts');
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
  });

  test('Get all posts filtered by category', async () => {
    const resp = await request(webapp).get('/posts?category=Social');
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
  });

  test('Get all posts filtered by housing', async () => {
    const resp = await request(webapp).get('/posts?housingType=Social');
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
  });
  
});

