import React from 'react';
import styles from './Footer.module.scss';
import rss from '../../assets/icons/rss.svg';
import github from '../../assets/icons/github.svg';

const Footer = () => {
  return (
    <footer>
      <svg
        enableBackground={'false'}
        viewBox="-168.36 0 1440.621 321.88"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <defs></defs>
        <path
          d="M 1271.274 81.626 C 1081.524 81.626 994.504 251.751 854.194 251.751 C 633.452 251.751 617.087 106.674 430.818 106.674 C 259.868 106.674 244.897 162.833 144.276 162.833 C 43.656 162.833 52.36 57.535 -168.726 57.535 L -168.726 322.535 L 1271.274 322.535 L 1271.274 81.626 Z"
          fill="#B6DBD2"
        ></path>
        <path
          d="M -138.833 234.259 C -278.945 234.259 134.27 234.259 -138.833 234.259 C 6.359 211.201 11.627 128.665 268.71 128.665 C 408.313 128.665 467.307 170.604 581.228 170.604 C 695.148 170.604 809.506 60.535 942.244 60.535 C 1068.624 60.535 1099.464 119.368 1266.274 119.368 L 1266.274 283.534 L -138.833 283.535 L -138.833 234.259 Z"
          fill="#7EC3B0"
        ></path>
        <path
          d="M 257.526 163.501 C 128.755 198.395 -31.743 211.983 -168.726 135.09 L -168.726 322.535 L 1271.274 322.535 L 1271.274 108.535 L 1270.414 109.044 C 1201.374 150.116 1098.214 211.475 948.784 163.501 C 798.739 115.327 778.21 230.681 660.636 185.735 C 543.063 140.788 386.297 128.606 257.526 163.501 Z"
          fill="#153C3C"
        ></path>
      </svg>
      <div className={styles.wrapper}>
        <div className={styles.footer}>
          <div>
            <a
              className={styles['footer__rss-link']}
              href="https://rs.school/js/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={rss} alt="rss logo" />
            </a>
          </div>
          <a
            className={styles['footer__github-link']}
            href="https://github.com/alexOm98"
            target="_blank"
            rel="noreferrer"
          >
            <img src={github} alt="github logo" />
            <span>Alexander Omelchuk</span>
          </a>
          <a
            className={styles['footer__github-link']}
            href="https://github.com/OrangeJazz"
            target="_blank"
            rel="noreferrer"
          >
            <img src={github} alt="github logo" />
            <span>Mariya Vasileva</span>
          </a>
          <a
            className={styles['footer__github-link']}
            href="https://github.com/Lneer"
            target="_blank"
            rel="noreferrer"
          >
            <img src={github} alt="github logo" />
            <span>Aleksei Pepeliaev</span>
          </a>
        </div>
        <div className={styles.footer__copyrigth}>© 2022 RS School. All Rights Reserved.</div>
      </div>
    </footer>
  );
};
export default Footer;
