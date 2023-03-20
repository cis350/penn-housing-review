import logo from "../logo.png"

function LogoName () {
    return (
        
        <div className = "main-body">
            <div className = "logo-title">
                <img src = {logo}/>
                <h1 className="main-title">Penn Housing Review</h1>
            </div>
            <div className = "search-box">
                
                <input className="search" type="text" placeholder="Search for a place..." />
                <ul class="search-results">
                    <li>Result 1</li>
                    <li>Result 2</li>
                    <li>Result 3</li>
                    <li>Result 4</li>
                </ul>
            </div>
            
        </div>
        
    )
}


export default LogoName