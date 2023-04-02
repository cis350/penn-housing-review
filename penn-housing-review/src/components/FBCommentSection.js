import FBCommentLikeButton from './FBCommentLikeButton'
import { getAllCommentsByPostId, createComment, updateCommentLength } from '../api/FBMainAPI';
import { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';

export default function CommentSection( {pid, comments} ) {
    const [commentsData, setCommentsData] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
      async function getAllCommentsByPostIdWrapper() {
        const commentsData = await getAllCommentsByPostId(pid);
        setCommentsData(commentsData);
      }
      getAllCommentsByPostIdWrapper();
    }, []);

    const handleChangeContent = (event) => {
      setNewComment(event.target.value);
    }
    
    const handleCreateComment = () => {
      createComment(pid, newComment);
      setNewComment("");
      updateCommentLength(pid, comments + 1);
    }



    return (
      <div>
        <div className='writeComment'>
          <TextField 
            style={{
                borderRadius: 35,
                width: "87%",
                color: "rgba(117, 137, 122, 0.7)",
                padding: "10px 0px",
            }}
            size="small"
            id="full-width-text-field"
            variant="outlined" 
            color = "success"
            data-testid="content"
            placeholder = "Share your thoughts..."
            multiline
            rows={1}
            value={newComment}
            onChange = {handleChangeContent}
            />
            <div>
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
            </div>
            <Button 
            variant="contained" 
            onClick={handleCreateComment}>
              Post</Button>

        </div>

        <div className='commentSection'>
          {commentsData.map(comment => (
            <div key={comment.cid} className='oneComment'>
              <p>{comment.content}</p>
              <FBCommentLikeButton likes={comment.likes} cid={comment.cid} />
            </div>
          ))}
        </div>
      </div>
    )
  }