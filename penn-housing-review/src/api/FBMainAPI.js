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

