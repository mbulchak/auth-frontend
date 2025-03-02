import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import './auth.scss';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import { Outlet } from 'react-router';

const signUpSchema = z.object({
  username: z.string().min(2, 'User name is required').max(40, 'User name is too long'),
  name: z.string().min(2, 'Name is required').max(40, 'Name is too long'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password is too long'),
});

type TSignUpSchema = z.infer<typeof signUpSchema>;

export const AuthComponent = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  console.log('Now I am at auth');

  const onSubmit = async (data: TSignUpSchema) => {
    console.log(data);
    // here i need to sumbit to server

    await axios
      .post('http://localhost:5000/api/v1/auth/register', {
        ...data,
      })
      .then((response) => console.log('response', response))
      .catch((error) => console.log(error));

    reset();
  };

  /* const dd = axios.post('http://localhost:5000/api/v1/auth/login', {
    username: 'ff',
    name: 'kam',
    password: '13412344321',
  }); */

  return (
    <>
      <div className="auth__component">
        <Button variant="contained" onClick={() => setOpenAuthModal(true)}>
          Sign Up
        </Button>

        {openAuthModal && (
          <div className="auth__form">
            <form onSubmit={handleSubmit(onSubmit)} className="auth__form">
              <label>FullName</label>
              <input type="text" {...register('username')} />
              {errors.username && <p>{`${errors.username.message}`}</p>}

              <label>Name</label>
              <input type="text" {...register('name')} />
              {errors.name && <p>{`${errors.name.message}`}</p>}

              <label>Password</label>
              <input type="password" {...register('password')} />
              {errors.password && <p>{`${errors.password.message}`}</p>}

              <input disabled={isSubmitting} type="submit" />
            </form>
          </div>
        )}
      </div>

      <Outlet />
    </>
  );
};
