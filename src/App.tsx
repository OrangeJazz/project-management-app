import { Layout } from 'components';
import {
  BoardsPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  RegistrationPage,
  SearchPage,
  SingInPage,
} from 'pages';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<SingInPage />} />
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
