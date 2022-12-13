import React from 'react';

import { Constants } from '../../config/constants';
import { sanityUrlFor } from '../../config/sanityUrlFor';
import { useGlobal } from '../../providers/globalProvider';
import { useMap } from '../../providers/mapProvider';
import styles from '../../styles/map/mapEventRoutePanel.module.css';
import MapSidePanel from './mapSidePanel';
const MapStorePanel = () => {
  const { currentMapData, resetMapEvents } = useMap();
  const { siteSettings } = useGlobal();
  const store = currentMapData.focusEvent;
  return (
    <MapSidePanel className={styles.bgGray}>
      {store && (
        <>
          <div className={styles.cardCloseBtn} onClick={() => resetMapEvents()}>
            <img alt={''} src="/assets/images/icons/close.svg" width="40px" />
          </div>
          {store.storeimage_big ? (
            <div
              className={styles.routeBg}
              style={{
                'background-image': `url(${store.storeimage_big})`
              }}
            />
          ) : (
            <div
              className={styles.routeBg}
              style={{
                'background-image': `url(${sanityUrlFor(
                  siteSettings.storeSection.storeImage?.asset
                ).auto('format')})`
              }}
            />
          )}
          <div className={`mb-3 ${styles.eventBoxOuter}`}>
            <div className={styles.categoryName}>
              {Constants.eventTypeDisplayName[store.eventType]}
            </div>
            <div className={styles.eventBox}>
              <h2 className={styles.eventBoxBorder}>{store.name}</h2>
              {store.description && (
                <p className={styles.descText}>{store.description}</p>
              )}

              <p className="d-flex align-items-start ">
                {store.address1} {store.city ? ', ' + store.city : ''}{' '}
                {store.postalcode ? ', ' + store.postalcode : ''}
                <br />
                Phone: {store.phone}
              </p>
              {/* As of now for live connected store is not used*/}
              {/* <h3>Connected store</h3> */}
              {store.website_url && (
                <a
                  href={`${
                    store.website_url.includes('http')
                      ? store.website_url
                      : '//' + store.website_url
                  }`}
                  target="_blank"
                  className={styles.themeLink}
                  rel="noreferrer"
                >
                  Visit Website{' '}
                  <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.84003 15.452C6.56283 15.452 6.28563 15.3476 6.07683 15.1352C5.65563 14.714 5.65563 14.03 6.07683 13.6088L10.3536 9.33199L6.07683 5.05519C5.65563 4.63399 5.65563 3.94999 6.07683 3.52879C6.49803 3.10759 7.18203 3.10759 7.60323 3.52879L13.4064 9.33199L7.60323 15.1352C7.39443 15.3476 7.11723 15.452 6.84003 15.452Z"
                      fill="#B93228"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>

          <h1 className={styles.panelTitle}>Opening hours</h1>
          <div className={styles.checkpointOuter}>
            <div
              className={
                'container filterContainer item-group animate__animated animate__slideInUp'
              }
            >
              <div className={'row'}>
                <div className={styles.bgWhite}>
                  <div className="card-body-1">
                    <p className={styles.cardTitleOpen}>
                      Monday–Friday{' '}
                      <span>
                        {store.open_mon}–{store.close_mon}
                      </span>
                    </p>
                    <p className={styles.cardTitleOpen}>
                      Saturday{' '}
                      {store.open_sat && (
                        <span>
                          {store.open_sat}–{store.close_sat}
                        </span>
                      )}
                      {!store.open_sat && (
                        <span className={'text-danger'}>Closed</span>
                      )}
                    </p>
                    <p className={styles.cardTitleOpen}>
                      Sunday{' '}
                      {store.open_sun && (
                        <span>
                          {store.open_sun}–{store.close_sun}
                        </span>
                      )}
                      {!store.open_sun && (
                        <span className={'text-danger'}>Closed</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </MapSidePanel>
  );
};

export default MapStorePanel;
