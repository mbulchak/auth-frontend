import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import './AuthComponent.scss';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Outlet } from 'react-router';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

const signUpSchema = z.object({
  username: z
    .string()
    .min(2, 'User must be at least 2 characters')
    .max(40, 'User name is too long'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(40, 'Name is too long'),
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

  return (
    <>
      <SignInContainer
        className="sign--in__container"
        direction="column"
        justifyContent="space-between"
      >
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            {authTitle}
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="userName">User name</FormLabel>

              <TextField
                id="userName"
                type="text"
                {...register('username')}
                fullWidth
                placeholder="John Green"
              />

              {errors.username && (
                <Typography color="error">{`${errors.username.message}`}</Typography>
              )}
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>

              <TextField
                id="name"
                type="text"
                {...register('name')}
                fullWidth
                placeholder="John Green"
              />

              {errors.name && <Typography color="error">{`${errors.name.message}`}</Typography>}
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>

              <TextField
                id="password"
                type="password"
                {...register('password')}
                fullWidth
                placeholder="example@.com"
              />

              {errors.password && (
                <Typography color="error">{`${errors.password.message}`}</Typography>
              )}
            </FormControl>

            <Button disabled={isSubmitting} type="submit" variant="contained">
              {authTitle}
            </Button>
          </Box>
        </Card>
      </SignInContainer>

      <Outlet />
    </>
  );
};
