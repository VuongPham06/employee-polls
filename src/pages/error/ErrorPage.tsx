import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, Navigate, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Status } from '../../api/api-response.ts';
import { Nav } from '../../components/Nav.tsx';
import { selectAuthedUser } from '../../redux/slices/auth-slice.ts';

export const ErrorPage = () => {
  const auth = useSelector(selectAuthedUser);
  const route = auth.status === Status.SUCCESS ? '/' : '/login';
  const redirectText = auth.status === Status.SUCCESS ? 'Go back home' : 'Go to login page';

  const [timer, setTimer] = useState(5);
  setTimeout(() => setTimer(timer - 1), 1000);

  if (timer === 0) {
    return <Navigate to={route} />;
  }

  return (
    <>
      {auth.status === Status.SUCCESS && <Nav />}
      <Box
        display="flex"
        flexDirection="column"
        textAlign="center"
        alignItems="center"
        justifyContent="center">
        <Typography variant="h1" mt={10}>
          Oops!
        </Typography>
        <Typography variant="body1" mb={3}>
          Sorry, an unexpected error has occurred.
        </Typography>
        <ErrorBoundary />

        <Typography variant="body1" mt={2}>
          <Link to={route}>{redirectText}</Link>
        </Typography>

        <Typography variant="body1" mt={2}>
          or You will be redirected in {timer} ...
        </Typography>
      </Box>
    </>
  );
};

const ErrorMessage = (props: { message: string }) => {
  return (
    <>
      <Typography variant="h6" color="#888">
        {props.message}
      </Typography>
    </>
  );
};

const ErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <ErrorMessage message={error.statusText} />;
  }

  return <></>;
};
