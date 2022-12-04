import React from 'react';
import styles from './Features.module.scss';
import { MainCard, StartBtn } from 'components';
import { FEATURES_CARDS } from '../../store/data';

const Features = () => {
  return (
    <section className={styles.features}>
      <div className={styles.features__container}>
        <h3 className={styles.features__heading} id="features">
          Save your time with RS Task
        </h3>
        <div className={styles.features__cards}>
          <MainCard
            type="features"
            title={FEATURES_CARDS[0].title}
            text={FEATURES_CARDS[0].text}
            img={FEATURES_CARDS[0].img}
          />
          <MainCard
            type="features"
            title={FEATURES_CARDS[1].title}
            text={FEATURES_CARDS[1].text}
            img={FEATURES_CARDS[1].img}
          />
          <MainCard
            type="features"
            title={FEATURES_CARDS[2].title}
            text={FEATURES_CARDS[2].text}
            img={FEATURES_CARDS[2].img}
          />
        </div>
        <StartBtn title="Start" link="/signin" type="primary" />
      </div>
    </section>
  );
};

export default Features;
