import './PostReviewPage.css';
import * as React from "react";
import Header from "./Header";
import PostReview from "./PostReview";

function PostReviewPage( {aptid, username} ) {
    return (
        <div>
            <Header />
            <h1 className='post-title'>Post a Review</h1>
            <PostReview aptid={aptid} username={username} />
        </div>
    )
}

export default PostReviewPage;