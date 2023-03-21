


function Profile ({username}) {
    return <a href="/user" className="profile header-button">welcome, {username}</a>
}

function ForYou () {
    return <a href="/foryou" className="foryou header-button">for you</a>
}

function ForumBoard() {
    return <a href="/forumBoard" className="forumBoard header-button">forum</a>
}


function MainHeader({username}) {
    return (
        <header className="header">
            <div className = "button-right">
                <Profile username = "username"/>
            </div>
            <div className = "button-left">
                <ForYou />
                <ForumBoard />
            </div>
        </header>
    )
}


export default MainHeader;