

function MainHeader() {
    return (
        <header className="header">
            <div className = "button-right">
                <div className="header-button">username, welcome</div>
            </div>
            <div className = "button-left">
                <div className="header-button" id = "for-you-btn">for you</div>
                <div className="header-button" id = "forum-btn">forum</div>
            </div>
        </header>
    )
}


export default MainHeader;