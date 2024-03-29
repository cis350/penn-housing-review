import React, { useState } from 'react';
import './ReviewNewHouse.css';
import InputBox from './InputBox';
import ReviewNewHouseHeader from './ReviewNewHouseHeader';
import addHouse from '../api/NewHouseAPI';

export default function NewHousePage() {
  const [name, setName] = useState(''); // name of the house
  const [price, setPrice] = useState(''); // price of the house
  const [description, setDescription] = useState(''); // description of the house
  const [onCampus, setOnCampus] = useState(false); // whether the house is on campus
  const [freshmanOnly, setFreshmanOnly] = useState(false); // whether the house is freshman only
  const [roomTypes, setRoomTypes] = useState([]); // selected room types

  console.log(roomTypes);

  // handle change events for input fields
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleOnCampusChange = (event) => {
    setOnCampus(event.target.checked);
  };

  const handleFreshmanOnlyChange = (event) => {
    setFreshmanOnly(event.target.checked);
  };

  const handleRoomTypeChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setRoomTypes([...roomTypes, value]);
    } else {
      setRoomTypes(roomTypes.filter((type) => type !== value));
    }
  };

  async function handleRequestClick() {
    // Try to log in the user with the given credentials
    try {
      const house = {
        id: 1,
        houseid: 1,
        name,
        description,
        onCampus, 
        price,
        freshman: freshmanOnly,
        single: roomTypes.includes('1 bedroom'),
        double: roomTypes.includes('2 bedroom'),
        studio: roomTypes.includes('studio'),
        triple: roomTypes.includes('triple'),
        quad: roomTypes.includes('quad')
      };
      // Await for the addHouse function to resolve or reject
      await addHouse(house);
      // console.log(data);
      // If resolved, get the userID from the data object
      // const userID = data.data.id;
      // console.log(userID);
      // loggedIn(username, userID);
      alert('Request Submitted!');
      window.location.href = '/search';
    } catch (error) {
      // If rejected, handle the error by displaying a message or logging it
      alert(
        'Adding a New House failed. Please check that you are properly logged in.'
      );
      console.error(error);
    }
  }

  async function handleCancelClick() {
    window.location.href = '/search';
  }

  return (
    <div className="container">
      <ReviewNewHouseHeader />
      <div className="title-block">
        <h2 className="new-house-title">Suggest a New House!</h2>
        <h3 className="new-house-text">
          Let us know a few details of this new House, and our management team
          will verify and add this information to our system. Thanks for your
          contribution!
        </h3>
      </div>
      <div className="main">
        <div className="left-section">
          <div className="checkbox-group">
            <h3>Is the House on Campus?</h3>
            <div className="checkbox">
              <label htmlFor='onCampus'>
                <input
                  type="checkbox"
                  value="onCampus"
                  checked={onCampus}
                  onChange={handleOnCampusChange}
                />
                Yes
              </label>
            </div>
            {onCampus && (
              <div className="checkbox">
                <h3>Is the House Freshman Only?</h3>
                <label htmlFor='freshman'>
                  <input
                    type="checkbox"
                    value="freshmanOnly"
                    checked={freshmanOnly}
                    onChange={handleFreshmanOnlyChange}
                  />
                  Yes
                </label>
              </div>
            )}
            <div className="checkbox">
              <h3>What Room Types Are Available?</h3>
              <div className="checkbox-options">
                <label htmlFor='studio'>
                  <input
                    type="checkbox"
                    value="studio"
                    checked={roomTypes.includes('studio')}
                    onChange={handleRoomTypeChange}
                  />
                  Studio
                </label>
                <label htmlFor='1b'>
                  <input
                    type="checkbox"
                    value="1 bedroom"
                    checked={roomTypes.includes('1 bedroom')}
                    onChange={handleRoomTypeChange}
                  />
                  1 Bedroom
                </label>
                <label htmlFor='2b'>
                  <input
                    type="checkbox"
                    value="2 bedroom"
                    checked={roomTypes.includes('2 bedroom')}
                    onChange={handleRoomTypeChange}
                  />
                  2 Bedroom
                </label>
                <label htmlFor='triple'>
                  <input
                    type="checkbox"
                    value="triple"
                    checked={roomTypes.includes('triple')}
                    onChange={handleRoomTypeChange}
                  />
                  Triple
                </label>
                <label htmlFor='quad'>
                  <input
                    type="checkbox"
                    value="quad"
                    checked={roomTypes.includes('quad')}
                    onChange={handleRoomTypeChange}
                  />
                  Quad
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="right-section">
          <InputBox
            id="name"
            val={name}
            text="Name"
            handleVal={handleNameChange}
          />
          <InputBox
            id="price"
            val={price}
            text="Price"
            handleVal={handlePriceChange}
          />
          <InputBox
            id="description"
            val={description}
            text="Description"
            handleVal={handleDescriptionChange}
          />
        </div>
      </div>
      <div className="add-new-house-buttons">
        <button onClick={handleCancelClick} type = "button">Cancel</button>
        <button onClick={handleRequestClick} type = "submit">Request</button>
      </div>
    </div>
  );
}
