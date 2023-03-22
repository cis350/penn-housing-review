import CommentIcon from '@mui/icons-material/Comment';



export default function LikeButton( {comments} ) {
    const handleComment = (event) => {
        event.preventDefault();
    }

    return (
        <div>
            <span className='postButtom'>
                <a href="#" onClick={handleComment}>
                    <CommentIcon fontSize="medium"/>
                </a>
                &nbsp;
                {comments.length}
              </span>
        </div>
    );
}


