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

/**
 * route GET /posts to retrieve all the FBposts
 */
webapp.get('/posts', async (req, res) => {
    const category = req.query.category ?? null;
    const housingType = req.query.housingType ?? null;

    try {
        let fbPosts;
        if (category && housingType) {
            fbPosts = await dbLib.getFilteredPost(housingType, category);
        } else if (category) {
            fbPosts = await dbLib.getFilteredPostByCategory(category);
        } else if (housingType) {
            fbPosts = await dbLib.getFilteredPostByHousingType(housingType);
        } else {
            fbPosts = await dbLib.getAllPosts();
        }
        res.status(200).json({data: fbPosts});
    }
    catch (err) {
        res.status(400).json({message: 'Error retrieving FB posts'});
    }
});

/**
 * route PATCH /posts/:id to update the likes of a post
 */
webapp.patch('/posts/:id', async (req, res) => {
    if (!req.body.likes) {
        console.log(req.body.likes);
        res.status(404).json({message: 'Missing required fields - likes'});
        return;
    }
    console.log('updating likes');
    try {
        const pid = req.params.id;
        const updateLikes = parseInt(req.body.likes);
        console.log('pid', pid);
        console.log('updateLikes', updateLikes);
        console.log(typeof updateLikes);
        const updatedPost = await dbLib.updatePostLike(updateLikes, pid);
        res.status(200).json({data: updatedPost});
    }
    catch (err) {
        res.status(400).json({message: 'Error updating post likes'});
    }
});

/**
 * route POST /posts to add a new post
 */
webapp.post('/posts', async (req, res) => {

    console.log('posts', req.body);
    if (!req.body.title || !req.body.housingType || !req.body.category || !req.body.content) {
        res.status(400).json({message: 'Missing required fields'});
        return;
    }

    try {
        const newPost = {
            username: req.body.username,
            title: req.body.title,
            category: req.body.category,
            housingType: req.body.housingType,
            content: 0,
            likes: 0
        }
        const result = await dbLib.addNewPost(newPost);
        res.status(201).json({data: {id: result}});
    }
    catch (err) {
        res.status(400).json({message: 'Error adding new post'});
    }
});


module.exports = webapp;