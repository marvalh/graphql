import { useState, useEffect } from 'react';
import LoginPage from './components/login/loginPage';
import ProfilePage from './components/profile/profilePage';
import { isAuthenticated } from './api/auth';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    isAuthenticated().then((valid) => {
      setLoggedIn(valid);
      setChecking(false);
    });
  }, []);

  if (checking) {
    return <p>Loading...</p>;
  }

  if (!loggedIn) {
    return <LoginPage onLoginSuccess={() => setLoggedIn(true)} />;
  }

  return <ProfilePage onLogout={() => setLoggedIn(false)} />;
}

export default App;