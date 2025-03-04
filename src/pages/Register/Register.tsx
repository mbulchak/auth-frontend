import { AuthComponent, TSignUpSchema } from '../../components/AuthComponent/AuthComponent';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Typography  from '@mui/material/Typography';

export const Register = () => {
  const navigate = useNavigate();
  const [errorRegister, setErrorRegister] = useState('');

  const onSubmit = async (data: TSignUpSchema) => {
    await axios
      .post('http://localhost:5000/api/v1/auth/register', {
        ...data,
      })
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        setErrorRegister(errorMessage)
      });
  };

  return (
    <>
    {errorRegister && (
        <Typography align='center' variant='h6' color='error'>{errorRegister}</Typography>
      )}

      <AuthComponent onSubmit={onSubmit} authTitle="Sign Up" />
    </>
  );
};
