import React from 'react';

import { useGlobal } from '../../providers/globalProvider';
// import { useMap } from '../../providers/mapProvider';
import styles from '../../styles/map/mapSidePanel.module.css';

function MapSidePanel({ children, className }) {
  // const { resetMapEvents } = useMap();
  const { isMobile } = useGlobal();

  return (
    <div
      className={
        styles.primaryStyle +
        (isMobile ? ' fullscreenMobile' : '') +
        ' ' +
        className
      }
    >
      <div className={styles.header}>
        {/* <img
          className={styles.close}
          onClick={() => resetMapEvents()}
          src={'/assets/images/icons/close.svg'}
        /> */}
      </div>
      {children}
    </div>
  );
}

export default MapSidePanel;
