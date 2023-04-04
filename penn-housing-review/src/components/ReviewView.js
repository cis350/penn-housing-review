import './ReviewPage.css';
import * as React from "react";
import * as Mui from '@mui/material';
import Filter from "./Filter";
import ReviewList from './ReviewList';
import { getReviewsById } from '../api/reviewapi';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { reviewPostURL } from '../utils/utils';
import PostReviewPage from './PostReviewPage';

export default function ReviewView( {aptid} ) {
    const [reviews, setReviews] = React.useState([]);
    React.useEffect(()=>{
        getReviewsById(aptid).then(response => setReviews(response.data))
    });
  return (
    <div className="review-view">
      <Filter />
      <Mui.Button variant='contained' className='post-review' color='success'>Post Review</Mui.Button>
      <ReviewList data={reviews} />
    </div>
  )
  /*
  <Routes>
      <Route path={reviewPostURL} elements={<PostReviewPage/>}/>
  </Routes>
  */
}