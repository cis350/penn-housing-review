const request = require('supertest');
const { closeMongoDBConnection, connect } = require('../DbOperations');
const webapp = require('../server');

// import test utilities function
// const { isInArray, testStudent, insertTestDataToDB, deleteTestDataFromDB} = require('./testUtils');

let mongo;

// TEST POST ENDPOINT
describe('GET student(s) endpoint integration test', () => {
  /**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -'jest': true-
*/
  let db;
 
  /**
     * Make sure that the data is in the DB before running
     * any test
     * connect to the DB
     */
  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();
    
    // add test user to mongodb
    // testStudentID = await insertTestDataToDB(db, testStudent);
    // console.log('testStudentID', testStudentID);
  });

  
  /**
 * Delete all test data from the DB
 * Close all open connections
 */
  afterAll(async () => {
    // await deleteTestDataFromDB(db, 'teststudent');
    try {
      await mongo.close();
      await closeMongoDBConnection(); // mongo client that started server.
    } catch (err) {
      return err;
    }
  });

  test('Search chestnut', async () => {
    const resp = await request(webapp).get('/search/chestnut');
    expect(resp.status).toEqual(200); 
  });

  test('Search chestnut', async () => {
    const resp = await request(webapp).get('/search/har');
    expect(resp.status).toEqual(200); 
  });
  
});
  
