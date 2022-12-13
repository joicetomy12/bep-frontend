import { useRouter } from 'next/router';
import React from 'react';

import styles from '../styles/peopleTopBanner.module.css';

const BackButton = ({ href }) => {
  const router = useRouter();

  const back = e => {
    e.preventDefault();
    router.back();
  };

  return (
    <a href={href || '/'} className={styles.backArrow} onClick={back}>
      {' '}
      <img src="/assets/images/people/back.svg" alt="" />{' '}
    </a>
  );
};

export default BackButton;
