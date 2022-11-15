import Footer from 'components/Footer';
import Header from 'components/Header';
import React from 'react';
// import style from './Layout.module.scss';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
