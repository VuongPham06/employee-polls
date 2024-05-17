import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../redux/store.ts';
import { useEffect } from 'react';
import { fetchUsers } from '../redux/slices/users-slice.ts';

export default function AuthenticatedLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <>
      <div id="user-page">
        <Outlet />
      </div>
    </>
  );
}
