import { React, useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { getAllCommentsByPostId, addNewComment } from '../api/FBMainAPI';
import LikeButton from './FBCommentLikeButtom';

export default function CommentSection({ pid }) {
  const [commentsData, setCommentsData] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    async function getAllCommentsByPostIdWrapper() {
      const allData = await getAllCommentsByPostId(pid);
      setCommentsData(allData);
    }
    getAllCommentsByPostIdWrapper();
    console.log('commentsData in comment section', commentsData);
  }, [newComment]);

  const handleChangeContent = (event) => {
    setNewComment(event.target.value);
  };

  const handleCreateComment = () => {
    addNewComment(pid, newComment);
    setNewComment('');
  };

  return (
    <div>
      <div className="writeComment">
        <TextField
          style={{
            borderRadius: 35,
            width: '87%',
            color: 'rgba(117, 137, 122, 0.7)',
            padding: '10px 0px'
          }}
          size="small"
          id="full-width-text-field"
          variant="outlined"
          color="success"
          data-testid="content"
          placeholder="Share your thoughts..."
          multiline
          rows={1}
          value={newComment}
          onChange={handleChangeContent}
        />
        <div>&nbsp; &nbsp; &nbsp; &nbsp;</div>
        <Button
          variant="contained"
          onClick={handleCreateComment}
          data-testid="post-button"
        >
          Post
        </Button>
      </div>

      <div className="commentSection">
        {commentsData.map((comment) => (
          <div key={comment._id} className="oneComment">
            <p>{comment.content}</p>
            <LikeButton likes={comment.likes} cid={comment._id} />
          </div>
        ))}
      </div>
    </div>
  );
}
