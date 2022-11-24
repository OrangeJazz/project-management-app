import { useAppSelector } from 'hooks';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const LogOutUserRoutes = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const loading = useAppSelector((state) => state.auth.loading);
  return !isLoggedIn && loading === false ? <Navigate to="/signin" /> : <Outlet />;
};
export default LogOutUserRoutes;
