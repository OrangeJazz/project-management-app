import { Button, Dropdown, Space } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { handleLogOut } from 'store/authSlice';

const BurgerMenu = () => {
  const dispath = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const itemsLoggedIn = [
    {
      label: <NavLink to={'/boards'}>Boards</NavLink>,
      key: 'item-1',
    },
    {
      label: <NavLink to={'/profile'}>Edit Profile</NavLink>,
      key: 'item-2',
    },
    {
      label: <Button onClick={() => dispath(handleLogOut())}>Sign Out</Button>,
      key: 'item-3',
    },
    {
      label: (
        <Button type="primary" onClick={() => navigate('/boards')}>
          &#43; Board
        </Button>
      ),
      key: 'item-4',
    },
  ];
  const itemsNotLoggedIn = [
    {
      label: (
        <Button type="default" onClick={() => navigate('/signin')}>
          Sign In
        </Button>
      ),
      key: 'item-5',
    },
    {
      label: (
        <Button type="primary" onClick={() => navigate('/signup')}>
          Sign Up
        </Button>
      ),
      key: 'item-6',
    },
  ];
  const items = isLoggedIn ? itemsLoggedIn : itemsNotLoggedIn;
  return (
    <Dropdown placement="bottom" menu={{ items }} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        <img src="./assets/icons/down.svg" />
      </a>
    </Dropdown>
  );
};

export default BurgerMenu;
