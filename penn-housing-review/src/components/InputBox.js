import React from 'react';
import './InputBox.css';

function InputBox({ id, val, text, handleVal }) {
  if (id === 'password') {
    return (
      <div>
        <label className="input-box-title" htmlFor={id}>
          {text}
        </label>
        <input
          className="input-box-textbox"
          type="password"
          id={id}
          name={id}
          value={val}
          onChange={handleVal}
        />
      </div>
    );
  }
  return (
    <div>
      <label className="input-box-title" htmlFor={id}>
        {text}
      </label>
      <input
        className="input-box-textbox"
        type="text"
        id={id}
        name={id}
        value={val}
        onChange={handleVal}
      />
    </div>
  );
}

export default InputBox;
