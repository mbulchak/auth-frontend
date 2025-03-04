import { NavLink, Outlet, useNavigate } from 'react-router';
import './App.css';
import Button from '@mui/material/Button';
import Typography  from '@mui/material/Typography';
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
        <Typography align='center' color='string' variant='h5'>Congratulations {authUser.username}</Typography>
      )}

      <Outlet />
    </>
  );
}

export default App;
