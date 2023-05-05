import './ReviewPage.css';
import * as React from "react";
import * as Mui from '@mui/material';
import ReviewList from './ReviewList';
import { getReviewsById } from '../api/reviewapi';

export default function ReviewView( {aptid} ) {
    const [reviews, setReviews] = React.useState([]);
    React.useEffect(()=>{
        getReviewsById(aptid).then(response => setReviews(response.data.data));
    });
  return (
    <div className="review-view">
      <Mui.Button variant='contained' className='post-review' color='success'>Post Review</Mui.Button>
      <ReviewList data={reviews} />
    </div>
  )
}