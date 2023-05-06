const express = require('express');
const { ObjectId } = require('mongodb');
const webapp = express();
const dbLib = require('./DbOperations');
const cors = require('cors');
webapp.use(cors());
webapp.use(express.json());
const bcrypt = require('bcrypt');
webapp.use(express.urlencoded({ extended: true }));
const path = require('path');
webapp.use(express.static(path.join(__dirname, './Frontend/build')));

const bodyParser = require('body-parser');
webapp.use(bodyParser.json());



/*
webapp.get('/', (req, resp) =>{
    resp.json({messge: 'hello CIS3500 friends!!! You have dreamy eyes'});
});*/
//potentially update urls to start with /api/...
webapp.get('/houses/:id', async (req, res) => {
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

webapp.get('/users', async (req, res) => {
    //for now, just return what posts you follow

    const username = req.query.username; 
    try{

      const userData= await dbLib.getUserData(username);
      res.json(userData);

    } catch (err){
      res.status(404).json({ message:"there was an error:"+ err });
      res.json([]);
    }


});

webapp.post('/users/updateFollowedPosts', async (req, res) => {

  const username = req.query.username;
  const postId = req.query.postId;
  //console.log(username,postId)
  if (!username || !postId) {
    res.status(400).json({message: 'Missing required fields'});
    return;
  }

  try{
    
    const userData= await dbLib.getUserData(username);
    if (!userData){
      
      res.status(404).json({message: 'User not found'});
      return;
    }

    if(!userData.followedPosts.includes(postId)){
      userData.followedPosts.push(postId);
    } else{
      userData.followedPosts = userData.followedPosts.filter(id => id !== postId);
    }

    const result = await dbLib.updateFollowedPosts(username, userData.followedPosts);
    console.log("successfully updated followed posts", result);
    res.status(200).json({message: 'success'});
  } catch (err){
    console.log(err);
    res.status(404).json({ message:"there was an error:"+ err });
  }

  
  

});

webapp.get('/posts/:id', async (req, res) => {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({message: 'Missing required fields'});
      return;
    }

    try{
      const post = await dbLib.getPost(id);
      if (!post){
        res.status(404).json({message: 'Post not found'});
        return;
      }
      res.json(post);
    } catch(err){
      res.status(404).json({ message:"there was an error:"+ err });
    }

});

webapp.post('/user/updatePassword', async (req, res) => {

    const username = req.query.username;
    const password = req.query.password;
    const newPassword = req.query.newPassword;

    if (!username || !password || !newPassword) {
      res.status(400).json({message: 'Missing required fields'});
      return;
    }
   
    try{
      const hashedPassword = await dbLib.getUserPassword(username);
      const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
      if(!isPasswordCorrect){
        res.status(401).json({message: 'Invalid credentials'});
        return;
      }
      const result = await dbLib.updatePassword(username, newPassword);

      console.log(result);
      res.status(200).json({message: 'success'});
    } catch(err){
      res.status(404).json({ message:"there was an error:"+ err });
    }

});

webapp.get('/api/search/:query', async (req, res) => {
  console.log('READ all houses matching a query');
  try {
    const results = await dbLib.searchHouses(req.params.query);
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

webapp.post('/newHouse', async (req, res) => {
  console.log("adding new house");
  try {
    const house = req.body;
    const result = await dbLib.addHouse(house);
    res.status(200).json({ message: 'House added successfully', house: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Adding house failed' });
  }
});

//wildcard endpoint - serve react files
webapp.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './Frontend/build/index.html'));
});

webapp.post('/reviews', async (req, res) => {
  try {
      const newReview = {
        User: req.body.username, 
        ratings: req.body.ratings, 
        likes: 0, 
        desc: req.body.desc, 
        apt_id: new ObjectId(req.body.aptid)
      };
      console.log(newReview);
      const result = dbLib.addReview(newReview);
      res.status(201).json({data: {id: result}});
  } catch (err) {
      console.log(err)
      res.status(400).json({message: 'There was an error'});
  }
})


module.exports = webapp;

