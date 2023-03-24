import axios from 'axios';
import { rootURL } from "../utils/utils";


export const addNewPost = async (title, content, category, housingType) => {
    try {
        const response = await axios.post(`${rootURL}/new_posts`,
            `title=${title}&content=${content}&category=${category}&housingType=${housingType}`);
        // console.log("add new post", response.data);
        return response.data
    } catch (err) {
        console.error("error", err.message);
    }
}
