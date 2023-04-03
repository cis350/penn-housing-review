// userAPI.test.js
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { rootURL } from "../utils/utils";
import { getUserPosts, updateUserPassword } from '../api/userAPI';

const mockAxios = new MockAdapter(axios);

describe('userAPI', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('fetches user posts', async () => {
    const username = 'testuser';
    const mockPosts = [
      { title: 'Post 1', description: 'Post 1 description' },
      { title: 'Post 2', description: 'Post 2 description' },
    ];

    const usersResponse = [
      {
        username: 'testuser',
        posts: mockPosts,
      },
    ];

    mockAxios.onGet(rootURL + `/users?username=${username}`).reply(200, usersResponse);

    const posts = await getUserPosts(username);
    expect(posts).toEqual(mockPosts);
  });

  it('handles error when fetching user posts', async () => {
    const username = 'testuser';
    mockAxios.onGet(rootURL + `/users?username=${username}`).networkError();

    const posts = await getUserPosts(username);
    expect(posts).toEqual([]);
  });

  it('updates user password', async () => {
    const username = 'testuser';
    const password = 'current_password';
    const newPassword = 'new_password';

    mockAxios.onPut(rootURL + `/users/${username}/update-password`).reply(200);

    const result = await updateUserPassword(username, password, newPassword);
    expect(result).toBe(true);
  });

  it('handles error when updating user password', async () => {
    const username = 'testuser';
    const password = 'current_password';
    const newPassword = 'new_password';

    mockAxios.onPut(rootURL + `/users/${username}/update-password`).networkError();

    const result = await updateUserPassword(username, password, newPassword);
    expect(result).toBe(false);
  });
});
