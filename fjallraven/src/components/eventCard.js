import parse from 'html-react-parser';
import * as _ from 'lodash';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { sanityUrlFor } from '../../src/config/sanityUrlFor';
import { Constants } from '../config/constants';
import { uriToLang } from '../config/utils';
import { getcustomFieldsIdandValue, getVenueDetails } from '../config/utils';
// import { useCountry } from '../providers/countryProvider';
import { useGlobal } from '../providers/globalProvider';
import Styles from '../styles/eventCardStyle.module.css';
import { ChevronRight } from './icons';

const EventCard = ({ event, categoryCallback }) => {
  const router = useRouter();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const { siteSettings } = useGlobal();
  // const { genUrl, currentCountryData } = useCountry();
  // const eventTitlewithSlug = event.title.replace(/ /g, '-');
  // let appendQueryString = '';
  // if (event.id) {
  //   appendQueryString = `?eid=${event.id}`;
  // }
  const [commoncustomCategoryValue, setCommoncustomCategoryValue] =
    useState('');
  useEffect(() => {
    if (event.customFields && event.customFields.length > 0) {
      const customFieldValueandID = getcustomFieldsIdandValue(
        event.customFields,
        'BEP - Event Category'
      );
      setCommoncustomCategoryValue(customFieldValueandID.value);
      categoryCallback({
        EventCategory: customFieldValueandID.uuid,
        SearchTitle: getcustomFieldsIdandValue(
          event.customFields,
          'BEP - Search Title'
        ).uuid
      });
    }
  }, [event]);

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
    if (router.query.lang == 'en-ca') {
      let codeForCA = 'en-ca';
      generatedUrl = `/${lowCase}/${codeForCA}/${url}`;
    } else if (router.query.lang == 'fr-ca') {
      let codeForCA = 'fr-ca';
      generatedUrl = `/${lowCase}/${codeForCA}/${url}`;
    } else {
      generatedUrl = `/${lowCase}/${Constants.countries[lowCase]}/${url}`;
    }
    return generatedUrl;
  };

  return (
    <div key={event.code} className={`col-sm-4  ${Styles.FeatureCard}`}>
      <div className={Styles.cardBackgroundImage}>
        <div className="badgeCard">
          <img
            src={`/assets/images/events/${commoncustomCategoryValue}.svg`}
            alt=""
          />
          <p>{Constants.eventTypeDisplayName[commoncustomCategoryValue]}</p>
        </div>

        <a
          href={getRedirectLink(
            _.get(event, 'venues[0]', ''),
            `event/${event.title.replace(/ /g, '-')}?eid=` + event.id
          )}
        >
          <img
            src={
              event.customFields &&
              event.customFields.length > 0 &&
              getcustomFieldsIdandValue(
                event.customFields,
                'BEP - Event Image URL'
              ).value !== 'NA'
                ? getcustomFieldsIdandValue(
                    event.customFields,
                    'BEP - Event Image URL'
                  ).value
                : sanityUrlFor(
                    _.get(
                      siteSettings &&
                        siteSettings.eventCategory &&
                        siteSettings.eventCategory.eventDefaultImage,
                      'asset'
                    )
                  ).url()
            }
            alt=""
          />
        </a>
      </div>
      <div className={Styles.cardAbout}>
        <div className={Styles.cardTitle}>
          {/* {event.customFields &&
            event.customFields.length > 0 &&
            getcustomFieldsIdandValue(event.customFields, 'Featured').value && (
              <img src="/assets/svgImages/yellowstar.svg" width="22px" alt="" />
            )} */}
          {event.customFields &&
            event.customFields.length > 0 &&
            getcustomFieldsIdandValue(
              event.customFields,
              'BEP - Apply featured star'
            ).value && (
              <img src="/assets/svgImages/yellowstar.svg" width="22px" alt="" />
            )}

          <a
            href={getRedirectLink(
              _.get(event, 'venues[0]', ''),
              `event/${event.title.replace(/ /g, '-')}?eid=` + event.id
            )}
          >
            {event.title}
          </a>
        </div>

        <a
          href={getRedirectLink(
            _.get(event, 'venues[0]', ''),
            `event/${event.title.replace(/ /g, '-')}?eid=` + event.id
          )}
        >
          <div
            className={`${Styles.cardDescription} ${Styles.eventDescriptionEllipsis}`}
          >
            {event.customFields &&
            event.customFields.length > 0 &&
            getcustomFieldsIdandValue(
              event.customFields,
              'BEP - Event Description'
            ).value !== 'NA'
              ? getcustomFieldsIdandValue(
                  event.customFields,
                  'BEP - Event Description'
                ).value
              : parse(
                  typeof event.description === 'string'
                    ? event.description
                    : event.description
                    ? event.description.toString()
                    : ''
                )}
          </div>
        </a>

        <div className={Styles.fixedCardBottom}>
          <hr className={Styles.borderdot} />
          <div className={Styles.addresCard}>
            <div>
              <img
                src="/assets/images/featuresSection/addressIcon.svg"
                width="24px"
                alt=""
              />
            </div>
            <div className={Styles.location}>
              {getVenueDetails(_.get(event, 'venues', ''))}
            </div>
            {/* <div className={Styles.datetim}>
              {moment(event.start).format('YYYY/MM/DD')},{' '}
              {moment(event.start).format('HH:mm')}
            </div> */}
          </div>
          <div className={Styles.datetim}>
            {moment(event.start).format('YYYY/MM/DD')},{' '}
            {moment(event.start).format('HH:mm')}
          </div>
          {/* <a
            href={genUrl(`/event/${eventTitlewithSlug}${appendQueryString}`)}
            className={Styles.goToEvent}
          > */}

          <a
            href={getRedirectLink(
              _.get(event, 'venues[0]', ''),
              `event/${event.title.replace(/ /g, '-')}?eid=` + event.id
            )}
            className={Styles.goToEvent}
          >
            {siteSettings?.terms?.goToEvent[lang]}
            <div className={Styles.chevronRightIcon}>
              <ChevronRight />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
