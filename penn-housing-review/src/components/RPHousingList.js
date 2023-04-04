import React from 'react';
import RPHouse from './RPHouse';


const HouseList = ({ houses }) => {
  return (
    <div className="houseList">
      {houses.map((house) => (
        <RPHouse key={house.houseid} house={house} />
      ))}
    </div>
  );
};

export default HouseList;
