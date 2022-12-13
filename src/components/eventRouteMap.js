import React, { useEffect } from 'react';

import { useMap } from '../providers/mapProvider';
// import { CheckData } from '../staticData/checklistData';
import styles from '../styles/eventRouteMap.module.css';
// import EventCheckpoints from './eventCheckpoints';
import Map from './map/map';

const EventRouteMap = event => {
  const { setEventRouteActive } = useMap();

  useEffect(() => {
    setEventRouteActive(event && event.event ? event.event : event);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return (
    <div className="pb-5">
      <div className={`col-sm-12 pr-0 ${styles.mapContainer}`}>
        <Map singleEventRoute={true} />
      </div>
      {/*As of now we don't have the checkpoints data for the Cvent Events. Hence we hide this section*/}
      {/* <div className={`col-sm-5 pl-0 ${styles.checkContainer}`}>
        <div className={styles.bgWhite}>
          <h1 className={styles.panelTitle}>Checkpoints</h1>
          <div className={styles.checkpointOuter}>
            Checkpoint 1
            <div className="">
              {CheckData.map((checkpoints, index) => {
                return (
                  <EventCheckpoints
                    index={index}
                    key={checkpoints.id}
                    checkpoints={checkpoints}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>*/}
    </div>
  );
};

export default EventRouteMap;
