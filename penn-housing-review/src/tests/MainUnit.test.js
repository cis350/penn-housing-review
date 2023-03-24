/*import axios from 'axios';
import searchHouse from '../api/MainSearchApi.js';

// Mock axios.get to return a resolved promise with some mock data
jest.mock('axios');
axios.get.mockResolvedValue({
  data: [
    { houseName: 'NEW YORK CITY' },
    { houseName: 'NEW YORK MILLS' },
    { houseName: 'NEW YORKTOWN' },
    { houseName: 'NEW YORKER' },
    { houseName: 'NEW YORKSHIRE' },
  ],
});

describe('searchHouse', () => {
  // Test that the function returns a promise that resolves with an array of house names
  test('returns a promise that resolves with an array of house names', async () => {
    // Call the function with a keyword and a limit
    const result = await searchHouse('New York', 4);
    // Expect the result to be an array of four strings
    expect(result).toEqual([
      'NEW YORK CITY',
      'NEW YORK MILLS',
      'NEW YORKTOWN',
      'NEW YORKER',
    ]);
  });

  // Test that the function returns a promise that rejects with an error if the API call fails
  test('returns a promise that rejects with an error if the API call fails', async () => {
    // Mock axios.get to return a rejected promise with an error object
    axios.get.mockRejectedValue(new Error('Network error'));
    // Expect the function call to throw an error
    await expect(searchHouse('New York', 4)).rejects.toThrow('Network error');
  });
});*/


/**
* @jest-environment jsdom
*/
/*
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import testing library functions
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewPage from '../components/ReviewPage.js';

test('renders app page', () => {
  const { getByText } = render(<ReviewPage />);
  const linkElement = getByText(/Chestnut/);
  expect(linkElement).toBeInTheDocument();
});

test('button: On Campus Housing', async () => {
  render(<ReviewPage />);
  const button = screen.getByLabelText('button', { name: /10/i });
  expect(button).toBeInTheDocument();

  await userEvent.click(button);})
*/


import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MainBody from '../components/MainSearch2.js';


/**
* @jest-environment jsdom
*/
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { searchHouse } from '../api/MainSearchApi.js';



jest.mock('axios', () => ({
    get: jest.fn(),
  }));

const mockResponse = {
    data: [
      { houseName: "GREEN HOUSE" },
      { houseName: "BLUE HOUSE" },
      { houseName: "RED HOUSE" },
    ],
  };

// Define a mock error object
const mockError = {
    response: {
      status: 404,
      data: "Not found",
    },
  };
  
  


// Define a test case
test("search house three results", async () => {
    // Mock the axios.get call with the mock response data
    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));
  
    // Call the searchHouse function with some parameters
    const response = await searchHouse("house", 10);
  
    // Expect that axios.get was called once with the correct url
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3500/search");
  
    // Expect that the response is an array with one element matching the keyword
    expect(response).toEqual(["GREEN HOUSE", "BLUE HOUSE", "RED HOUSE"]);
  });


// Define a test case
test("search house no results", async () => {
    // Mock the axios.get call with the mock response data
    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));
  
    // Call the searchHouse function with some parameters
    const response = await searchHouse("organe", 10);
  
    // Expect that axios.get was called once with the correct url
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3500/search");
  
    // Expect that the response is an array with one element matching the keyword
    expect(response).toEqual([]);
  });

