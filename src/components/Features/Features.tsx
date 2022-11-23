import React from 'react';
import styles from './Features.module.scss';
import { MainCard, StartBtn } from 'components';

const Features = () => {
  return (
    <div className={styles.features}>
      <div className={styles.features__container}>
        <h3 className={styles.features__heading}>Save your time with RS Task</h3>
        <div className={styles.features__cards}>
          <MainCard />
          <MainCard />
          <MainCard />
        </div>
        <StartBtn title="Start" link="/signin" type="primary" />
      </div>
    </div>
  );
};

export default Features;
