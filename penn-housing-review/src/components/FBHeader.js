import '../FBHeader.css';
import logo from '../assets/logowhite.png';

  function Logo() {
    return (
      <a href="/post-review" className="logo">
        <img src={logo} alt='logo' width="50" height="50"/>
      </a>
    )
  }
  
  
  function Profile({ username }) {
    return <a href="/user" className="profile">Welcome, {username}</a>;
  }

  export default function Header({title}) {
    return (
      <header className='fb-header'>
        <Logo />
        
        <h1 className='fb-title'>{title}</h1>

        <Profile username='username'/>
      </header>
    )
  }