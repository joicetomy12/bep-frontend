import parse from 'html-react-parser';
import * as _ from 'lodash';
import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';

import { Constants } from '../config/constants';
import { uriToLang } from '../config/utils';
import { getVenueDetails } from '../config/utils';
import { useGlobal } from '../providers/globalProvider';
import styles from '../styles/eventDetail.module.css';

const EventDetail = ({ event }) => {
  const router = useRouter();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const signUpUrl = _.get(
    event && event._links && event._links.summary,
    'href',
    ''
  );
  const { siteSettings } = useGlobal();
  return (
    <div className="position-relative">
      <div className={styles.eventDetails}>
        <h2>{event.title}</h2>
        {/* <label className="sustainability" htmlFor="">
          {event.category.name}
        </label> */}
        {event.format && (
          <div className={`tag ${event.format.toLowerCase()}`}>
            {' '}
            <span>{event.format}</span>
          </div>
        )}
        <div className={`mb-2 ${styles.addresCard}`}>
          <div>
            <img
              src="/assets/images/featuresSection/addressIcon.svg"
              width="24px"
              alt=""
            />
          </div>
          <div className={styles.location}>
            <>{getVenueDetails(event.venues)}</>
            <br />
            {moment(event.start).format('YYYY/MM/DD')},{' '}
            {moment(event.start).format('HH:mm')}
          </div>
        </div>
        <div className={styles.cardDescription}>
          {parse(
            typeof event.description === 'string'
              ? event.description
              : event.description
              ? event.description.toString()
              : ''
          )}
        </div>
        <div className={styles.flexico}>
          <a
            href={signUpUrl ? signUpUrl : '#'}
            target="_blank"
            title=""
            className="btn themeButton mt-4 ctm-btn-width"
            rel="noreferrer"
          >
            {siteSettings?.terms?.signUpTitle[lang]}
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
