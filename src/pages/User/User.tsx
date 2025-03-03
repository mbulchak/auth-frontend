import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const User = () => {
  const { authUser } = useContext(AuthContext);

  console.log('authUser', authUser);

  return <>{authUser && <p>Hi {authUser.username}!</p>}</>;
};
