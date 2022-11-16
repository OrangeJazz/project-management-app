import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles['footter__year-link']}>
        <p>© 2022</p>
      </div>
      <a
        className={styles['footer__github-link']}
        href="https://github.com/alexOm98"
        target="_blank"
        rel="noreferrer"
      >
        Alexander Omelchuk
      </a>
      <a
        className={styles['footer__rss-link']}
        href="https://rs.school/js/"
        target="_blank"
        rel="noreferrer"
      >
        <img src="assets/rs_school.svg" alt="rss school" />
      </a>
    </footer>
  );
};
export default Footer;
