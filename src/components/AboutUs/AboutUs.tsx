import React from 'react';
import styles from './AboutUs.module.scss';
import { MainCard } from 'components';
import { ABOUT_CARDS } from '../../store/data';

const AboutUs = () => {
  return (
    <div className={styles.about}>
      <div className={styles.about__container}>
        <h3 className={styles.about__heading}>Our Team</h3>
        <div className={styles.about__cards}>
          <MainCard
            type="about"
            title={ABOUT_CARDS[0].title}
            subtitle={ABOUT_CARDS[0].subtitle}
            text={ABOUT_CARDS[0].text}
            img={ABOUT_CARDS[0].img}
          />
          <MainCard
            type="about"
            title={ABOUT_CARDS[1].title}
            subtitle={ABOUT_CARDS[1].subtitle}
            text={ABOUT_CARDS[1].text}
            img={ABOUT_CARDS[1].img}
          />
          <MainCard
            type="about"
            title={ABOUT_CARDS[2].title}
            subtitle={ABOUT_CARDS[2].subtitle}
            text={ABOUT_CARDS[2].text}
            img={ABOUT_CARDS[2].img}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
