import React from 'react';
import { Button } from 'antd';
import styles from './HeaderButtons.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks';
import { handleLogOut } from 'store/authSlice';
import { Select, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import BurgerMenu from 'components/BurgerMenu/BurgerMenu';
export const handleChangeLang = (value: string) => {
  localStorage.setItem('lang', value);
};

const HeaderButtons = () => {
  const dispath = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const { Option } = Select;
  const navigate = useNavigate();

  return (
    <div className={styles['btns-wrapper']}>
      <div className={styles.btns}>
        <Spin
          spinning={loading}
          size="large"
          style={{
            position: 'fixed',
            top: '44%',
            left: '53%',
            zIndex: '100',
            transform: 'translate(-50%,-50%)',
          }}
        />
        {isLoggedIn ? (
          <>
            <Button onClick={() => navigate('/profile')} type="default">
              Edit Profile
            </Button>
            <Button onClick={() => dispath(handleLogOut())} type="primary">
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => navigate('/signin')} type="default">
              Sign In
            </Button>
            <Button onClick={() => navigate('/signup')} type="primary">
              Sign Up
            </Button>
          </>
        )}
      </div>
      <Select
        defaultValue="EN"
        onChange={handleChangeLang}
        suffixIcon={<img src="./assets/icons/language.svg" />}
        style={{ width: '70px', margin: 'auto 0' }}
      >
        <Option value="EN">EN</Option>
        <Option value="RU">RU</Option>
      </Select>
      <BurgerMenu />
    </div>
  );
};
export default HeaderButtons;
