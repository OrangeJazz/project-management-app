import { useAppSelector } from 'hooks';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const LogOutUserRoutes = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return !isLoggedIn ? <Navigate to="/signin" /> : <Outlet />;
};
export default LogOutUserRoutes;
