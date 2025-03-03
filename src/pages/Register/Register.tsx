import { AuthComponent, TSignUpSchema } from '../../components/Auth/Auth';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const Register = () => {
  const navigate = useNavigate();
  const [errorRegister, setErrorRegister] = useState('');

  const onSubmit = async (data: TSignUpSchema) => {
    console.log(data);
    // here i need to sumbit to server

    await axios
      .post('http://localhost:5000/api/v1/auth/register', {
        ...data,
      })
      .then((response) => {
        console.log('response', response);
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
        <p className='error'>{errorRegister}</p>
      )}

      <AuthComponent onSubmit={onSubmit} authTitle="Register" />
    </>
  );
};
