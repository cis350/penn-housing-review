import axios from 'axios';
import addHouse from '../api/NewHouseAPI';

jest.mock('axios');

describe('addHouse function', () => {
  const mockHouse = { 
    houseName: 'Test House',
    houseAddress: '123 Main St.',
    description: 'A test house',
    onCampus: true,
    freshman: true,
    '1 bedroom': true,
    '2 bedroom': false,
    studio: false,
    triple: false,
    quad: false,
  };

  it('makes a POST request to the correct URL', async () => {
    axios.post.mockResolvedValueOnce({ data: mockHouse });
    await addHouse(mockHouse);
  });

  it('returns the response data if successful', async () => {
    axios.post.mockResolvedValueOnce({ data: mockHouse });
    const response = await addHouse(mockHouse);
    expect(response.data).toEqual(mockHouse);
  });

  it('throws an error if the request fails', async () => {
    const error = new Error('Failed to add house');
    axios.post.mockRejectedValueOnce(error);
    await expect(addHouse(mockHouse)).rejects.toThrow('Adding house failed');
  });
});