import '../App.css';
import * as React from "react";
import { Routes, Route } from "react-router-dom"
import { useState } from 'react';
import * as Mui from '@mui/material';
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import usePagination from '../utils/usePagination';
import LikeButton from './LikeButton';

function ReviewEntry( {id, username, ratings, likes, desc} ) { // add an ID field
  return (
    <div className='temp'>
      <a href='\user' className='review-user'>{username}</a>
      <div>
        <span>Overall rating: </span>
        <Mui.Rating className='review-star' defaultValue={ratings[0]} precision={0.1} readOnly />
        <span className='review-rating'>Price rating: </span>
        <Mui.Rating className='review-star' defaultValue={ratings[1]} precision={0.1} readOnly />
        <span className='review-rating'>Security rating: </span>
        <Mui.Rating className='review-star' defaultValue={ratings[2]} precision={0.1} readOnly />
      </div>
      <p>{desc}</p>
      <LikeButton likes={likes} id={id} />
    </div>
  )
}

export default function ReviewList( {data} ) {
  let [page, setPage] = useState(1);
  const PER_PAGE = 2;

  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <Box p="5">
      <List p="10" pt="3" spacing={2}>
        {_DATA.currentData().map(v => {
          return (
            <ReviewEntry id={v.id} username={v.User} ratings={v.ratings} desc={v.desc} likes={v.likes} />
          );
        })}
      </List>
      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </Box>
  );
}