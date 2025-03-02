import { Navigate, NavLink, Outlet } from 'react-router';
import './App.css';
import Button from '@mui/material/Button';

function App() {
  return (
    <>
      <nav className="nav">
        <NavLink to="register">
          <Button variant="contained">Sign Up</Button>
        </NavLink>

        <NavLink to="login">
          <Button variant="contained" onClick={() => <Navigate to="/login" />}>
            Login
          </Button>
        </NavLink>
      </nav>

      <Outlet />
    </>
  );
}

export default App;
