import '../FBHeader.css';
import logo from '../logowhite.png';

  function Logo() {
    return (
      <a href="/post-review" className="logo">
        <img src={logo} alt='logo' width="50" height="50"/>
      </a>
    )
  }
  
  function SearchBar() {
    return <input type="text" placeholder="Search for a post" className='search-bar' />;
  }
  
  function Profile({ username }) {
    return <a href="/user" className="profile">Welcome, {username}</a>;
  }

  export default function Header() {
    return (
      <header className='header'>
        <Logo />
        <h1 className='title'>Forum Board</h1>
        <SearchBar />
        <Profile username='username'/>
      </header>
    )
  }