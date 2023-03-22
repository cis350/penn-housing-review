import logo from './logo.svg';
import './App.css';

import UserProfile from './components/UserProfile';
function App() {
  const username = 'JohnDoe';
  const posts = ['First post', 'Second post', 'Third post'];

  return (
     <div className="App">
      <UserProfile username={username} posts={posts} />
    </div>
  );
}

export default App;
