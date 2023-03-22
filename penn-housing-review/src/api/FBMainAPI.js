import axios from 'axios';
import { rootURL } from "../utils/utils";

// use try catch to handle error
export const getAllPosts = async () => {
    try {
        const res = await axios.get(`${rootURL}/posts`);
        console.log("get all posts", res.data);
        return res.data;

    }
    catch (err) {
        console.error("error", err.message);
    }
}

export const getFilteredPost = async (category, housingType) => {
    try {
        const url = `${rootURL}/posts?category=${category}&housingType=${housingType}`;
        const res = await axios.get(url);
        console.log("get filtered posts", res.data);
        return res.data;
    }
    catch (err) {
        console.error("error", err.message);
    }
}

export const getFilteredPostByCategory = async (category) => {
    try {
        const url = `${rootURL}/posts?category=${category}`;
        const res = await axios.get(url);
        console.log("get filtered posts by category", res.data);
        return res.data;
    }
    catch (err) {
        console.error("error", err.message);
    }
}

export const getFilteredPostByHousingType = async (housingType) => {
    try {
        const url = `${rootURL}/posts?housingType=${housingType}`;
        const res = await axios.get(url);
        console.log("get filtered posts by housing type", res.data);
        return res.data;
    }
    catch (err) {
        console.error("error", err.message);
    }
}

export const updateLike = async(likes, pid) => {
    try {
        const response = await axios.put(`${rootURL}/posts/${pid}`, {
            likes: likes
        });
        console.log("update likes", response.data);
        return response.data;
    } catch (err) {
        console.error("error", err.message);
    }
}

// export const incrementLikes = async (pid) => {
//     try {
//         const url = `${rootURL}/posts?pid=${pid}`;
//         const post = await axios.get(url);
//         const newLikesCount = post.data.likes + 1;
//         const updatedPost = await axios.put(url, { ...post.data, likes: newLikesCount });
//         console.log("updated like", updatedPost.data);
//         return updatedPost.data.likes;
//     } catch (err) {
//         console.error(`Error updating likes count for post ${postId}: ${err.message}`);
//     }
//   };

