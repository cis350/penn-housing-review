import './ReviewPage.css';
import * as React from "react";
import { useState } from 'react';
import * as Mui from '@mui/material';

export default function Filter() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div className='filter'>
        <Mui.Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Filter by
        </Mui.Button>
        <Mui.Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <Mui.MenuItem onClick={handleClose}>Default</Mui.MenuItem>
          <Mui.MenuItem onClick={handleClose}>Price</Mui.MenuItem>
          <Mui.MenuItem onClick={handleClose}>Security</Mui.MenuItem>
        </Mui.Menu>
      </div>
    );
  }