import './ReviewPage.css';
import * as React from 'react';
import * as Mui from '@mui/material';
import Filter from './Filter';
import ReviewList from './ReviewList';
import { getReviewsById } from '../api/reviewapi';
import { reviewPostURL } from '../utils/utils';

export default function ReviewView({ aptid }) {
  const [reviews, setReviews] = React.useState([]);
  React.useEffect(() => {
    getReviewsById(aptid).then((response) => setReviews(response.data));
  });
  return (
    <div className="review-view">
      <Filter />
      <Mui.Button variant="contained" className="post-review" color="success" href={reviewPostURL}>
        Post Review
      </Mui.Button>
      <ReviewList data={reviews} />
    </div>
  );
  /*
  <Routes>
      <Route path={reviewPostURL} elements={<PostReviewPage/>}/>
  </Routes>
  */
}
