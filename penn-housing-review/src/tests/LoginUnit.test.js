import axios from "axios";
import loginUser from "../api/LoginAPI.js";
import registerUser from "../api/registrationAPI.js"; 


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

// Create a test suite for the registerUser function
describe("registerUser", () => {
  // Test that the function resolves with a response object when the registration is successful
  test("should resolve with a response object when registration is successful", async () => {
    // Arrange: create a mock response object and make axios.post resolve with it
    const mockResponse = {
      status: 200,
      data: {
        message: "Registration successful",
        token: "some-token"
      }
    };
    axios.post.mockResolvedValue(mockResponse);

    // Act: call the registerUser function with some valid arguments
    const result = await registerUser("testuser", "test@test.com", "test123");

    // Assert: expect the result to be equal to the mock response object
    expect(result).toEqual(mockResponse);
  });

  // Test that the function rejects with an error when the registration fails
  test("should reject with an error when registration fails", async () => {
    // Arrange: create a mock error object and make axios.post reject with it
    const mockError = new Error("registration failed");
    axios.post.mockRejectedValue(mockError);

    // Act and assert: expect the registerUser function to throw an error when called with some invalid arguments
    await expect(registerUser("invaliduser", "invalid@test.com", "invalid")).rejects.toThrow(mockError);
  });
});
