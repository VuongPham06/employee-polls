import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Status } from '../api/api-response.ts';
import { selectAuthedUser } from '../redux/slices/auth-slice.ts';

export const PublicRoute = ({ children }: { children: ReactElement }) => {
  const auth = useSelector(selectAuthedUser);
  if (auth.status === Status.SUCCESS) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
