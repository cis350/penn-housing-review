const express = require('express');
const webapp = express();
const dbLib = require('./DbOperations');
const cors = require('cors');
webapp.use(cors());
webapp.use(express.json());
const bcrypt = require('bcrypt');
webapp.use(express.urlencoded({extended: true}));

webapp.get('/', (req, resp) =>{
    resp.json({messge: 'hello CIS3500 friends!!! You have dreamy eyes'})
});

webapp.get('/apartments/:id', async (req, res) => {
    console.log('READ an apartment');
    try {
      // get the data from the db
      const results = await dbLib.getApartment(req.params.id);
      if (results === undefined) {
        res.status(404).json({ error: 'unknown apartment' });
        return;
      }
      // send the response with the appropriate status code
      res.status(200).json({ data: results });
    } catch (err) {
      res.status(404).json({ message: 'there was error' });
    }
  });

webapp.get('/reviews/:id', async (req, res) => {
    console.log('READ all reviews for an apartment');
    try {
      // get the data from the db
      const results = await dbLib.getReviews(req.params.id);
      if (results === undefined) {
        res.status(404).json({ error: 'unknown apartment' });
        return;
      }
      // send the response with the appropriate status code
      res.status(200).json({ data: results });
    } catch (err) {
      res.status(404).json({ message: 'there was error' });
    }
  });

webapp.put('/reviews/:id', async (req, res) => {
    console.log('UPDATE a review');
    try {
      const result = await dbLib.updateLikes(req.params.id, req.body.likes);
      // send the response with the appropriate status code
      res.status(200).json({ message: result });
    } catch (err) {
      res.status(404).json({ message: 'there was error' });
    }
  });

  webapp.post('/users', async (req, res) => {
    console.log('user api');
    console.log("body: " + req.body.username);
    if (req.body.register === true || req.body.register === 'true' ) {
      console.log('CREATE a user');
      try {
        await dbLib.createUser(req.body.username, req.body.email, req.body.password, req.body.followedPosts);
        // send the response with the appropriate status code
        console.log("create user succeeded")
        res.status(200).json({ message: 'success' });
      } catch (err) {
        res.status(404).json({ message: 'there was error' });
      }
    } else {
      console.log('READ a user: ' + req.body);
      try {
        const hashedPassword = await dbLib.getUserPassword(req.body.username);
        const isPasswordCorrect = await bcrypt.compare(req.body.password, hashedPassword);
        if (isPasswordCorrect) {
          res.status(200).json({ message: 'success' });
        } else {
          res.status(401).json({ message: 'invalid credentials' });
        }
      }
      catch (err) {
        res.status(404).json({ message: 'there was error' });
      }
  }
  }
  );

  webapp.get('/search/:query', async (req, res) => {
    console.log('READ all houses matching a query');
    try {
      // get the data from the db
      const results = await dbLib.searchHouses(req.params.query);
      if (results === undefined) {
        res.status(404).json({ error: 'unknown house' });
        return;
      }
      // send the response with the appropriate status code
      res.status(200).json({ data: results });
    }
    catch (err) {
      res.status(404).json({ message: 'there was error' });
    }
  }
  );

module.exports = webapp;