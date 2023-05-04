import React, { useState } from 'react';
import FBHeader from './FBHeader';
import '../styles/RPMain.css';
import Filter from './RPFilter';
import Preference from './RPPreference';
import fetchHouses from '../api/RecommendApi';
import HouseList from './RPHousingList';

function RPMain() {
  const showPreference = false;
  const [preferences, setPreferences] = useState([
    { name: 'security', label: 'Security', value: 0 },
    { name: 'distance', label: 'Distance to Campus', value: 0 },
    { name: 'amenity', label: 'Amenity', value: 0 },
  ]);

  const handlePreferenceChange = (name, value) => {
    setPreferences(
      preferences.map((pref) =>
        pref.name === name ? { ...pref, value } : pref
      )
    );
  };

  const [filters, setFilters] = useState({
    onCampus: false,
    freshman: false,
    priceRange: [0, 5000],
    roomTypes: [],
  });

  const [houseList, setHouseList] = useState([]);

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
    console.log(filters);
  };

  const handleSubmit = async () => {
    try {
      console.log(preferences);
      filters.price = parseInt(filters.price, 10);
      const houses = await fetchHouses(filters);
      console.log(houses);
      setHouseList(houses);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <FBHeader title="For You" />
      <div className="RPBodyWrapper">
        <div className="RPLeft">
          <Filter filters={filters} onFilterChange={handleFilterChange} />
          {showPreference ? (
            <Preference
              style={{ display: 'none' }}
              preferences={preferences}
              onPreferenceChange={handlePreferenceChange}
            />
          ) : null}
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <div className="RPRight">
          <HouseList houses={houseList} />
        </div>
      </div>
    </div>
  );
}

/*
// src/App.js
import React, { Component } from 'react';
import axios from 'axios';
import Filter from './RPFilter';
import Preference from './RPPreference';
import HouseList from './RPHousingList';

class RPMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: [],
      filters: {},
      preferences: {},
      submitted: false,
    };
  }

  componentDidMount() {
    this.fetchHouses();
  }

  fetchHouses = async () => {
    try {
      const response = await axios.get('/api/houses');
      this.setState({ houses: response.data });
    } catch (error) {
      console.error('Error fetching houses:', error);
    }
  };

  handleFilterChange = (name, value) => {
    this.setState({ filters: { ...this.state.filters, [name]: value } });
  };

  handlePreferenceChange = (name, value) => {
    this.setState({ preferences: { ...this.state.preferences, [name]: value } });
  };

  handleSubmit = () => {
    // Logic to update the display order of houses based on preferences and filters.
    // ...

    this.setState({ submitted: true });
  };

  render() {
    const { houses, submitted } = this.state;

    return (
      <div className="App">
        <FBHeader title="For You"/>
        <div className = "RPLeft">
          <Filter onFilterChange={this.handleFilterChange} />
          <Preference onPreferenceChange={this.handlePreferenceChange} />
          <button onClick={this.handleSubmit}>Submit</button>
          {submitted && <h3>Showing houses based on your preferences and filters:</h3>}
        </div>

        <HouseList houses={houses} />
      </div>
    );
  }
}

*/

export default RPMain;
