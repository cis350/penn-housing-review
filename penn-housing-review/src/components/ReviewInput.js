import './PostReviewPage.css';
import * as React from 'react';

export default function ReviewInput({ func1 }) {
  return (
    <div className="review-input">
      <h2>Your Review</h2>
      <textarea className="text-field" onChange={func1} />
    </div>
  );
}
