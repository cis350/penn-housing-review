import CommentIcon from '@mui/icons-material/Comment';

export default function CommentButton( {comments} ) {
    const handleComment = (event) => {
        event.preventDefault();
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


