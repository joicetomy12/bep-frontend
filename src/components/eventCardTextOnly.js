import React from 'react';

import styles from '../styles/eventCardTextOnly.module.css';
import { ChevronRight } from './icons';

const EventCardTextOnly = ({ event }) => {
  return (
    <div key={event.id} className={styles.FeatureCard}>
      <div className={styles.cardBackgroundImage}>
        {/* <div className={styles.sustainability}>
          <span>SUSTAINABILITY</span>
        </div> */}
      </div>
      <div className={styles.cardAbout}>
        <div className={styles.cardTitle}>{event.eventTitle}</div>
        <div className={styles.addresCard}>
          <div>
            <img
              src="/assets/images/featuresSection/addressIcon.svg"
              width="24px"
              alt=""
            />
          </div>
          <div className={styles.location}>
            {event.address}
            <br />
            {event.date}, {event.time}
          </div>
        </div>
        <button type="button" className={styles.goToEvent}>
          {event.goToEvent}
          <div className={styles.chevronRightIcon}>
            <ChevronRight />
          </div>
        </button>
      </div>
    </div>
  );
};

export default EventCardTextOnly;
