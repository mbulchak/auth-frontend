import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import './auth.scss';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Outlet } from 'react-router';

const signUpSchema = z.object({
  username: z.string().min(2, 'User name is required').max(40, 'User name is too long'),
  name: z.string().min(2, 'Name is required').max(40, 'Name is too long'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password is too long'),
});

export type TSignUpSchema = z.infer<typeof signUpSchema>;

type Props = {
  onSubmit: (data: TSignUpSchema) => Promise<void>;
  authTitle?: string;
};

export const AuthComponent: React.FC<Props> = ({ onSubmit, authTitle = 'Auth' }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  console.log('Now I am at auth');

  return (
    <>
      <div className="auth__container">
        <div className="auth__component">
          <p className="auth__title">{authTitle}</p>

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
        </div>
      </div>

      <Outlet />
    </>
  );
};
