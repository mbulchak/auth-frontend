import App from './App.tsx';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Register } from './pages/Register/Register.tsx';
import { Login } from './pages/Login/Login.tsx';
import { AuthComponent } from './components/Auth/Auth.tsx';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="auth" element={<AuthComponent />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />

        <Route path="*" element={<p>Page is not found</p>} />
      </Route>
      <Route path="*" element={<p>Page is not found</p>} />
    </Routes>
  </HashRouter>
);
