import './FBMainPageStyles.css';
import React from 'react';
import Filter from './FBMainFilter';
import Header from './FBMainHeader';

export default function FBMain() {
  return (
    <div className="Container">
      <Header />
      <Filter />
    </div>
  );
}
