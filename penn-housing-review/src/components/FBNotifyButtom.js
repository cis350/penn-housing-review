import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';


export default function LikeButton() {
    const handleNotify = (event) => {
        event.preventDefault();
    }

    return (
        <div>
            <span className='postButtom'>
                <a href="#" onClick={handleNotify}>
                    <NotificationsNoneIcon fontSize="medium"/>
                </a>

              </span>
        </div>
    );
}