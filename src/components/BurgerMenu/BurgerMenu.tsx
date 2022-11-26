import { Button, Dropdown } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { handleLogOut } from 'store/authSlice';
import { useTranslation } from 'react-i18next';

const BurgerMenu = () => {
  const dispath = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const itemsLoggedIn = [
    {
      label: <NavLink to={'/boards'}>{t('header.boards')}</NavLink>,
      key: 'item-1',
    },
    {
      label: <NavLink to={'/profile'}>{t('header.edit')}</NavLink>,
      key: 'item-2',
    },
    {
      label: (
        <Button
          onClick={() => {
            navigate('/');
            dispath(handleLogOut());
          }}
        >
          {t('header.signout')}
        </Button>
      ),
      key: 'item-3',
    },
    {
      label: (
        <Button type="primary" onClick={() => navigate('/boards')}>
          {t('header.create')}
        </Button>
      ),
      key: 'item-4',
    },
  ];
  const itemsNotLoggedIn = [
    {
      label: (
        <Button type="default" onClick={() => navigate('/signin')}>
          {t('header.signin')}
        </Button>
      ),
      key: 'item-5',
    },
    {
      label: (
        <Button type="primary" onClick={() => navigate('/signup')}>
          {t('header.signoup')}
        </Button>
      ),
      key: 'item-6',
    },
  ];
  const items = isLoggedIn ? itemsLoggedIn : itemsNotLoggedIn;
  return (
    <Dropdown placement="bottomRight" menu={{ items }} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        <img src="./assets/icons/down.svg" />
      </a>
    </Dropdown>
  );
};

export default BurgerMenu;
