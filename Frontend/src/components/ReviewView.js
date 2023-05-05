import './ReviewPage.css';
import { useNavigate } from 'react-router-dom';
import * as React from "react";
import * as Mui from '@mui/material';
import ReviewList from './ReviewList';
import { getReviewsById } from '../api/reviewapi';


export default function ReviewView( {aptid, username} ) {
    const [reviews, setReviews] = React.useState([]);
    React.useEffect(()=>{
        getReviewsById(aptid).then(response => setReviews(response.data.data));
    });
    const navigate = useNavigate();
    const toPostReivew = () => {
      navigate('/review/new-post', {state:{aptid,username}});
    }

  return (
    <div className="review-view">
      <Mui.Button
        variant='contained'
        className='post-review'
        color='success'
        onClick={() => {toPostReivew()}}
      >
        Post Review
      </Mui.Button>
      <ReviewList data={reviews} />
    </div>
  )
}