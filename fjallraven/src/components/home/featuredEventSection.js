import 'react-multi-carousel/lib/styles.css';

import axios from 'axios';
import parse from 'html-react-parser';
import * as _ from 'lodash';
// import { uniqueId } from 'lodash';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Constants } from '../../config/constants';
import { sanityUrlFor } from '../../config/sanityUrlFor';
import { uriToLang } from '../../config/utils';
import { getcustomFieldsIdandValue, getVenueDetails } from '../../config/utils';
import { useCountry } from '../../providers/countryProvider';
import { useGlobal } from '../../providers/globalProvider';
import Styles from '../../styles/home/featuredEventSectionStyle.module.css';
import { ChevronRight } from '../icons';

// const responsive = {
//   superLargeDesktop: {
//     breakpoint: { max: 4000, min: 3000 },
//     items: 3
//   },
//   xdisktop: {
//     breakpoint: { max: 3000, min: 2000 },
//     items: 3
//   },
//   desktop: {
//     breakpoint: { max: 2000, min: 1250 },
//     items: 3
//   },
//   tablet: {
//     breakpoint: { max: 1250, min: 464 },
//     items: 2
//   },
//   mobile: {
//     breakpoint: { max: 786, min: 0 },
//     items: 1,
//     partialVisibilityGutter: 30
//   }
// };

const showEventsLimit = 8;

function FeaturedEventSection({ data, countryCode, heroImg }) {
  const router = useRouter();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const { siteSettings } = useGlobal();
  const { currentCountryData, genUrlEu } = useCountry();
  const [featureCvents, setFeatureCvents] = useState([]);
  // const deviceWidthSet = deviceWidth <= 464 ? true : false;
  useEffect(() => {
    fetchCvents().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const fetchCvents = async () => {
    const upperCountryName =
      countryCode === 'UK' || countryCode === 'uk'
        ? 'GB'
        : countryCode
        ? countryCode.toUpperCase()
        : '';
    // Return today's date and time
    let currentTime = new Date();
    // returns the month (from 0 to 11)
    let currentMonth = currentTime.getMonth() + 1;
    // returns the year (four digits)
    let currentYear = currentTime.getFullYear();
    let filterString = `customField.58ce672f-6d00-49b6-9a64-232384569f2c contains 'Yes' and venue.address.countryCode eq '${upperCountryName}'  and start ge '${currentYear}-${
      currentMonth.toString().length == 1 ? '0' + currentMonth : currentMonth
    }-01T00:00:00.000Z'`;
    let countryFilters = `(venue.address.countryCode eq 'GB' or venue.address.countryCode eq 'DE' or venue.address.countryCode eq 'NL' or venue.address.countryCode eq 'FR' or venue.address.countryCode eq 'FI' or venue.address.countryCode eq 'SE' or venue.address.countryCode eq 'NO' or venue.address.countryCode eq 'DK' or venue.address.countryCode eq 'CA' or venue.address.countryCode eq 'US'  )`;
    let filterStringFallback = `${countryFilters} and customField.58ce672f-6d00-49b6-9a64-232384569f2c contains 'Yes'`;

    const headers = {
      'Content-Type': 'application/json'
    };
    const data = {
      request_type: 'POST',
      cvent_request_endpoint: `/events/filter?limit=${showEventsLimit}&sort=start:ASC`,
      cvent_request_params: { filter: filterString }
    };

    try {
      const cventCountRes = await axios.post(
        `${Constants.basePath.EVENT}/orchestration/state/cventServerEndpoints`,
        data,
        {
          headers: headers
        }
      );
      let cventData = [];
      if (cventCountRes && cventCountRes.data && cventCountRes.data.data) {
        cventData = cventCountRes.data.data;
        let eventData = cventData.map(data => data);
        if (cventData.length < 8) {
          const data1 = {
            request_type: 'POST',
            cvent_request_endpoint: `/events/filter?limit=${showEventsLimit}&sort=start:ASC`,
            cvent_request_params: { filter: filterStringFallback }
          };
          try {
            const cventCountRes1 = await axios.post(
              `${Constants.basePath.EVENT}/orchestration/state/cventServerEndpoints`,
              data1,
              {
                headers: headers
              }
            );
            let cventData1 = [];
            if (
              cventCountRes1 &&
              cventCountRes1.data &&
              cventCountRes1.data.data
            ) {
              cventData1 = cventCountRes1.data.data;
              //// let eventData = cventData1.map(data=>push(data))
              Array.prototype.push.apply(eventData, cventData1);
              const uniqueData = [];
              const unique = eventData.filter(element => {
                const isDuplicate = uniqueData.includes(element.id);
                if (!isDuplicate) {
                  uniqueData.push(element.id);

                  return true;
                }
                return false;
              });
              setFeatureCvents(unique);
            }
          } catch (error) {
            setFeatureCvents([]);
          }
        } else {
          setFeatureCvents(cventData);
        }
      }
    } catch (error) {
      setFeatureCvents([]);
    }
  };

  return (
    <>
      {/* {console.log('cvents data based on home page', featureCvents)} */}
      {data && (
        <section className="container pl-0">
          <div className="d-flex justify-content-center">
            <div className={Styles.title}>{data.heading[lang]}</div>
          </div>

          <div className="d-flex justify-content-center">
            <div className={Styles.subTitle}>{data.tagline[lang]}</div>
          </div>
          <div className={`flex justify-content-center ${Styles.SliderMargin}`}>
            <div className="container">
              <div className="row justify-content-center">
                {/* <Carousel responsive={responsive} partialVisible={deviceWidthSet}> */}

                {typeof featureCvents !== 'undefined' &&
                  featureCvents.slice(0, 8).map(value => {
                    return (
                      <div
                        key={value.id || value.title}
                        className={Styles.FeatureCard}
                      >
                        <div className={Styles.cardBackgroundImage}>
                          <div className="badgeCard">
                            {value.customFields &&
                            value.customFields.length > 0 ? (
                              <>
                                <img
                                  src={`/assets/images/events/${
                                    getcustomFieldsIdandValue(
                                      value.customFields,
                                      'BEP - Event Category'
                                    ).value
                                  }.svg`}
                                  alt=""
                                />
                                <p>
                                  {
                                    Constants.eventTypeDisplayName[
                                      getcustomFieldsIdandValue(
                                        value.customFields,
                                        'BEP - Event Category'
                                      ).value
                                    ]
                                  }
                                </p>
                              </>
                            ) : (
                              <div></div>
                            )}
                          </div>
                          <a
                            href={getRedirectLink(
                              value.venues[0],
                              `event/${value.title.replace(/ /g, '-')}?eid=` +
                                value.id
                            )}
                          >
                            <img
                              src={
                                value.customFields &&
                                value.customFields.length > 0
                                  ? getcustomFieldsIdandValue(
                                      value.customFields,
                                      'BEP - Event Image URL'
                                    ).value
                                  : sanityUrlFor(
                                      heroImg.backgroundImage.asset,
                                      currentCountryData.code
                                    ).url()
                              }
                              alt=""
                              width="392px"
                              height="261px"
                            />
                          </a>
                        </div>
                        <div className={Styles.cardAbout}>
                          <div className={Styles.cardTitle}>
                            {value.customFields &&
                              value.customFields.length > 0 &&
                              getcustomFieldsIdandValue(
                                value.customFields,
                                'Featured'
                              ).value && (
                                <img
                                  src="/assets/svgImages/yellowstar.svg"
                                  width="22px"
                                  alt=""
                                />
                              )}
                            <a
                              href={getRedirectLink(
                                value.venues[0],
                                `event/${value.title.replace(/ /g, '-')}?eid=` +
                                  value.id
                              )}
                            >
                              {value.title}
                            </a>
                          </div>
                          <div className={Styles.cardDescription}>
                            {value.customFields &&
                            value.customFields.length > 0 &&
                            getcustomFieldsIdandValue(
                              value.customFields,
                              'BEP - Event Description'
                            ).value !== 'NA'
                              ? getcustomFieldsIdandValue(
                                  value.customFields,
                                  'BEP - Event Description'
                                ).value
                              : parse(
                                  typeof value.description === 'string'
                                    ? value.description
                                    : value.description
                                    ? value.description.toString()
                                    : ''
                                )}
                          </div>

                          <div className={Styles.fixedCardBottom}>
                            <div className={Styles.addresCard}>
                              <div>
                                <img
                                  src="/assets/images/featuresSection/addressIcon.svg"
                                  width="24px"
                                  alt=""
                                />
                              </div>
                              <div className={Styles.location}>
                                <>{getVenueDetails(value.venues)}</>
                                <br />
                                {moment(value.start).format('YYYY/MM/DD')},{' '}
                                {moment(value.start).format('HH:mm')}
                              </div>
                            </div>

                            <a
                              type="button"
                              href={getRedirectLink(
                                value.venues[0],
                                `event/${value.title.replace(/ /g, '-')}?eid=` +
                                  value.id
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
                  })}
                {/* </Carousel> */}
              </div>
            </div>
          </div>

          {data.cta && data.cta.title && (
            <div className={`mt-4 mb-5 ${Styles.footerButton}`}>
              <a href={genUrlEu(`events`)} title="" className="btn themeButton">
                {_.capitalize(data.cta.title[lang])}
              </a>
            </div>
          )}
        </section>
      )}
    </>
  );
}

export default FeaturedEventSection;
