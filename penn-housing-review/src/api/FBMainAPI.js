import axios from 'axios';
import { rootURL } from "../utils/utils";

// use try catch to handle error
export const getAllPosts = async () => {
    try {
        const res = await axios.get(`${rootURL}/posts`);
        // console.log("get all posts", res.data);
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
        // console.log("get filtered posts", res.data);
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
        // console.log("get filtered posts by category", res.data);
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
        // console.log("get filtered posts by housing type", res.data);
        return res.data;
    }
    catch (err) {
        console.error("error", err.message);
    }
}

export const updatePostLike = async(updateLikes, pid) => {
    try {
        const response = await axios.put(`${rootURL}/posts?pid=${pid}`, {
            likes: updateLikes
        });
        console.log("update likes", response.data);
        return response.data;
    } catch (err) {
        console.error("error", err.message);
    }
}

export const updateCommentLike = async(updateLikes, cid) => {
    try {
        const response = await axios.put(`${rootURL}/comments?cid=${cid}`, `likes=${updateLikes}`);
        console.log("update likes", response.data);
        return response.data;
    } catch (err) {
        console.error("error", err.message);
    }
}

export const getAllCommentsByPostId = async (pid) => {
    try {
        const res = await axios.get(`${rootURL}/comments?pid=${pid}`);
        // console.log("get all comments by post id", res.data);
        return res.data;
    } catch (err) {
        console.error("error", err.message);
    }
}

export const createComment = async (pid, content) => {
    try {
        const response = await axios.post(`${rootURL}/comments`, {
            pid: pid,
            content: content,
            likes: 0,
        });
        console.log("create comment", response.data);
        return response.data;
    } catch (err) {
        console.error("error", err.message);
    }
}

export const updateCommentLength = async (pid, commentLength) => {
    try {
        const response = await axios.put(`${rootURL}/posts?id=${pid}`, {
            comments: commentLength
        });
        console.log("update comment length", response.data);
        return response.data;
    } catch (err) {
        console.error("error", err.message);
    }
}

export const addNewPost = async (title, content, category, housingType, user, uid) => {
    try {
        const response = await axios.post(`${rootURL}/posts`,{
            title: title,
            content: content,
            category: category,
            housingType: housingType,
            comments: 0,
            likes: 0,
        });
        console.log("add new post", response.data);
        return response.data
    } catch (err) {
        console.error("error", err.message);
    }
}
