// create posting page
// allow user to insert title, content and choose housing type and category

import React, { useState } from 'react';
import './FBPostPageStyles.css';
import {
  Button,
  TextField,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl
} from '@mui/material';
import { addNewPost } from '../api/FBMainAPI';

export default function FBPostPage() {
  const [currentOnCampus, setcCurrentOnCampus] = useState('outlined');
  const [currentOffCampus, setcCurrentOffCampus] = useState('outlined');
  const [housingType, setHousingType] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [checkAllInfo, setCheckAllInfo] = useState(false);
  const username = localStorage.getItem('username');
  
  async function addNewPostWrapper() {
    const response = await addNewPost(title, content, category, housingType, username);
    console.log('response', response);
    return response;
  }

  const handleHousingTypeClickOne = (event) => {
    if (currentOnCampus === 'outlined') {
      setcCurrentOnCampus('contained');
      if (currentOffCampus === 'contained') {
        setcCurrentOffCampus('outlined');
      }
      setHousingType(event.target.value);
    } else {
      setcCurrentOnCampus('outlined');
      setHousingType('');
    }
  };

  const handleHousingTypeClickTwo = (event) => {
    if (currentOffCampus === 'outlined') {
      setcCurrentOffCampus('contained');
      if (currentOnCampus === 'contained') {
        setcCurrentOnCampus('outlined');
      }
      setHousingType(event.target.value);
    } else {
      setcCurrentOffCampus('outlined');
      setHousingType('');
    }
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeContent = (event) => {
    setContent(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = () => {
    if (
      title === '' ||
      content === '' ||
      category === '' ||
      housingType === ''
    ) {
      setCheckAllInfo(true);
    } else {
      setCheckAllInfo(false);
      addNewPostWrapper();
      // direct to forum page
      window.location.href = '/forum';
    }
  };

  return (
    <div className="main">
      <h2 className="postingTitle">Post Your Thread!</h2>
      {checkAllInfo && (
        <p style={{ color: 'red' }}>*Remember to fill all information*</p>
      )}
      <Stack direction="row" spacing={2}>
        <Button
          className="housingType"
          style={{
            borderRadius: 65,
            padding: '12px 62.5px',
            fontSize: '12px'
          }}
          // make buttton text bold
          variant={currentOnCampus}
          value="On Campus"
          onClick={handleHousingTypeClickOne}
        >
          On Campus Housing
        </Button>
        <Button
          className="housingType"
          style={{
            borderRadius: 65,
            padding: '12px 62.5px',
            fontSize: '12px'
          }}
          variant={currentOffCampus}
          value="Off Campus"
          onClick={handleHousingTypeClickTwo}
        >
          Off Campus Housing
        </Button>
      </Stack>
      <h3 className="postEle">Title</h3>
      <TextField
        style={{
          borderRadius: 65,
          width: '100%',
          color: 'rgba(117, 137, 122, 0.7)'
        }}
        size="small"
        id="full-width-text-field"
        variant="outlined"
        color="success"
        placeholder="Enter your title here"
        data-testid="title"
        multiline
        rows={1}
        value={title}
        onChange={handleChangeTitle}
      />
      <h3 className="postEle">Category</h3>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={handleChangeCategory}
        >
          <FormControlLabel
            value="Discussion"
            data-testid="dicussion"
            control={<Radio />}
            label="Discussion"
          />
          <FormControlLabel
            value="Lease Info"
            control={<Radio />}
            label="Lease Info"
          />
          <FormControlLabel
            value="Social"
            control={<Radio />}
            label="Social"
          />
          <FormControlLabel value="Event" control={<Radio />} label="Event" />
        </RadioGroup>
      </FormControl>
      <h3 className="postEle">Content</h3>
      <TextField
        style={{
          borderRadius: 65,
          width: '100%',
          color: 'rgba(117, 137, 122, 0.7)'
        }}
        size="small"
        id="full-width-text-field"
        variant="outlined"
        color="success"
        data-testid="content"
        placeholder="Enter you text here"
        multiline
        rows={10}
        value={content}
        onChange={handleChangeContent}
      />
      <p />

      <Stack>
        <Button
          style={{
            borderRadius: 65,
            padding: '12px 62.5px',
            backgroundColor: 'rgba(117, 137, 122, 0.7)',
            fontSize: '15px'
          }}
          variant="contained"
          onClick={handleSubmit}
        >
          Post
        </Button>
      </Stack>
    </div>
  );
}
