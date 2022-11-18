/* eslint-disable react-hooks/exhaustive-deps */
import { Layout } from 'components';
import {
  BoardsPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  RegistrationPage,
  SearchPage,
  SingInPage,
  SingUpPage,
} from 'pages';
import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from 'hooks';
import { handleInitialRenderLogIn } from 'store/authSlice';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';

function App() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  axios.defaults.baseURL = 'https://react-final-task.up.railway.app';
  useEffect(() => {
    const token = localStorage.getItem('token') as string;
    const id = localStorage.getItem('id') as string;
    if (token) {
      dispatch(handleInitialRenderLogIn({ token: token, id: id }));
      if (!isLoggedIn) navigate('/');
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/signin" element={<SingInPage />} />
          <Route path="/signup" element={<SingUpPage />} />
        </Route>
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/boards:id" element={<BoardsPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
