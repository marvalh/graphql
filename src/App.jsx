import { useState, useEffect } from 'react';
import LoginPage from './components/login/loginPage';
import ProfilePage from './components/profile/profilePage';
import { getToken } from './api/auth';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (getToken()) {
      setLoggedIn(true);
    }
  }, []);

  if (!loggedIn) {
    return <LoginPage onLoginSuccess={() => setLoggedIn(true)} />;
  }

  return <ProfilePage onLogout={() => setLoggedIn(false)} />;
}

export default App;