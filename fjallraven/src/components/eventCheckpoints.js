import React from 'react';

import { useMap } from '../providers/mapProvider';
import styles from '../styles/eventCheckpoints.module.css';

const EventCheckpoints = ({ checkpoints, index }) => {
  const { setRenderPathTraceIndex } = useMap();

  return (
    <div className="card-body-1" key={checkpoints.id}>
      <h5
        className={styles.cardTitle}
        onClick={() => setRenderPathTraceIndex(index + 1)}
      >
        <img alt={''} src="/assets/images/locationPin.svg" width="20px" />{' '}
        {checkpoints.title}
      </h5>
    </div>
  );
};

export default EventCheckpoints;
