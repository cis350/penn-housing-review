import React from 'react';

const styles = {
  display: 'inline-block',
  marginLeft: '5%',
  border: '1px gray solid',
  width: '25%',
  marginBottom: '30px',
  borderRadius: '10px'
};

const imgStyles = {
  width: '240px',
  height: '240px',
  justifyContent: 'center',
  display: 'block',
  margin: '0 auto',
  marginTop: '10px'
};

function RPHouse({ house }) {
  return (
    <div className="house" style={styles}>
      <img src={house.image} style={imgStyles} alt = "house"/>
      <h3>{house.houseName}</h3>
      <p>
        Price range:
        {house.price}
      </p>
    </div>
  );
}

export default RPHouse;
