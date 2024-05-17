import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectAuthedUser, validateUser } from '../../../redux/slices/auth-slice.ts';
import { PasswordInput } from './PasswordInput.tsx';
import { useAppDispatch, useAppSelector } from '../../../redux/store.ts';
import { Status } from '../../../api/api-response.ts';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const auth = useAppSelector(selectAuthedUser);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const loading = auth.status === Status.LOADING;

  const buttonEnabled = Boolean(!loading && id && password);

  const errorMessage = auth.status === Status.FAILED ? 'Incorrect Employee ID or Password' : '';

  const handleUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await dispatch(validateUser({ id, password }));
    if (response.meta.requestStatus === 'fulfilled') {
      let from: string = location.state?.from?.pathname;
      if (!from) {
        from = '/';
      }
      navigate(from, { state: { from: location } });
    }
  };

  return (
    <>
      <TextField value={id} onChange={handleUserId} label="Employee ID" disabled={loading} />

      <PasswordInput password={password} setPassword={setPassword} disabled={loading} />

      <Button type="submit" variant="contained" onClick={handleLogin} disabled={!buttonEnabled}>
        {loading ? <CircularProgress data-testid="login-loading" /> : 'Log In'}
      </Button>

      {errorMessage && (
        <Typography fontSize={13} color="red">
          {errorMessage}
        </Typography>
      )}
    </>
  );
};
