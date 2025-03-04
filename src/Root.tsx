import App from './App.tsx';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Register } from './pages/Register/Register.tsx';
import { Login } from './pages/Login/Login.tsx';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute.tsx';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<Navigate to="/" />} />
        <Route path="register" element={<Register />} />

        <Route path="login" element={<Login />} />
      </Route>

      <Route path="*" element={<p>Page is not found</p>} />
    </Routes>
  </HashRouter>
);
