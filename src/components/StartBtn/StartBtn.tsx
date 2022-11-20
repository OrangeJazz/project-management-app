import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './StartBtn.module.scss';

interface StartBtnProps {
  title: string;
  type: string;
  link: string;
}

const StartBtn: React.FC<StartBtnProps> = ({ title, type, link }) => {
  return (
    <NavLink to={link} className={styles[`start-btn__${type}`]}>
      {title}
    </NavLink>
  );
};

export default StartBtn;
