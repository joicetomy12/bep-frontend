import parse from 'html-react-parser';
import * as _ from 'lodash';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { event } from '../../../lib/gtag';
import { Constants } from '../../config/constants';
import { getcustomFieldsIdandValue, getVenueDetails } from '../../config/utils';
import { uriToLang } from '../../config/utils';
import { useMap } from '../../providers/mapProvider';
import styles from '../../styles/map/mapEventRoutePanel.module.css';
import MapSidePanel from './mapSidePanel';
const MapEventRoutePanel = () => {
  const { resetMapEvents, eventRouteActive, activeEventType } = useMap();
  const [eventDetails, setEventDetails] = useState(null);
  useEffect(() => {
    setEventDetails(eventRouteActive.panelDetails);
  }, [eventRouteActive]);
  const router = useRouter();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  // const getStoreUrl =
  //   eventDetails && _.isArray(eventDetails.customFields)
  //     ? getcustomFieldsIdandValue(eventDetails.customFields, 'Event store URL')
  //         .value
  //     : '';
  // // let finalStoreName = '';
  // if (getStoreUrl) {
  //   const getStoreNameFromStoreUrl = getStoreUrl
  //     ? getStoreUrl.split('/').slice(-3)[0]
  //     : '';
  //   const arr = getStoreNameFromStoreUrl.split('-');
  //   //loop through each element of the array and capitalize the first letter.
  //   for (var i = 0; i < arr.length; i++) {
  //     arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  //   }
  //   //Join all the elements of the array back into a string
  //   //using a blankspace as a separator
  //   finalStoreName = arr.join(' ');
  const eventTrigger = (title, activeEventType) => {
    if (activeEventType == 'Campfire') {
      event({
        event: 'click',
        eventValue: {
          category: 'experience map',
          action: 'click to detail page',
          label: `Campfire-${title}`
        }
      });
    }
    if (activeEventType == 'Classic') {
      event({
        event: 'click',
        eventValue: {
          category: 'experience map',
          action: 'click to detail page',
          label: `Classic-${title}`
        }
      });
    }
    if (activeEventType == 'Store') {
      event({
        event: 'click',
        eventValue: {
          category: 'experience map',
          action: 'click to detail page',
          label: `Store-${title}`
        }
      });
    }
  };
  const getRedirectLink = (eventVenue, url) => {
    if (url.startsWith('/')) {
      url = url.substring(1);
    }
    const code = _.get(eventVenue, 'address.countryCode', '');
    let lowCase = null;
    if (!_.isEmpty(code)) {
      code === 'GB' ? (lowCase = 'uk') : (lowCase = _.toLower(code));
    }
    let generatedUrl = '';

    if (lang == 'en-ca') {
      let codeForCA = 'en-ca';
      generatedUrl = `/${lowCase}/${codeForCA}/${url}`;
    } else if (lang == 'fr-ca') {
      let codeForCA = 'fr-ca';
      generatedUrl = `/${lowCase}/${codeForCA}/${url}`;
    } else {
      generatedUrl = `/${lowCase}/${Constants.countries[lowCase]}/${url}`;
    }
    return generatedUrl;
  };

  return (
    <MapSidePanel className={styles.bgGray}>
      {eventDetails && (
        <>
          <div className={styles.cardCloseBtn} onClick={() => resetMapEvents()}>
            <img alt={''} src="/assets/images/icons/close.svg" width="40px" />
          </div>
          {eventDetails.customFields && eventDetails.customFields.length > 0 && (
            <div
              className={styles.routeBg}
              style={{
                'background-image': `url(${
                  getcustomFieldsIdandValue(
                    eventDetails.customFields,
                    'BEP - Event Image URL'
                  ).value
                })`
              }}
            />
          )}
          <div className={`mb-3 ${styles.eventBoxOuter}`}>
            <div className={styles.categoryName}>
              {
                Constants.eventTypeDisplayName[
                  getcustomFieldsIdandValue(
                    eventDetails.customFields,
                    'BEP - Event Category'
                  ).value
                ]
              }
            </div>
            <div className={styles.eventBox}>
              <h2>{eventDetails.title}</h2>
              <p className={styles.descText}>
                {parse(
                  typeof eventDetails.description === 'string'
                    ? eventDetails.description
                    : eventDetails.description
                    ? eventDetails.description.toString()
                    : ''
                )}
              </p>
              <p className="d-flex align-items-start ">
                {' '}
                <img src="/assets/images/bag.svg" alt="host" />
                <span className="ml-2">
                  {getVenueDetails(eventDetails.venues)}
                  <br />
                  {moment(eventDetails.startDate).format('YYYY/MM/DD')},{' '}
                  {moment(eventDetails.startDate).format('HH:mm')}
                </span>
              </p>
              {/* <a
                href={genUrl(
                  `event/${eventDetails.title.replace(/ /g, '-')}?eid=${
                    eventDetails.id
                  }`
                )}
                className={styles.themeLink}
              >
                Go to event{' '}
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
              </a> */}
              {eventDetails && eventDetails.venues[0] && (
                <a
                  href={getRedirectLink(
                    eventDetails.venues[0],
                    `event/${eventDetails.title.replace(/ /g, '-')}?eid=${
                      eventDetails.id
                    }`
                  )}
                  onClick={() => {
                    eventTrigger(eventDetails.title, activeEventType);
                  }}
                  className={styles.themeLink}
                >
                  Go to event{' '}
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

              {/*As of now connected store is not used*/}
              {/* <h3>Connected store</h3>
              <div>
                <div>
                  <h2>{finalStoreName}</h2>
                  {/*store address not available with response*/}
              {/*<p className="d-flex align-items-start ">
                  {' '}
                  <img src="/assets/images/bag.svg" alt="host" />
                  <span className="ml-2">
                  </span>
                </p>*/}
              {/* {getStoreUrl && (
                    <a
                      target="_blank"
                      href={getStoreUrl}
                      className={styles.themeLink}
                      rel="noreferrer"
                    >
                      <button className={styles.buttonStore}>Show store</button>
                    </a>
                  )}
                </div>
              </div>
            </div> */}
              {/* </div>
          <h1 className={styles.panelTitle}>Checkpoints</h1>
          <div className={styles.checkpointOuter}>
            <div
              className={
                'container filterContainer item-group animate__animated animate__slideInUp'
              }
            >
              <div className={'row'}>
                <div className={styles.bgWhite}>
                  {eventDetails.wayPoints &&
                    eventDetails.wayPoints.length > 0 &&
                    eventDetails.wayPoints.map((point, index) => (
                      <div
                        className="card-body-1"
                        onClick={() => {
                          setRenderPathTraceIndex(index + 1);
                          setOffMobileMapSidePanel(true);
                        }}
                        key={index}
                      >
                        <h5 className={styles.cardTitle}>
                          <img
                            alt={''}
                            src="/assets/images/locationPin.svg"
                            width="20px"
                          />{' '}
                          {point}
                        </h5>
                      </div>
                    ))}
                </div>
              </div>
            // </div> */}
            </div>
          </div>
        </>
      )}
    </MapSidePanel>
  );
};

export default MapEventRoutePanel;
