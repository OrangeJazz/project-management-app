import { AboutUs, Features, Hero } from 'components';
import React from 'react';
import styles from './MainPage.module.scss';

const MainPage = () => {
  return (
    <div className={styles.maindsds}>
      <Hero />
      <Features />
      <AboutUs />
    </div>
  );
};

export default MainPage;
