import React, { useState } from 'react';
import '../styles/RPPreference.css';

function Preference({ preferences, onPreferenceChange }) {
  const [hoverRatings, setHoverRatings] = useState({});

  const handleMouseEnter = (name, rating) => {
    setHoverRatings({ ...hoverRatings, [name]: rating });
  };

  const handleMouseLeave = (name) => {
    setHoverRatings({ ...hoverRatings, [name]: null });
  };

  const handleClick = (name, rating) => {
    onPreferenceChange(name, rating);
  };

  return (
    <div className="preferenceContainer">
      <h3>Preferences</h3>
      {preferences.map((pref) => (
        <div key={pref.name} className="preferenceItem">
          <label className="prefTitle">{pref.label}</label>
          <div className="starWrapper">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                onMouseEnter={() => handleMouseEnter(pref.name, i + 1)}
                onMouseLeave={() => handleMouseLeave(pref.name)}
                onClick={() => handleClick(pref.name, i + 1)}
                className="rpStar"
                style={{
                  color:
                    i + 1 <= (hoverRatings[pref.name] || pref.value)
                      ? '#FFD700'
                      : '#ccc'
                }}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Preference;
