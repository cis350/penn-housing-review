import { getAllCommentsByPostId, createComment } from '../api/FBMainAPI';
import { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import LikeButton from './FBCommentLikeButtom';

export default function CommentSection( {pid, comments} ) {
    console.log("comments", pid);
    const [commentsData, setCommentsData] = useState([]);
    const [newComment, setNewComment] = useState("");
    

    useEffect(() => {
      async function getAllCommentsByPostIdWrapper() {
        const commentsData = await getAllCommentsByPostId(pid);
        setCommentsData(commentsData);
      }
      getAllCommentsByPostIdWrapper();
    }, [newComment]);

    const handleChangeContent = (event) => {
      setNewComment(event.target.value);
    }
    
    const handleCreateComment = () => {
      createComment(pid, newComment);
      setNewComment("");
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
            <div key={comment.id} className='oneComment'>
              <p>{comment.content}</p>
              <LikeButton likes={comment.likes} cid={comment.id} />
            </div>
          ))}
        </div>
      </div>
    )
}