import './PostReviewPage.css';
import * as React from "react";
import Rating from '@mui/material/Rating';

export default function ReviewRatings( {rat1, rat2, rat3} ) {
    
    return (
        <div className='review-ratings'>
            <h2>Ratings</h2>
            <h4>Overall</h4>
            <Rating name="half-rating" precision={0.1} size='large' onChange={rat1}/>
            <h4>Price</h4>
            <Rating name="half-rating" precision={0.1} size='large' onChange={rat2}/>
            <h4>Security</h4>
            <Rating name="half-rating" precision={0.1} size='large' onChange={rat3}/>
        </div>
    )
}