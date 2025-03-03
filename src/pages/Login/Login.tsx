import { AuthComponent, TSignUpSchema } from '../../components/Auth/Auth';
import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

export const Login = () => {
  const [errorLogin, setErrorLogin] = useState('');
  const {login, setIsLogin} = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data: TSignUpSchema) => {
    console.log(data);

    await axios
      .post('http://localhost:5000/api/v1/auth/login', {
        ...data,
      })
      .then((response) => {
        console.log('response', response);
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
        <p className='error'>{errorLogin}</p>
      )}

      <AuthComponent onSubmit={onSubmit} authTitle="Login" />
    </>
  );
};
