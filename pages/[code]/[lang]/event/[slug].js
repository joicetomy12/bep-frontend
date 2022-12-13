import 'react-multi-carousel/lib/styles.css';

import axios from 'axios';
import { getCookie } from 'cookies-next';
import groq from 'groq';
import * as _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import PATH_WITH_WAYPOINTS from '../../../../src/.data/pathWithWaypoints.json';
import WAY_POINTS from '../../../../src/.data/waypoints.json';
import EventDetail from '../../../../src/components/eventDetail';
import EventParticipants from '../../../../src/components/eventParticipants';
import EventRouteMap from '../../../../src/components/eventRouteMap';
import EventTopBanner from '../../../../src/components/eventTopBanner';
import FlowboxScript from '../../../../src/components/flowboxScript';
import Layout from '../../../../src/components/layout';
import { Constants } from '../../../../src/config/constants';
import sanityClientHandle from '../../../../src/config/sanityClient';
import {
  getcustomFieldsIdandValue,
  langToURI,
  uriToLang
} from '../../../../src/config/utils';
import { MapProvider } from '../../../../src/providers/mapProvider';
import { getMenuItems } from '../../../../src/services/sanity';
import styles from '../../../../src/styles/eventDetails.module.css';

const getQueryParam = url => {
  const qs = url.substring(url.indexOf('?') + 1).split('&');
  let result = { id: '', eid: '' };
  for (let i = 0; i < qs.length; i++) {
    qs[i] = qs[i].split('=');
    result[qs[i][0]] = decodeURIComponent(qs[i][1]);
  }
  return result;
};

const Event = ({ siteSettings, countries, menuItems, userId }) => {
  const router = useRouter();
  const countryCode = router.query.code || Constants.defaultCountry.code;
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const langUri = langToURI(lang || Constants.defaultCountry.lang);
  const queryParam = getQueryParam(router.asPath);
  const eventId = !_.isEmpty(router.query.eid)
    ? router.query.eid
    : queryParam.eid;
  const [event, setEvent] = useState({});
  const [ceventParticipants, setCeventParticipants] = useState({});
  const [dataEvent, setDataEvent] = useState({});
  useEffect(() => {
    fetchCvents().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setValuesToParticipants = customFields => {
    let participants = {};
    if (customFields) {
      customFields.filter(body => {
        if (body.name === 'BEP - Event Organiser Name') {
          participants.name = body.value[0];
        } else if (body.name === 'BEP - Event Organiser Category') {
          participants.category = body.value[0];
        } else if (body.name === 'BEP - Event Organiser Image URL') {
          participants.imageUrl = body.value[0];
        }
      });
    }
    setCeventParticipants(participants);
  };

  const fetchCvents = async () => {
    if (!_.isEmpty(eventId)) {
      const headers = {
        'Content-Type': 'application/json'
      };
      const data = {
        request_type: 'GET',
        cvent_request_endpoint: `/events/${eventId}`,
        cvent_request_params: {}
      };
      const cventCountRes = await axios.post(
        `${Constants.basePath.EVENT}/orchestration/state/cventServerEndpoints`,
        data,
        {
          headers: headers
        }
      );
      setDataEvent(cventCountRes);
      let event = {};
      if (cventCountRes && cventCountRes.data && cventCountRes.data.id) {
        event = cventCountRes.data.id ? cventCountRes.data : {};
        event.latitude =
          cventCountRes.data.venues.length > 0
            ? cventCountRes.data.venues[0].address.latitude
            : '';
        event.longitude =
          cventCountRes.data.venues.length > 0
            ? cventCountRes.data.venues[0].address.longitude
            : '';
        event.eventType = 'badged1';
        event.wayPoints = WAY_POINTS;
        event.route = PATH_WITH_WAYPOINTS;
        event.signUpLink = event._links.registration
          ? event._links.registration.href
          : '#';
        setEvent(event);
        setValuesToParticipants(event.customFields);
      }
    }
  };

  return (
    <Layout
      siteSettings={siteSettings}
      countries={countries}
      menuItems={menuItems}
      userId={userId}
      countryCode={countryCode}
      languageCode={langUri}
    >
      {event && (
        <div className={'page-event-detail'}>
          <EventTopBanner event={event} />
          <div className="container">
            <div className="row py-5">
              <div className="col-sm-7 mb-4">
                <EventDetail event={event} />
              </div>
              {_.isEmpty(ceventParticipants) ? (
                ''
              ) : (
                <div className="col-sm-5">
                  <h3>{siteSettings?.terms?.participantsTitle[lang]}</h3>
                  <div className={styles.participateList}>
                    <div className={styles.participatorScroll}>
                      {ceventParticipants && event.venues && (
                        <EventParticipants
                          data={ceventParticipants}
                          countryDetails={event.venues[0].address}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {event.venues && event.venues[0].address.latitude && (
              <>
                <div className="">
                  <h3>{siteSettings?.terms?.mapTitle[lang]}</h3>
                </div>
                {/* TODO - Pending (there is no API ready for this)*/}
                <MapProvider
                  isEventDetailPage={true}
                  eventDetailPageData={dataEvent}
                >
                  <EventRouteMap event={event} />
                </MapProvider>
              </>
            )}
            {/* <ShadowBox /> */}
            {event.customFields &&
              getcustomFieldsIdandValue(event.customFields, 'Event Flowbox Key')
                .value && (
                <>
                  {/* <h5 className={styles.latestPost}>
                    {' '}
                    {siteSettings?.terms?.latestsPost[lang]}
                  </h5> */}
                  <div className="mt-4">
                    <h2> {siteSettings?.terms?.latestsPost[lang]}</h2>
                    <FlowboxScript
                      flowBoxKey={
                        getcustomFieldsIdandValue(
                          event.customFields,
                          'Event Flowbox Key'
                        ).value
                      }
                    />
                  </div>
                </>
              )}
          </div>
        </div>
      )}
    </Layout>
  );
};
Event.getInitialProps = async function (context) {
  const userId = context.query.id || '';
  const countryCode = context.query.code || Constants.defaultCountry.code;
  const lang = context.query.lang || Constants.defaultCountry.lang;
  const client = sanityClientHandle();
  const siteSettingsQuery = groq`*[_type == "siteSettings" && _id=="siteSettings"]`;
  const siteSettings = await client.fetch(siteSettingsQuery);
  const queryCountry = groq`*[_type == "country"]{code, flag, lang, title}`;
  const countriesList = await client.fetch(queryCountry);
  let { req, res } = context;
  const userIdDataId = getCookie('activeUserId', { req, res });
  let userStatus = {};
  if (!_.isEmpty(userIdDataId)) {
    let dataCountryCode = countryCode;
    if (dataCountryCode === 'se') {
      dataCountryCode = 'sw';
    }
    const cartDataResponse = await fetch(
      Constants.basePath.ORCHESTRATION_API_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          request_type: 'POST',
          epi_request_endpoint: `/${lang}/api/bependpoints/userstatus`,
          epi_request_params: {
            brand: 'fjallraven',
            marketId: _.upperCase(dataCountryCode),
            userId: userIdDataId
          }
        })
      }
    );
    userStatus = await cartDataResponse.json();
  }
  const menuItems = await getMenuItems(client);
  return {
    userIdDataId,
    userStatus,
    menuItems,
    userId,
    countries: countriesList,
    siteSettings:
      siteSettings && siteSettings.length > 0 ? siteSettings[0] : null
  };
};

export default Event;
