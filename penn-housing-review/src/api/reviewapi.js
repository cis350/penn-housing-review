import axios from "axios";
import { rootURL } from '../utils/utils';

export const getApartmentById = async(id) => {
    try {
        const response = await axios.get(`${rootURL}/${id}`);
        console.log("apartment", response.data);
        return response.data;
    } catch (err) {
        console.error('error', err.message);
    }
}

export const updateLike = async(likes, id) => {
    try {
        const response = await axios.put(`${rootURL}/${id}`, {
            likes: likes
        });
        console.log("likes", response.data);
        return response.data;
    } catch (err) {
        console.error('error', err.message);
    }
}