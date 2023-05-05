import React, { Component } from 'react';
import '../styles/RPFilter.css';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
    };
  }

  handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    const { onFilterChange } = this.props;
    onFilterChange(name, type === 'checkbox' ? checked : value);
    if (name === 'price') {
      this.setState({ price: value });
    }
  };

  render() {
    const { price } = this.state;
    return (
      <div className="filterContainer">
        <h3>Filters</h3>
        <div className="singleFilter">
          <label htmlFor="onCampus">
            <input
              type="checkbox"
              name="onCampus"
              onChange={this.handleFilterChange}
            />
            On-Campus Housing
          </label>
        </div>
        <div className="singleFilter">
          <label htmlFor="freshman">
            <input
              type="checkbox"
              name="freshman"
              onChange={this.handleFilterChange}
            />
            Freshman Housing
          </label>
        </div>
        <div className="singleFilter">
          <label htmlFor="price">
            Price Range:{' '}
            <input
              type="range"
              name="price"
              min="0"
              max="5000"
              onChange={this.handleFilterChange}
            />{' '}
            {price}
          </label>
        </div>
        <div className="checkboxGroup">
          <h4>Room Types</h4>
          {['studio', 'single', 'double', 'triple', 'quad'].map((type) => (
            <label key={type} className="roomType" htmlFor={type}>
              <input
                type="checkbox"
                name={type}
                onChange={this.handleFilterChange}
              />
              {type}
            </label>
          ))}
        </div>
      </div>
    );
  }
}

export default Filter;
