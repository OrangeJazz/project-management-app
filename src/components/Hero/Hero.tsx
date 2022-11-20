import React from 'react';
import { NavLink } from 'react-router-dom';
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
            <NavLink to="/signin" className={styles['hero__button-primary']}>
              Start
            </NavLink>
            <a href="#features" className={styles['hero__button-secondary']}>
              Learn more &gt;
            </a>
          </div>
        </div>
        <div className={styles.hero__img}></div>
      </div>
    </div>
  );
};

export default Hero;
