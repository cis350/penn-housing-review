/**
 * Express web server / controller
 */

// import express from 'express';
const express = require('express');
// import cors from 'cors', allows cross-origin resource sharing
const cors = require('cors');
// create a new express application
const webapp = express();
// enable cors
webapp.use(cors());
// configure express to parse request bodies
webapp.use(express.urlencoded({ extended: true }));

// import the database operations module
const dbLib = require('./DbOperations');

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


// export the webapp
module.exports = webapp;