import { useState } from "react";
import usePagination from '../utils/usePagination';
import { Box, Divider, List, Pagination } from "@mui/material";
import LikeButtom from './FBPostLikeButtom';
// import CommentButtom from './FBCommentButtom';
import NotifyButtom from './FBNotifyButtom';
import CommentSection from './FBCommentSection';
import CommentIcon from '@mui/icons-material/Comment';


export default function PostList( {data} ) {
  const [page, setPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(0);

  const PER_PAGE = 2;

  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  function CommentButtom( {comments, pid} ) {

    const handleComment = (event) => {
      if (selectedPost === pid) {
        setSelectedPost(0);
      } else {
        setSelectedPost(pid);
      }
    
    }

    return (
      <div>
        <span className='postButtom'>
          <a href="#" onClick={handleComment}>
              <CommentIcon fontSize="medium" data-testid="comment-icon"/>
          </a>
          &nbsp;
          {comments}
        </span>
      </div>
    );

  }


  function PostEntry( {pid, title, content, likes, comments} ) { // add an ID field
    return (
      <div className='postEntry'>
        <h3>{title}</h3>
        <p>{content}</p>
        <div className='postEle'>
          <LikeButtom likes={likes} pid={pid} />
          <CommentButtom comments={comments} pid={pid}/>
          <NotifyButtom />
        </div>        
      </div>
    )
      
  }

  


  return (
    <Box p="5" data-testid="post-list-box">
      <List>
        {_DATA.currentData().map(v => {
          return (
            <div key={v.pid}>
              <PostEntry 
                pid={v.pid}
                title={v.title} 
                content={v.content} 
                likes={v.likes} 
                comments={v.comments}
                />
              {selectedPost === v.pid && (
                <CommentSection comments={v.comments} pid={v.pid}/>
              )}
              <Divider className="postDiv"/>
            </div>
          );
        })}
      </List>
      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </Box>
  );
}