/**
* @jest-environment jsdom
*/
import '@testing-library/jest-dom/extend-expect';
import { addNewPost } from '../api/FBNewPostAPI';
import axios from 'axios';

jest.mock('axios', () => ({
    post: jest.fn(),
}));

const mockData = {
    posts: [
        {
          id: 1,
          title: "Harrison Flooding Again",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          housingType: "On Campus",
          category: "Discussion",
        }
    ]
}

test('add post', async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve(mockData));
    const response = await addNewPost("t_title", "t_content", "t_c", "t_hs");
    expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/new_posts", "title=t_title&content=t_content&category=t_c&housingType=t_hs");

});