import './PostReviewPage.css';
import * as React from 'react';
import * as Mui from '@mui/material';
import ReviewRatings from './ReviewRatings';
import ReviewInput from './ReviewInput';
import { ReviewPageURL } from '../utils/utils';
import { submitReview } from '../api/reviewapi';

export default function PostReview({ aptid, username }) {
  const [overallValue, setOverallValue] = React.useState(0);
  const [priceValue, setPriceValue] = React.useState(0);
  const [securityValue, setSecurityValue] = React.useState(0);
  const [text, setText] = React.useState('');

  const handleOverallChange = (e, newValue) => {
    setOverallValue(newValue);
  };
  const handlePriceChange = (e, newValue) => {
    setPriceValue(newValue);
  };
  const handleSecurityChange = (e, newValue) => {
    setSecurityValue(newValue);
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmitReview = () => {
    submitReview(
      aptid,
      username,
      overallValue,
      priceValue,
      securityValue,
      text
    );
    window.location.href = ReviewPageURL;
  };

  return (
    <div>
      <div className="post-review-page">
        <ReviewRatings
          rat1={handleOverallChange}
          rat2={handlePriceChange}
          rat3={handleSecurityChange}
        />
        <ReviewInput func1={handleTextChange} />
      </div>
      <div className="review-buttons">
        <Mui.Button variant="contained" size="large">
          Cancel
        </Mui.Button>
        <span style={{ margin: '40px' }} />
        <Mui.Button
          variant="contained"
          size="large"
          onClick={handleSubmitReview}
        >
          Post
        </Mui.Button>
      </div>
    </div>
  );
  /**
     * <Routes>
          <Route path={reviewURL/aptid} element={<ReviewView aptid={aptid} />}/>
       </Routes>
     */
}
