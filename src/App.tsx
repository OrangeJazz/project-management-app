/* eslint-disable react-hooks/exhaustive-deps */
import { Layout, LogInUserRoutes, LogOutUserRoutes } from 'components';
import {
  BoardsPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  SearchPage,
  SingInPage,
  SingUpPage,
  TasksPage,
} from 'pages';
import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppDispatch } from 'hooks';
import { handleInitialRenderLogIn } from 'store/authSlice';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  axios.defaults.baseURL = 'https://react-final-task.up.railway.app';
  useEffect(() => {
    const token = localStorage.getItem('token') as string;
    const id = localStorage.getItem('id') as string;
    if (token) {
      dispatch(handleInitialRenderLogIn({ token: token, id: id }))
        .unwrap()
        .catch(() => {
          navigate('/');
        });
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route element={<LogInUserRoutes />}>
          <Route path="/signin" element={<SingInPage />} />
          <Route path="/signup" element={<SingUpPage />} />
        </Route>
        <Route element={<LogOutUserRoutes />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/boards" element={<BoardsPage />} />
          <Route path="/boards:id" element={<BoardsPage />} />
        </Route>
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
