import { NavLink, Outlet, useNavigate } from 'react-router';
import './App.css';
import Button from '@mui/material/Button';
import { useAuth } from './context/AuthContext';

function App() {
  const { authUser, logout, isLogin, setIsLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate('/login');
  };

  const handleSignUp = () => {
    logout();
    setIsLogin(false);
  };

  return (
    <>
      <nav className="nav">
        {isLogin ? (
          <Button variant="contained" onClick={handleLogOut}>
            Log Out
          </Button>
        ) : (
          <>
            <NavLink to="register">
              <Button variant="contained" onClick={handleSignUp}>
                Sign Up
              </Button>
            </NavLink>

            <NavLink to="login">
              <Button variant="contained">Login</Button>
            </NavLink>
          </>
        )}
      </nav>

      {isLogin && authUser && (
        <p>Congratulations {authUser.username}</p>
      )}

      <Outlet />
    </>
  );
}

export default App;
