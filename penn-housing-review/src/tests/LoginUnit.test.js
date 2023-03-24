import axios from "axios";
import loginUser from "../api/LoginAPI.js";

// Mock all axios methods
jest.mock("axios");

// Define a test case
test("login user", async () => {
  // Mock the axios.post call with a mock response data
  axios.post.mockImplementation(() =>
    Promise.resolve({
      data: {
        token: "123456",
        user: {
          username: "test",
          password: "test",
        },
      },
    })
  );

  // Call the loginUser function with some parameters
  const response = await loginUser("test", "test");

  // Expect that axios.post was called once with the correct url and data
  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(axios.post).toHaveBeenCalledWith("http://localhost:3500/login", {
    username: "test",
    password: "test",
  });
})

