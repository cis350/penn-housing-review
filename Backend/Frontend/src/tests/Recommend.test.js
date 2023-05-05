import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import Filter from '../components/RPFilter';
import Preference from '../components/RPPreference';
import HouseList from '../components/RPHousingList';
import RPMain from '../components/RPMain';
import { fetchHouses } from '../api/RecommendApi.js';

jest.mock('../api/RecommendApi.js');

describe('Filter component', () => {
  it('renders the component without errors', () => {
    render(<Filter />);
  });

  it('updates the onCampus filter when checkbox is clicked', () => {
    const onFilterChange = jest.fn();
    const { getByLabelText } = render(
      <Filter onFilterChange={onFilterChange} />
    );
    const onCampusCheckbox = getByLabelText('On-Campus Housing');
    fireEvent.click(onCampusCheckbox);
    expect(onFilterChange).toHaveBeenCalledWith('onCampus', true);
  });

  it('updates the freshman filter when checkbox is clicked', () => {
    const onFilterChange = jest.fn();
    const { getByLabelText } = render(
      <Filter onFilterChange={onFilterChange} />
    );
    const freshmanCheckbox = getByLabelText('Freshman Housing');
    fireEvent.click(freshmanCheckbox);
    expect(onFilterChange).toHaveBeenCalledWith('freshman', true);
  });

  it('updates the room type filters when checkbox is clicked', () => {
    const onFilterChange = jest.fn();
    const { getByLabelText } = render(
      <Filter onFilterChange={onFilterChange} />
    );
    const studioCheckbox = getByLabelText('studio');
    fireEvent.click(studioCheckbox);
    expect(onFilterChange).toHaveBeenCalledWith('studio', true);
    const oneBedroomCheckbox = getByLabelText('1 bedroom');
    fireEvent.click(oneBedroomCheckbox);
    expect(onFilterChange).toHaveBeenCalledWith('1 bedroom', true);
    const twoBedroomCheckbox = getByLabelText('2 bedroom');
    fireEvent.click(twoBedroomCheckbox);
    expect(onFilterChange).toHaveBeenCalledWith('2 bedroom', true);
    const tripleCheckbox = getByLabelText('triple');
    fireEvent.click(tripleCheckbox);
    expect(onFilterChange).toHaveBeenCalledWith('triple', true);
    const quadCheckbox = getByLabelText('quad');
    fireEvent.click(quadCheckbox);
    expect(onFilterChange).toHaveBeenCalledWith('quad', true);
  });
});

describe('Preference component', () => {
  const preferences = [
    { name: 'cleanliness', label: 'Cleanliness', value: 3 },
    { name: 'amenities', label: 'Amenities', value: 4 },
    { name: 'location', label: 'Location', value: 2 }
  ];

  it('renders the component without errors', () => {
    render(<Preference preferences={preferences} />);
  });

  it('renders the preference labels', () => {
    const { getByText } = render(<Preference preferences={preferences} />);
    preferences.forEach((pref) => {
      const prefLabel = getByText(pref.label);
      expect(prefLabel).toBeInTheDocument();
    });
  });

  /* it('renders the preference ratings', () => {
    const { getAllByText } = render(<Preference preferences={preferences} />);
    preferences.forEach((pref) => {
      const prefRating = getAllByText('★'.repeat(pref.value))[0];
      expect(prefRating).toBeInTheDocument();
    });
  }); */

  /* it('updates the preference rating when star is clicked', () => {
    const onPreferenceChange = jest.fn();
    const { getAllByText } = render(<Preference preferences={preferences} onPreferenceChange={onPreferenceChange} />);
    preferences.forEach((pref) => {
      const stars = getAllByText('★');
      const targetStar = stars[pref.value - 1];
      fireEvent.click(targetStar);
      expect(onPreferenceChange).toHaveBeenCalledWith(pref.name, pref.value);
    });
  }); */

  /* it('updates the star color when mouse enters and leaves', () => {
    const { getAllByText } = render(<Preference preferences={preferences} />);
    preferences.forEach((pref) => {
      const stars = getAllByText('★');
      stars.forEach((star, index) => {
        fireEvent.mouseEnter(star);
        expect(star).toHaveStyle('color: #FFD700');
        fireEvent.mouseLeave(star);
        expect(star).toHaveStyle('color: rgb(204, 204, 204)');
      });
    });
  }); */
});

const mockHouses = [
  {
    houseid: 1,
    houseName: 'House 1',
    houseAddress: '123 Main St.',
    description: 'A nice house',
    onCampus: true,
    freshman: true,
    '1 bedroom': true,
    '2 bedroom': false,
    studio: false,
    triple: false,
    quad: false
  },
  {
    houseid: 2,
    houseName: 'House 2',
    houseAddress: '456 Elm St.',
    description: 'Another nice house',
    onCampus: false,
    freshman: false,
    '1 bedroom': true,
    '2 bedroom': true,
    studio: false,
    triple: true,
    quad: true
  }
];

describe('HouseList component', () => {
  it('renders the component without errors', () => {
    render(<HouseList houses={mockHouses} />);
  });

  it('renders the correct house information', () => {
    const { getByText } = render(<HouseList houses={mockHouses} />);
    mockHouses.forEach((house) => {
      expect(getByText(house.houseName)).toBeInTheDocument();
    });
  });
});

describe('RPMain component', () => {
  beforeEach(() => {
    render(<RPMain />);
  });

  test('renders the submit button', () => {
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeInTheDocument();
  });

  test('submits the filters and preferences to fetch houses on submit button click', async () => {
    fetchHouses.mockResolvedValueOnce([
      { houseid: 1, houseName: 'Test House', houseAddress: '123 Main St.' }
    ]);
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(fetchHouses).toHaveBeenCalledWith({
      onCampus: false,
      freshman: false,
      priceRange: [0, 5000],
      roomTypes: []
    });
  });

  test('updates the filters state on filter change', () => {
    const onCampusCheckbox = screen.getByRole('checkbox', {
      name: 'On-Campus Housing'
    });
    fireEvent.click(onCampusCheckbox);

    expect(onCampusCheckbox).toBeChecked();
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('On-Campus Housing')).toBeInTheDocument();
    expect(screen.getByText('Freshman Housing')).toBeInTheDocument();
    expect(screen.getByText('Room Types')).toBeInTheDocument();

    expect(screen.getByText('Submit')).toBeInTheDocument();

    const filters = {
      onCampus: true,
      freshman: false,
      priceRange: [0, 5000],
      roomTypes: []
    };

    expect(fetchHouses).not.toHaveBeenCalled();
  });

  test('updates the preferences state on preference change', () => {
    const securityLabel = screen.getByText('Security');
    expect(securityLabel).toBeInTheDocument();

    fireEvent.mouseLeave(securityLabel, { target: { name: 'security' } });

    const preferences = [
      { name: 'security', label: 'Security', value: 2 },
      { name: 'distance', label: 'Distance to Campus', value: 0 },
      { name: 'amenity', label: 'Amenity', value: 0 }
    ];

    expect(fetchHouses).not.toHaveBeenCalled();
  });
});
