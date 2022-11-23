import { StartBtn } from 'components';
import React from 'react';
import styles from './Hero.module.scss';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.hero__container}>
        <div className={styles.hero__content}>
          <h2 className={styles.hero__heading}>Best helper for organize your work</h2>
          <div className={styles.hero__text}>
            <p>
              RS Task is a simple application gives teams everything they need to stay in sync, hit
              deadlines, and reach their goals. It is adaptable, flexible tool for planning and
              tracking work.
            </p>
            <p>Organize your work in different wonderful projects with RS Task!</p>
          </div>
          <div className={styles.hero__buttons}>
            <StartBtn title="Start" link="/signin" type="primary" />
            <StartBtn title="Learn more &gt;" link="#features" type="secondary" />
          </div>
        </div>
        <div className={styles.hero__img}></div>
      </div>
    </div>
  );
};

export default Hero;
