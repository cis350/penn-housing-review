import axios from 'axios';
import { rootURL } from "../utils/utils";
//import {rootURL} from "../utils/utils";


export async function getUserPosts(username) {
    // Replace this with the actual API endpoint for fetching user posts
    const apiUrl = rootURL + `/users?username=${username}`;
  
    try {
      const response = await axios.get(apiUrl);
      const users = response.data;
  
      if (users.length > 0) {
        return users[0].posts;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching user posts:', error);
      return [];
    }
  }

  export async function updateUserPassword(username, password, newPassword) {
    
    const apiUrl = rootURL + `/login?username=${username}`;
  
    try {

      const data = await axios.get(apiUrl);
      const users = data.data;
      if(users.length>0){
        users[0].password = newPassword;
      } else{
        throw new Error('User does not exist');
      }

      const userUrl = rootURL+ '/login/'+users[0].id;

      const response = await axios.put(userUrl, users[0]);
  
      if (response.status === 200) {
        return true;
      } else {
        throw new Error(`An error occurred: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating user password:', error);
      return false;
    }
  }
  