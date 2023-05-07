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

  test('create new user', async () => {
    const resp = await request(webapp).post('/users?username=test');
    expect(resp.status).toEqual(404);
  });

  test('add post with missing fields', async () => {
    const resp = await request(webapp).post('/posts?category=Social');
    expect(resp.status).toEqual(400);
  });

  test('add comment with missing fields', async () => {
    const resp = await request(webapp).post('/comments');
    expect(resp.status).toEqual(400);
  });

  test('add comment sucess', async () => {
    const resp = await request(webapp).post('/comments').send(
      {
        pid: '64442ce96cebadb4c6de65e3',
        content: 'testing',
        likes: 0,
      }
    );
    expect(resp.status).toEqual(201);
  });

  test('change password with missing fields', async () => {
      const resp = await request(webapp).post('/users/updatePassword');
      expect(resp.status).toEqual(404);
  });

  test('update user password failed', async () => {

    const resp = await request(webapp).post('/user/updatePassword').send({
      username: 'test',
      password: 'test',
      newPassword: 'test',
    }
    );
    expect(resp.status).toEqual(400);
  
  });

  test('update followed posts failed', async () => {

    const resp = await request(webapp).post('/user/updateFollowedPosts');
    expect(resp.status).toEqual(404);
  
  });

  test('add post sucess', async () => {
    const resp = await request(webapp).post('/posts').send(
      {
        username: 'Lilian',
        title: 'testing',
        housingType: 'On Campus',
        category: 'Social',
        content: 'hiiii'
      }
    );
    expect(resp.status).toEqual(201);
  });

  test('add review sucess', async () => {
    const resp = await request(webapp).post('/reviews').send(
      {
        User: 'Lilian',
        ratings: [{"$numberInt":"3"},{"$numberInt":"3"},{"$numberInt":"3"}],
        desc: 'testing',
      }
    );
    expect(resp.status).toEqual(201);
  });

});