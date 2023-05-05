// /**
// * @jest-environment jsdom
// */

// import '@testing-library/jest-dom/extend-expect';
// import { getFilteredPostByCategory } from '../api/FBMainAPI';
// import axios from 'axios';

// jest.mock('axios');

// const mockData = {
//     posts: [
//         {
//           uid: 1,
//           user: "Lilian",
//           pid: 1,
//           createAt: "2023-01-01",
//           title: "Harrison Flooding Again",
//           content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//           housingType: "On Campus",
//           category: "Discussion",
//           comments: ["comment1", "comment2", "comment3"],
//           commentLength: 3,
//           likes: 10
//         }
//     ]
// }

// test('get Discussion posts', async () => {
//     axios.get.mockImplementationOnce(() => Promise.resolve(mockData));
//     const response = await getFilteredPostByCategory("Discussion");
//     console.log("response", response);
//     expect(axios.get).toHaveBeenCalledTimes(1);
//     expect(axios.get).toHaveBeenCalledWith('http://localhost:3500/posts?category=Discussion');

// });

import axios from 'axios';
import {
  getAllPosts,
  getFilteredPost,
  getFilteredPostByCategory,
  getFilteredPostByHousingType,
  updatePostLike,
  updateCommentLike,
  getAllCommentsByPostId,
  createComment,
  addNewPost
} from '../api/FBMainAPI';

// mock axios methods for testing
jest.mock('axios');

describe('Unit tests for module functions', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('getAllPosts function returns expected data', async () => {
    const mockData = {
      data: [
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' }
      ]
    };
    axios.get.mockResolvedValue(mockData);

    const result = await getAllPosts();

    expect(result).toEqual(mockData.data);
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/posts'));
  });

  test('updatePostLike function returns expected data', async () => {
    const mockData = { data: { id: 1, likes: 5 } };
    axios.patch.mockResolvedValue(mockData);

    const result = await updatePostLike(5, 1);

    expect(result).toEqual(mockData.data);
    expect(axios.patch).toHaveBeenCalledWith(
      expect.stringContaining('/posts/1'),
      { likes: 5 }
    );
  });

  test('updateCommentLike function returns expected data', async () => {
    const mockData = { data: { id: 1, likes: 5 } };
    axios.patch.mockResolvedValue(mockData);

    const result = await updateCommentLike(5, 1);

    expect(result).toEqual(mockData.data);
    expect(axios.patch).toHaveBeenCalledWith(
      expect.stringContaining('/comments/1'),
      {
        likes: 5
      }
    );
  });

  test('getAllCommentsByPostId function returns expected data', async () => {
    const mockData = {
      data: [
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' }
      ]
    };
    axios.get.mockResolvedValue(mockData);

    const result = await getAllCommentsByPostId(1);

    expect(result).toEqual(mockData.data);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/comments?pid=1')
    );
  });

  test('createComment function returns expected data', async () => {
    const mockData = { data: { id: 1, title: 'Post 1' } };
    axios.post.mockResolvedValue(mockData);

    const result = await createComment(1, 'test comment');

    expect(result).toEqual(mockData.data);
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/comments'),
      {
        pid: 1,
        likes: 0,
        content: 'test comment'
      }
    );
  });

  test('addNewPost function returns expected data', async () => {
    const mockData = { data: { id: 1, title: 'Post 1' } };
    axios.post.mockResolvedValue(mockData);

    const result = await addNewPost(
      'test title',
      'test content',
      'Discussion',
      'On Campus',
      'test user',
      1
    );

    expect(result).toEqual(mockData.data);
    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/posts'), {
      title: 'test title',
      content: 'test content',
      category: 'Discussion',
      housingType: 'On Campus',
      comments: 0,
      likes: 0
    });
  });
});
