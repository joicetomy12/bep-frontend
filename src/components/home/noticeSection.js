import React from 'react';

import styles from '../../styles/home/noticeSection.module.css';
import Tagline from '../tagline';

const NoticeSection = ({ data }) => {
  return (
    <>
      {data && (
        <div className={styles.noticeSection}>
          <div className="container pt-4 text-center">
            <h2>{data.heading}</h2>
            <p>
              <Tagline tagline={data.tagline} />
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default NoticeSection;
