import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Status } from '../api/api-response.ts';
import { Nav } from '../components/Nav.tsx';
import { selectAuthedUser } from '../redux/slices/auth-slice.ts';

export const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const auth = useSelector(selectAuthedUser);
  const location = useLocation();
  if (auth.status !== Status.SUCCESS) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return (
    <>
      <Nav />
      {children}
    </>
  );
};
