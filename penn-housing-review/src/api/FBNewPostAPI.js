import axios from 'axios';
import { rootURL } from "../utils/utils";

// add new post

// export const addNewPost = async (title, content, category, housinType) => {
//     try {
//         const response = await axios.post(`${rootURL}/posts`,{
//                 title: title,
//                 content: content,
//                 category: category,
//                 housingType: housinType
//             });
//         console.log("add new post", response.data);
//         return response.data;
//     } catch (err) {
//         console.error("error", err.message);
//     }
// }

export const addNewPost = async (title, content, category, housingType) => {
    try {
        console.log("title", title);
        console.log("content", content);
        console.log("category", category);
        console.log("housingType", housingType);
        const response = await axios.post(`${rootURL}/posts`,
            `title=${title}&content=${content}&category=${category}&housingType=${housingType}`);
        console.log("add new post", response.data);
        return response.data
    } catch (err) {
        console.error("error", err.message);
    }
}
