import React from 'react';
import { Button } from 'react-bootstrap';

import { useMap } from '../../providers/mapProvider';
import styles from '../../styles/map/mapFeatureCard.module.css';

const FeatureCard = ({ event }) => {
  const { setEventRouteActive } = useMap();

  return (
    <div className={`d-flex ${styles.card}`}>
      <div className={styles.cardImgTop}></div>
      <div className={`text-left pl-3 ${styles.cardBody}`}>
        <a href="/" className={styles.cardCloseBtn}>
          <img src="/assets/images/cross.svg" width="20px" alt={''} />
        </a>
        <h5 className={styles.cardTitle}>Featured Event</h5>
        <p className={styles.cardText}>A short description about the event.</p>
        <Button
          onClick={() => setEventRouteActive(event)}
          className={styles.cardButton}
        >
          <img
            src="/assets/images/navigator.svg"
            width="20px"
            alt={''}
            className={styles.cardButtonImg}
          />{' '}
          SHOW ON MAP
        </Button>
      </div>
    </div>
  );
};

export default FeatureCard;
