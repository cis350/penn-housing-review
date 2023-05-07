import './PostReviewPage.css';
import * as React from 'react';
import Header from './Header';
import PostReview from './PostReview';

function PostReviewPage({ aptid }) {
  return (
    <div>
      <Header />
      <h1 className="post-title">Post a Review</h1>
      <PostReview aptid={aptid} username={localStorage.getItem('username')} />
    </div>
  );
}

export default PostReviewPage;
