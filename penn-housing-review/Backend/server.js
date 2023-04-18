const express = require('express');
const webapp = express();
const dbLib = require('./DbOperations');
const cors = require('cors');
webapp.use(cors());
webapp.use(express.urlencoded({extended: true}));

webapp.get('/', (req, resp) =>{
    resp.json({messge: 'hello CIS3500 friends!!! You have dreamy eyes'})
});

webapp.get('/apartments/:id', async (req, res) => {
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
    console.log(req.params.id);
    try {
      const result = await dbLib.updateLikes(req.params.id, Number(req.body.like));
      console.log(typeof(req.body.like));
      // send the response with the appropriate status code
      res.status(200).json({ message: result });
    } catch (err) {
      res.status(404).json({ message: 'there was error' });
    }
  });

module.exports = webapp;