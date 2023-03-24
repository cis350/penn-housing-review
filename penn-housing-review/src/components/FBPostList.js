import { useState } from "react";
import usePagination from '../utils/usePagination';
import { Box, List, Pagination } from "@mui/material";
import LikeButtom from './FBLikeButtom';
import CommentButtom from './FBCommentButtom';
import NotifyButtom from './FBNotifyButtom';

export default function PostList( {i_posts} ) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  if (i_posts) {
    setData(i_posts);
  }

  const PER_PAGE = 2;

  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleComment = (event) => {
    event.preventDefault();
  }


  function PostEntry( {key, title, content, likes, commentLength} ) { // add an ID field
      return (
        <div className='postEntry'>
          <h3>{title}</h3>
          <p>{content}</p>
          <div className='postEle'>
            <LikeButtom likes={likes} pid={key} />
            <CommentButtom comments={commentLength} onClick={handleComment} />
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
            <PostEntry 
              key={v.pid}
              title={v.title} 
              content={v.content} 
              likes={v.likes} 
              commentLength={v.commentLength}/>
            
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