import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import styles from './Header.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks';
import { handleLogOut } from 'store/authSlice';

const Header = () => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const dispath = useAppDispatch();
  const login = useAppSelector((state) => state.auth.login);
  const checkSrolling = () => {
    if (window.scrollY < 73) {
      return setIsScrolling(false);
    } else if (window.scrollY > 70) {
      return setIsScrolling(true);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', checkSrolling);
    return () => window.removeEventListener('scroll', checkSrolling);
  }, []);
  return (
    <header className={`${isScrolling ? `${styles['scroll-header']}` : ''} ${styles.header} `}>
      <nav className={styles.nav}>
        <NavLink to="/" end className={({ isActive }) => (isActive ? styles.isActive : '')}>
          Home
        </NavLink>
        <NavLink to="/signin" className={({ isActive }) => (isActive ? styles.isActive : '')}>
          Signin
        </NavLink>
      </nav>
      <p>{login}</p>
      <Button onClick={() => dispath(handleLogOut)} type="primary">
        Выйти
      </Button>
    </header>
  );
};
export default Header;
