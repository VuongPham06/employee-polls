import { Box, Stack, Typography } from '@mui/material';
import { LoginForm } from './components/LoginForm.tsx';
import logo from '../../assets/react.svg';

export const LoginPage = () => {
  return (
    <Box justifyContent="center" display="flex" mt={2}>
      <Stack sx={{ width: '500px' }} spacing={3} component="form" style={{ textAlign: 'center' }}>
        <Typography variant="h4" mt={2} fontWeight="bolder">
          Employee Polls
        </Typography>

        <img
          src={logo}
          alt="login logo"
          style={{
            borderRadius: '100%',
            height: 150,
            width: 150,
            margin: 'auto'
          }}
        />

        <Typography variant="h5" mt={2} fontWeight="bolder" aria-label="log-in-page-title">
          Log In
        </Typography>
        <LoginForm />
      </Stack>
    </Box>
  );
};
