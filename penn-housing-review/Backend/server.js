const express = require('express');
const webapp = express();
const dbLib = require('./DbOperations');
const cors = require('cors');
webapp.use(cors());
webapp.use(express.json());
const bcrypt = require('bcrypt');
webapp.use(express.urlencoded({ extended: true }));

webapp.get('/', (req, resp) => {
  resp.json({ messge: 'hello CIS3500 friends!!! You have dreamy eyes' });
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
    const result = await dbLib.updateLikes(
      req.params.id,
      Number(req.body.like)
    );
    console.log(typeof req.body.like);
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

webapp.post('/users', async (req, res) => {
  console.log('user api');
  console.log('body: ' + req.body.username);
  if (req.body.register === true || req.body.register === 'true') {
    console.log('CREATE a user');
    try {
      await dbLib.createUser(
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.followedPosts
      );
      // send the response with the appropriate status code
      console.log('create user succeeded');
      res.status(200).json({ message: 'success' });
    } catch (err) {
      res.status(404).json({ message: 'there was error' });
    }
  } else {
    console.log('READ a user: ' + req.body);
    try {
      const hashedPassword = await dbLib.getUserPassword(req.body.username);
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        hashedPassword
      );
      if (isPasswordCorrect) {
        res.status(200).json({ message: 'success' });
      } else {
        res.status(401).json({ message: 'invalid credentials' });
      }
    } catch (err) {
      res.status(404).json({ message: 'there was error' });
    }
  }
});

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
    res.status(200).json({ data: fbPosts });
  } catch (err) {
    res.status(400).json({ message: 'Error retrieving FB posts' });
  }
});

/**
 * route POST /posts to add a new post
 */
webapp.post('/posts', async (req, res) => {
  console.log('posts', req.body);
  if (
    !req.body.username ||
    !req.body.title ||
    !req.body.housingType ||
    !req.body.category ||
    !req.body.content
  ) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  try {
    const newPost = {
      username: req.body.username,
      title: req.body.title,
      category: req.body.category,
      housingType: req.body.housingType,
      content: req.body.content,
      likes: 0,
      comments: 0,
    };
    const result = await dbLib.addNewPost(newPost);
    res.status(201).json({ data: { id: result } });
  } catch (err) {
    res.status(400).json({ message: 'Error adding new post' });
  }
});

/**
 * route PATCH /posts/:id to update the likes of a post
 */
webapp.patch('/posts/:id', async (req, res) => {
  if (!req.body.likes) {
    res.status(404).json({ message: 'Missing required fields - likes' });
    return;
  }
  console.log('updating likes');
  try {
    const pid = req.params.id;
    const updateLikes = parseInt(req.body.likes);
    const updatedPost = await dbLib.updatePostLike(updateLikes, pid);
    res.status(200).json({ data: updatedPost });
  } catch (err) {
    res.status(400).json({ message: 'Error updating post likes' });
  }
});

/**
 * get comments of a post
 */
webapp.get('/comments', async (req, res) => {
  try {
    const post = req.query.pid;
    const comments = await dbLib.getAllCommentsByPostId(post);
    res.status(200).json({ data: comments });
  } catch (err) {
    res.status(400).json({ message: 'Error retrieving comments' });
  }
});

/**
 * add new comment to a post
 */
webapp.post('/comments', async (req, res) => {
  if (!req.body.content) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  try {
    const newComment = {
      pid: req.body.pid,
      content: req.body.content,
      likes: parseInt(req.body.likes),
    };
    const result = await dbLib.addNewComment(newComment);
    res.status(201).json({ data: { id: result } });
  } catch (err) {
    res.status(400).json({ message: 'Error adding new comment' });
  }
});

/**
 * update the likes of a comment
 */
webapp.patch('/comments/:id', async (req, res) => {
  if (!req.body.likes) {
    res.status(404).json({ message: 'Missing required fields - likes' });
    return;
  }
  console.log('updating likes');
  try {
    const cid = req.params.id;
    const updateLikes = parseInt(req.body.likes);
    const updatedComment = await dbLib.updateCommentLike(updateLikes, cid);
    res.status(200).json({ data: updatedComment });
  } catch (err) {
    res.status(400).json({ message: 'Error updating comment likes' });
  }
});
/**
 *
 */

webapp.post('/houses', async (req, res) => {
  console.log('reading houses for recommend');
  const price = req.body.price;
  const freshman = req.body.freshman ?? false;
  const onCampus = req.body.onCampus ?? false;
  const studio = req.body.studio ?? false;
  const single = req.body.single ?? false;
  const double = req.body.double ?? false;
  const triple = req.body.triple ?? false;
  const quad = req.body.quad ?? false;

  console.log(req.body);

  try {
    const filteredHouses = await dbLib.getFilteredHouses(
      price,
      freshman,
      onCampus,
      studio,
      single,
      double,
      triple,
      quad
    );
    res.status(200).json({ data: filteredHouses });
  } catch (err) {
    res.status(400).json({ message: 'Error retrieving houses' });
  }
});

module.exports = webapp;
