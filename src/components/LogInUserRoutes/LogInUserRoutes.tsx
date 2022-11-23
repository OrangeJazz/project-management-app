import { useAppSelector } from 'hooks';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const LogInUserRoutes = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};
export default LogInUserRoutes;
