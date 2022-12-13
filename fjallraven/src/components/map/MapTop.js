import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { Constants } from '../../config/constants';
import { uriToLang } from '../../config/utils';
import { useGlobal } from '../../providers/globalProvider';
import { useMap } from '../../providers/mapProvider';
import styles from '../../styles/map/MapTop.module.css';

function MapTop() {
  const [close, setClose] = useState(true);
  const { homeMapFilterItemCounts, activeEventType } = useMap();
  const router = useRouter();
  const { siteSettings } = useGlobal();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  let typeEvent = Constants.updatedEventTypes;
  let eventCount =
    activeEventType &&
    homeMapFilterItemCounts &&
    homeMapFilterItemCounts[activeEventType]
      ? homeMapFilterItemCounts[activeEventType]
      : 0;

  let explantion = '';
  let imageEvent = {};
  if (activeEventType === 'Store') {
    imageEvent = typeEvent.store;
    explantion = siteSettings.eventCategory.storeDesc[lang];
  }
  if (activeEventType === 'Campfire') {
    imageEvent = typeEvent.campfireEvent;
    explantion = siteSettings.eventCategory.campfireEventDesc[lang];
  }
  if (activeEventType === 'Classic') {
    imageEvent = typeEvent.classicEvent;
    explantion = siteSettings.eventCategory.classicEventDesc[lang];
  }
  if (activeEventType === 'Polar') {
    imageEvent = typeEvent.polarEvent;
    explantion = siteSettings.eventCategory.polarEventDesc[lang];
  }
  if (activeEventType === 'BrandStore') {
    imageEvent = typeEvent.brandStoreEvent;
    explantion = siteSettings.eventCategory.brandStoreEventDesc[lang];
  }
  if (activeEventType === 'people') {
    imageEvent = typeEvent.people;
    explantion = siteSettings.terms.peopleDesc[lang];
  }

  const closeTheDivNow = () => {
    setClose(false);
  };

  return (
    <div>
      {close == true ? (
        <div className={styles.maptopico}>
          <div>
            <img
              className={styles.maplogo}
              src={`/assets/images/${imageEvent}.svg`}
              alt="filter"
            />
          </div>

          <div className={styles.clozediv} onClick={closeTheDivNow}>
            <img
              className={styles.close}
              src={'/assets/images/icons/close.svg'}
            />
          </div>

          <div>
            <div className={styles.caption}>
              {activeEventType + ' ' + '(' + eventCount + ')'}
            </div>
            <div className={styles.mapDesc}>{explantion}</div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default MapTop;
