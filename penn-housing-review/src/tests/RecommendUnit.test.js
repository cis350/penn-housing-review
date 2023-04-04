import axios from 'axios';
import { fetchHouses } from '../api/RecommendApi';
import { rootURL } from '../utils/utils';

jest.mock('axios');

describe('fetchHouses function', () => {
  const mockFilters = {
    onCampus: true,
    freshman: true,
    priceRange: [0, 5000],
    roomTypes: ['studio', '1 bedroom'],
  };
  const mockResponse = [{ houseid: 1, houseName: 'Test House 1' }, { houseid: 2, houseName: 'Test House 2' }];

  it('makes a GET request to the correct URL with filters', async () => {
    axios.get.mockResolvedValueOnce({ data: mockResponse });
    await fetchHouses(mockFilters);
  });

  it('returns the response data if successful', async () => {
    axios.get.mockResolvedValueOnce({ data: mockResponse });
    const response = await fetchHouses(mockFilters);
    expect(response).toEqual(mockResponse);
  });

  it('throws an error if the request fails', async () => {
    const error = new Error('Failed to fetch houses');
    axios.get.mockRejectedValueOnce(error);
  });
});

