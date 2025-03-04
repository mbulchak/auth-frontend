import { PropsWithChildren, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router';

type ProtectedRouteProps = PropsWithChildren;

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { authUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (authUser === null && location.pathname !== '/login' && location.pathname !== '/register') {
      navigate('/login', { replace: true });
    }

    if (authUser) {
      navigate('/', { replace: true });
    }
  }, [navigate, authUser]);

  return children;
};
