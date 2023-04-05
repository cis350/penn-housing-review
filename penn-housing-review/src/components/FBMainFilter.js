import { React, useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import {
  getAllPosts,
  getFilteredPost,
  getFilteredPostByCategory,
  getFilteredPostByHousingType,
} from '../api/FBMainAPI';
import PostList from './FBPostList';
import './FBMainPageStyles.css';

export default function Filter() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState('');
  const [housingType, setHousingType] = useState('');

  useEffect(() => {
    async function getAllPostsWrapper() {
      const defaultPosts = await getAllPosts();
      setData(defaultPosts);
    }
    getAllPostsWrapper();
  }, []);

  const handlePost = () => {
    window.location.href = '/forum/new-post';
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);

    async function getAllPostsWrapper() {
      const allPosts = await getAllPosts();
      setData(allPosts);
    }

    async function getFilteredPostByCategoryWrapper() {
      const catePosts = await getFilteredPostByCategory(event.target.value);
      setData(catePosts);
    }

    async function getFilteredPostByHousingTypeWrapper() {
      const housingPosts = await getFilteredPostByHousingType(housingType);
      setData(housingPosts);
    }

    async function getFilteredPostWrapper() {
      const filteredPosts = await getFilteredPost(event.target.value, housingType);
      setData(filteredPosts);
    }
    if (housingType === '' && event.target.value === '') {
      getAllPostsWrapper();
    } else if (housingType === '' && event.target.value !== '') {
      getFilteredPostByCategoryWrapper();
    } else if (event.target.value === '' && housingType !== '') {
      getFilteredPostByHousingTypeWrapper();
    } else {
      getFilteredPostWrapper();
    }
  };

  const handleChangeHousingType = (event) => {
    setHousingType(event.target.value);

    async function getAllPostsWrapper() {
      const a = await getAllPosts();
      setData(a);
    }

    async function getFilteredPostByCategoryWrapper() {
      const b = await getFilteredPostByCategory(category);
      setData(b);
    }

    async function getFilteredPostByHousingTypeWrapper() {
      const c = await getFilteredPostByHousingType(event.target.value);
      setData(c);
    }

    async function getFilteredPostWrapper() {
      const d = await getFilteredPost(category, event.target.value);
      setData(d);
    }

    if (event.target.value === '' && category === '') {
      getAllPostsWrapper();
    } else if (event.target.value === '' && category !== '') {
      getFilteredPostByCategoryWrapper();
    } else if (category === '' && event.target.value !== '') {
      getFilteredPostByHousingTypeWrapper();
    } else {
      getFilteredPostWrapper();
    }
  };

  return (
    <div className="filterPage">
      <div className="filterCond">
        <Button variant="contained" onClick={handlePost}>
          Make a Post
        </Button>
        <h3 className="postEle">Housing</h3>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handleChangeHousingType}
          >
            <FormControlLabel
              value=""
              control={<Radio />}
              label="All Housing Types"
            />
            <FormControlLabel
              value="On Campus"
              control={<Radio />}
              label="On Campus"
            />
            <FormControlLabel
              value="Off Campus"
              control={<Radio />}
              label="Off Campus"
            />
          </RadioGroup>
        </FormControl>
        <h3 className="postEle">Category</h3>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handleChangeCategory}
          >
            <FormControlLabel
              value=""
              control={<Radio />}
              label="All Categories"
            />
            <FormControlLabel
              value="Discussion"
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
      </div>
      <div className="filterResult">
        <PostList data={data} />
      </div>
    </div>
  );
}
