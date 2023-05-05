// userAPI.test.js
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getUserPosts, updateUserPassword } from '../api/userAPI';
import { rootURL } from "../utils/utils";
const mockAxios = new MockAdapter(axios);

describe('userAPI', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('fetches user posts', async () => {
    const username = 'testuser';
    
    const mockUser = {
      id: 1,
      username: 'testuser',
      followedPosts: [1, 2],
    };

    const mockPosts = [
      { id: 1, title: 'Post 1', description: 'Post 1 description' },
      { id: 2, title: 'Post 2', description: 'Post 2 description' },
    ];

    mockAxios
      .onGet(`${rootURL}/users?username=${username}`)
      .reply(200, [mockUser]);

    mockAxios
      .onGet(`${rootURL}/posts/1`)
      .reply(200, mockPosts[0]);

    mockAxios
      .onGet(`${rootURL}/posts/2`)
      .reply(200, mockPosts[1]);

    const posts = await getUserPosts(username);
    expect(posts).toEqual(mockPosts);
  });

  it('handles error when fetching user posts', async () => {
    const username = 'testuser';
    mockAxios.onGet(`${rootURL}/users?username=${username}`).networkError();

    const posts = await getUserPosts(username);
    expect(posts).toEqual([]);
  });

  it('updates user password', async () => {
    const username = 'testuser';
    const password = 'current_password';
    const newPassword = 'new_password';
    const id = 1;

    const usersResponse = [
      {
        id: 1,
        username: 'testuser',
      },
    ];

    mockAxios
      .onGet(`${rootURL}/login`, { params: { username, password } })
      .reply(200, usersResponse);

    mockAxios
      .onPatch(`${rootURL}/login/${id}`, { password: newPassword })
      .reply(200);

    const result = await updateUserPassword(username, password, newPassword);
    expect(result).toBe(true);
  });

  it('handles error when updating user password', async () => {
    const username = 'testuser';
    const password = 'current_password';
    const newPassword = 'new_password';

    mockAxios
      .onGet(`${rootURL}/login`, { params: { username, password } })
      .networkError();

    const result = await updateUserPassword(username, password, newPassword);
    expect(result).toBe(false);
  });
});
