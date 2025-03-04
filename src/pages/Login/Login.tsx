import { AuthComponent, TSignUpSchema } from '../../components/AuthComponent/AuthComponent';
import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';

export const Login = () => {
  const [errorLogin, setErrorLogin] = useState('');
  const {login, setIsLogin} = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data: TSignUpSchema) => {
    await axios
      .post('http://localhost:5000/api/v1/auth/login', {
        ...data,
      })
      .then((response) => {
        const barerToken = response.data.accessToken;
        login(barerToken);
        setIsLogin(true);

        navigate('/');
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        setErrorLogin(errorMessage)
      });
  };

  return (
    <>
      {errorLogin && (
        <Typography align='center' variant='h6' color='error' >{errorLogin}</Typography>
      )}

      <AuthComponent onSubmit={onSubmit} authTitle="Login" />
    </>
  );
};
