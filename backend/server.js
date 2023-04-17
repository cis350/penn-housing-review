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
 * route GET /forum to retrieve all the FBposts
 */
webapp.get('/forum', async (req, res) => {
    try {
        const fbPosts = await dbLib.getAllPosts();
        res.status(200).json({data: fbPosts});
    }
    catch (err) {
        res.status(400).json({message: 'Error retrieving FB posts'});
    }
});

/**
 * route GET /forum/:category/:housingType to retrieve all the FBposts
 * that match the category and housingType
 *  
 */
webapp.get('/forum/filter/:category/:housingType', async (req, res) => {
    try {
        const category = req.params.category;
        const housingType = req.params.housingType;
        const fbPosts = await dbLib.getFilteredPost(housingType, category);
        res.status(200).json({data: fbPosts});
    }
    catch (err) {
        res.status(400).json({message: 'Error retrieving filtered FB posts(1)'});
    }
});

/**
 * route GET /forum/:category to retrieve all the FBposts
 * that match the category
 */
webapp.get('/forum/category/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const fbPosts = await dbLib.getFilteredPostByCategory(category);
        res.status(200).json({data: fbPosts});
    }
    catch (err) {
        res.status(400).json({message: 'Error retrieving filtered FB posts(2)'});
    }
});

/**
 * route GET /forum/:housingType to retrieve all the FBposts
 * that match the housingType
 */
webapp.get('/forum/housing/:housingType', async (req, res) => {
    try {
        const housingType = req.params.housingType;
        const fbPosts = await dbLib.getFilteredPostByHousingType(housingType);
        res.status(200).json({data: fbPosts});
    }
    catch (err) {
        res.status(400).json({message: 'Error retrieving filtered FB posts(3)'});
    }
});

// /**
//  * route PATCH /forum/:pid to update the likes of a post
//  */
// webapp.patch('/forum/', async (req, res) => {
//     try {
//         const pid = req.body.pid;
//         const updateLikes = req.body.likes;
//         const updatedPost = await dbLib.updatePostLike(updateLikes, pid);
//         res.status(200).json({data: updatedPost});
//     }
//     catch (err) {
//         res.status(400).json({message: 'Error updating post likes'});
//     }
// });

/**
 * route POST /forum/new-post to add a new post
 */
webapp.post('/forum/new-post', async (req, res) => {
    if (!req.body.title || !req.body.housingType || !req.body.category || !req.body.content) {
        res.status(404).json({message: 'Missing required fields'});
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