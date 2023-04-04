import './PostReviewPage.css';
import * as React from "react";
import Header from "./Header";
import PostReview from "./PostReview";

function PostReviewPage( {aptid, username} ) {
    return (
        <div>
            <Header />
            <h1 className='post-title'>Post a Review</h1>
            <PostReview aptid={1} username='Ken' />
        </div>
    )
}

export default PostReviewPage;