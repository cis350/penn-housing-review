import logo from "../assets/logo2.png"
function LogoTitle() {
    return (
        <div className = "logo-title">
            <img src = {logo}/>
            <h1 className="main-title">Penn Housing Review</h1>
        </div>
    )
    
}

function Search() {
    return (
        <div className = "search-box">
        
            <input className="search" type="text" placeholder="Search for a place..." />
            
            <ul className="search-results">
                <li>Result 1</li>
                <li>Result 2</li>
                <li>Result 3</li>
                <li>Result 4</li>
            </ul>
        
        
        </div>
    )
    
    
}

function MainBody () {
    return (
        
        <div className = "main-body">
            <LogoTitle />
            <Search />
            
        </div>
        
    )
}

export default MainBody;