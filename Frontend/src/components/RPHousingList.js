import React from 'react';
import RPHouse from './RPHouse';

function HouseList({ houses }) {
  console.log(houses);
  if (houses.length !== 0) {
    return (
      <div className="houseList">
        {houses.map((house) => (
          <RPHouse key={house.houseid} house={house} />
        ))}
      </div>
    );
  }
  return null;
}

export default HouseList;
