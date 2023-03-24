/**
* @jest-environment jsdom
*/

import '@testing-library/jest-dom/extend-expect';
import { getFilteredPostByCategory } from '../api/FBMainAPI';
import axios from 'axios';

jest.mock('axios');

const mockData = {
    posts: [
        {
          uid: 1,
          user: "Lilian",
          pid: 1,
          createAt: "2023-01-01",
          title: "Harrison Flooding Again",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          housingType: "On Campus",
          category: "Discussion",
          comments: ["comment1", "comment2", "comment3"],
          commentLength: 3,
          likes: 10
        }
    ]
}

test('get Discussion posts', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(mockData));
    const response = await getFilteredPostByCategory("Discussion");
    console.log("response", response);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/posts?category=Discussion');

});


