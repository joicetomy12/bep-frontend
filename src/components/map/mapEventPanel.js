import * as _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

import { event } from '../../../lib/gtag';
import { Constants } from '../../config/constants';
import { sanityUrlFor } from '../../config/sanityUrlFor';
import { uriToLang } from '../../config/utils';
import { useCountry } from '../../providers/countryProvider';
import { useGlobal } from '../../providers/globalProvider';
import { useMap } from '../../providers/mapProvider';
import styles from '../../styles/map/mapSidePanel.module.css';
import MapSidePanel from './mapSidePanel';
const MapEventPanel = ({ peopleCategoryLists, peopleCountryList }) => {
  const router = useRouter();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const { currentMapData, resetMapEvents } = useMap();
  const { siteSettings } = useGlobal();
  const store = currentMapData.focusEvent;
  const getPeopleCountryList = peopleid => {
    const item = _.find(peopleCountryList, { _id: peopleid }, '');
    const title = _.get(item, 'title', '');
    return title;
  };
  const getPeopleCountryFlag = peopleid => {
    const item = _.find(peopleCountryList, { _id: peopleid }, '');
    let title = _.get(item, 'code', '');
    const flagCode = !_.isEmpty(title) ? _.lowerCase(title) : 'uk';
    return flagCode;
  };
  const getPeopleCategoryTag = peopleid => {
    const item = _.find(peopleCategoryLists, { _id: peopleid });
    const category = item && item.name ? _.get(item.name, lang, '') : '';
    return category;
  };
  const nameSplit = store && store.Name ? store.Name.split(/(\s+)/) : '';
  const name = nameSplit && nameSplit[0] ? nameSplit[0] : '';

  const { genUrlEu } = useCountry();

  const eventTrigger = title => {
    event({
      event: 'click',
      eventValue: {
        category: 'experience map',
        action: 'click to detail page',
        label: `People-${title}`
      }
    });
  };
  return (
    <MapSidePanel>
      <div className={styles.cardCloseBtn} onClick={() => resetMapEvents()}>
        <img alt={''} src="/assets/images/icons/close.svg" width="40px" />
      </div>
      {/* <h1 className={styles.panelTitle}>Event Details</h1> */}
      {store && (
        <div className={styles.detailbox}>
          <img
            src={sanityUrlFor(
              store && store.profileImage && store.profileImage.asset
                ? store.profileImage.asset
                : ''
            )
              .auto('format')
              .url()}
            className={`${styles.userImg} ${styles.imgGrayScale}`}
            alt="host"
          />
          <h2>{_.get(store, 'Name', '')}</h2>
          <div className="d-flex justify-content-center align-items-center">
            <span
              className="sustainability"
              style={{
                backgroundColor: '#6C7C57'
                // backgroundColor: people['categoryColorCode']['color']
              }}
            >
              {getPeopleCategoryTag(
                _.get(
                  store.peoplecategorytype && store.peoplecategorytype[0],
                  '_ref',
                  ''
                )
              )}
            </span>
            <img
              src={`/assets/flags/${getPeopleCountryFlag(
                _.get(store, 'country._ref', '')
              )}.svg`}
              className={styles.flag}
              alt="host"
            />
            <span className={styles.country}>
              {getPeopleCountryList(_.get(store, 'country._ref', ''))}
            </span>
          </div>
          {_.get(store && store.description, lang, '') && (
            <p className={styles.descText}>
              {_.get(store && store.description, lang, '')}
            </p>
          )}

          <a
            href={genUrlEu(`people/${_.get(store, 'slug.current', '')}`)}
            onClick={() => {
              eventTrigger(_.get(store, 'Name', ''));
            }}
            className={styles.themeLink}
          >
            {siteSettings?.terms?.getToKnow[lang]} {name}
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
        </div>
      )}
      {/*As of now the participates deails not avaialble with people's events data. So now it will hide
          <div className={styles.grayBox}>
            {/*As of now the participates deails not avaialble with people's events data. So now it will hide
            /*<h3>Participates in:</h3>
            <div className={`mb-3 ${styles.eventBoxOuter}`}>
          <div className={styles.eventBox}>
            <h2>Event title</h2>
            <p className="d-flex align-items-start ">
              {' '}
              <img src="/assets/images/bag.svg" alt="host" />
              <span className="ml-2">
                Kungsgatan 57 B, Stockholm, 111 22 2021/13/21, 13.00
              </span>
            </p>
            <a href="/" className={styles.themeLink}>
              Get to know Vanessa{' '}
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
          </div>
          <div className={styles.eventBox}>
            <h2>Event title</h2>
            <p className="d-flex align-items-start ">
              {' '}
              <img src="/assets/images/bag.svg" alt="host" />
              <span className="ml-2">
                Kungsgatan 57 B, Stockholm, 111 22 2021/13/21, 13.00
              </span>
            </p>
            <a href="/" className={styles.themeLink}>
              Get to know Vanessa{' '}
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
          </div>
      </div>
            <h3>Connected store</h3>
            <div className={styles.eventBoxOuter}>
              <div className={styles.eventBox}>
                <h2>{finalStoreName}</h2>
                {/*store address not available with response*/}
      {/*<p className="d-flex align-items-start ">
                  {' '}
                  <img src="/assets/images/bag.svg" alt="host" />
                  <span className="ml-2">
                  </span>
                </p>
                {store.storeUrl && (
                  <a
                    target="_blank"
                    href={store.storeUrl ? store.storeUrl : ''}
                    className={styles.themeLink}
                    rel="noreferrer"
                  >
                    <button className={styles.buttonStore}>Show store</button>
                  </a>
                )}
              
              </div>
            )}
          </div>
        
        </>
      )}
          */}
    </MapSidePanel>
  );
};

export default MapEventPanel;
