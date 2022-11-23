import React from 'react';
import styles from './AboutUs.module.scss';
import { MainCard } from 'components';

const AboutUs = () => {
  return (
    <div className={styles.about}>
      <div className={styles.about__container}>
        <h3 className={styles.about__heading}>Our Team</h3>
        <div className={styles.about__cards}>
          <MainCard />
          <MainCard />
          <MainCard />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
