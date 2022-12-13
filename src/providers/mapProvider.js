import axios from 'axios';
import * as _ from 'lodash';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import React from 'react';

import { getPeopleLists } from '../../src/services/sanity';
// import PolarMap from '../components/PolarMap/MapData.json';
import { Config } from '../config/config';
import { Constants } from '../config/constants';
import sanityClientHandle from '../config/sanityClient';
import { uriToLang } from '../config/utils';
// import { useCountry } from './countryProvider';

const initMapData = {
  type: Constants.mapRenderTypes.STANDARD,
  center: [17.9355893, 66.205898],
  zoom: 8,
  pitch: 0,
  bearing: 0,
  focusEvent: null,
  events: []
};

const MapContext = React.createContext(null);

export const useMap = () => {
  const state = useContext(MapContext);
  if (!state) {
    throw new Error('Error using call in context!');
  }
  return state;
};

export const MapProvider = ({
  children,
  isEventDetailPage,
  eventDetailPageData
}) => {
  const router = useRouter();
  const client = sanityClientHandle();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const [currentMapData, setCurrentMapData] = useState(initMapData);
  const [currentActivePanel, setCurrentActivePanel] = useState(
    Constants.mapRenderEventActive.MULTI
  );
  const [currentMarkers, setCurrentMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [eventRouteActive, setEventRouteActive] = useState(null);
  // useState(null);
  const [activeEventType, setActiveEventType] = useState(null);
  const [renderPathTraceIndex, setRenderPathTraceIndex] = useState(null);
  const [drawnRouteIndexes, setDrawnRouteIndexes] = useState([]);
  const [homeMapFilterItemCounts, setHomeMapFilterItemCounts] = useState(null);
  const setEvents = async (type, term) => {
    let eventCounts = {};
    let events = [];
    let apiRes = null;
    const countryCode = router.query.code || Constants.defaultCountry.code;
    let postData = {
      countryCode
    };
    if (
      !type ||
      (type !== Constants.eventTypes.brandStoreEvent &&
        type !== Constants.eventTypes.people)
    ) {
      // const upperCountryName =
      //   countryCode === 'UK' || countryCode === 'uk'
      //     ? 'GB'
      //     : countryCode.toUpperCase();
      let countryFilters = `venue.address.countryCode eq 'GB' or venue.address.countryCode eq 'DE' or venue.address.countryCode eq 'NL' or venue.address.countryCode eq 'FR' or venue.address.countryCode eq 'FI' or venue.address.countryCode eq 'SE' or venue.address.countryCode eq 'NO' or venue.address.countryCode eq 'DK'`;
      let filterString = `${countryFilters} and customField.a9322dc7-8f7c-4d7e-b948-d4472ceb11ee contains 'Yes'`;

      if (type) {
        //postData['category'] = [type];
        filterString += ` and customField.3ed3342c-9e13-42ee-b757-f6c8727798df contains '${type}'`;
      }

      const headers = {
        'Content-Type': 'application/json'
      };

      const data = {
        request_type: 'POST',
        cvent_request_endpoint: `/events/filter?sort=start:DESC`,
        cvent_request_params: { filter: filterString }
      };
      if (isEventDetailPage) {
        apiRes = eventDetailPageData;
      } else {
        try {
          apiRes = await axios.post(
            `${Constants.basePath.EVENT}/orchestration/state/cventServerEndpoints`,
            data,
            {
              headers: headers
            }
          );

          if (apiRes && apiRes.data && apiRes.data.data) {
            apiRes.data.data.length > 0 &&
              apiRes.data.data.forEach(eventlist => {
                eventlist.customFields &&
                  eventlist.customFields.length > 0 &&
                  eventlist.customFields.forEach(e => {
                    if (e.name == 'BEP - Event Category') {
                      eventlist.latitude = eventlist.venues[0].address.latitude
                        ? eventlist.venues[0].address.latitude
                        : initMapData.center[1];
                      eventlist.longitude = eventlist.venues[0].address
                        .longitude
                        ? eventlist.venues[0].address.longitude
                        : initMapData.center[0];
                      eventlist.eventType = e.value[0];
                      if (eventCounts[eventlist.eventType]) {
                        eventCounts[eventlist.eventType] =
                          eventCounts[eventlist.eventType] + 1;
                      } else {
                        eventCounts[eventlist.eventType] = 1;
                      }
                      events.push(eventlist);
                    }
                  });
              });
          }
        } catch (error) {
          events = [];
        }

        if (type) {
          events = _.filter(events, { eventType: type });
        }
      }
    }

    //brandStore
    if (!type || type === Constants.eventTypes.brandStoreEvent) {
      postData = {
        request: {
          appkey: Config.bandifyStoreApiKey,
          formdata: {
            order: 'state, country',
            objectname: 'Locator::Store',
            where: {
              country: {
                in: ['NL', 'UK', 'DE', 'FR', 'FI', 'SE', 'NO', 'DK']
              },
              and: {
                or: {
                  brand_store: {
                    eq: '1'
                  },
                  partner_stores: {
                    eq: '1'
                  }
                }
              }
            }
          }
        }
      };
      apiRes = await axios.post(
        `${Constants.basePath.BANDIFY_STORE}?lang=${lang}`,
        postData
      );
      let postData2 = null;
      postData2 = {
        request: {
          appkey: Config.bandifyStoreApiKey,
          formdata: {
            order: 'state, country',
            objectname: 'Locator::Store',
            where: {
              country: {
                in: ['US', 'CA']
              },
              and: {
                or: {
                  brand_store: {
                    eq: '1'
                  }
                }
              }
            }
          }
        }
      };
      let apiRes2 = null;
      apiRes2 = await axios.post(
        `${Constants.basePath.BANDIFY_STORE}?lang=${lang}`,
        postData2
      );
      if (
        (apiRes &&
          apiRes.data &&
          apiRes.data.code === 1 &&
          apiRes.data.response &&
          apiRes.data.response.collection) ||
        (apiRes2 &&
          apiRes2.data &&
          apiRes2.data.code === 1 &&
          apiRes2.data.response &&
          apiRes2.data.response.collection)
      ) {
        eventCounts[Constants.eventTypes.brandStoreEvent] =
          apiRes.data.response.collection.length +
          apiRes2.data.response.collection.length;

        apiRes.data.response.collection.forEach(e => {
          e.eventType = Constants.eventTypes.brandStoreEvent;
          events.push(e);
        });
        apiRes2.data.response.collection.forEach(e => {
          e.eventType = Constants.eventTypes.brandStoreEvent;
          events.push(e);
        });
      }
    }

    //People
    if (!type || type === Constants.eventTypes.people) {
      // postData = {
      //   countryCode: countryCode
      // };
      // apiRes = await axios.post(
      //   `${Constants.basePath.EVENT}/orchestration/people/search`,
      //   postData
      // );
      const peopleLists = await getPeopleLists(client);
      if (peopleLists && peopleLists.length > 0) {
        let setEventCount = 0;
        peopleLists.forEach(e => {
          if (
            e.coordinates &&
            e.coordinates[0] &&
            e.coordinates[0].latitude &&
            e.coordinates[0].longitude
          ) {
            setEventCount++;
            e._type = Constants.eventTypes.people;
            events.push({
              ...e,
              eventType: e._type,
              longitude: e.coordinates[0].longitude,
              latitude: e.coordinates[0].latitude
            });
          }
        });
        eventCounts[Constants.eventTypes.people] = setEventCount;
      }
      // if (
      //   apiRes &&
      //   apiRes.data &&
      //   apiRes.data.data &&
      //   apiRes.data.data.peopleList
      // ) {
      //   // eventCounts[Constants.eventTypes.people] =
      //   //   apiRes.data.data.peopleList.length;
      //   let setEventCount = 0;
      //   apiRes.data.data.peopleList.forEach(e => {
      //     if (e.latitude && e.longitude) {
      //       setEventCount++;
      //       e.eventType = Constants.eventTypes.people;
      //       events.push(e);
      //     }
      //   });
      //   eventCounts[Constants.eventTypes.people] = setEventCount;
      // }
    }

    if (term) {
      events = _.filter(events, e => {
        return e.title.indexOf(term) > -1;
      });
    }
    setActiveEventType(type);
    let eventData = {
      ...initMapData,
      center:
        events && events.length > 0
          ? [events[0].longitude, events[0].latitude]
          : initMapData.center,
      events,
      focusEvent: null
    };
    setCurrentMapData(eventData);

    if (!homeMapFilterItemCounts) {
      setHomeMapFilterItemCounts(eventCounts);
    }
  };

  const getEventDetails = async event => {
    const headers = {
      'Content-Type': 'application/json'
    };
    const data = {
      request_type: 'GET',
      cvent_request_endpoint: `/events/${event.id}`,
      cvent_request_params: {}
    };
    let apiRes = await axios.post(
      `${Constants.basePath.EVENT}/orchestration/state/cventServerEndpoints`,
      data,
      {
        headers: headers
      }
    );

    // let apiRes = await axios.post(
    //   `${Constants.basePath.EVENT}/orchestration/event/search`,
    //   { id: event.id }
    // );
    if (apiRes && apiRes.data && apiRes.data.id) {
      event['panelDetails'] = apiRes.data.id ? apiRes.data : null;
    }
    return event;
  };

  const getEventRoute = async event => {
    let apiRes = await axios.get(
      // `${Constants.basePath.EVENT}/orchestration/event/route`
      `https://owcda.s3.amazonaws.com/fjallraven-route-map/json/fcuk.json`
    );
    if (
      apiRes &&
      apiRes.data &&
      apiRes.data &&
      apiRes.data.features &&
      apiRes.data.features.length > 0
    ) {
      let featureWaypoints = _.find(apiRes.data.features, {
        id: 'waypoints'
      });
      let featureRoute = _.find(apiRes.data.features, { id: 'route' });
      event['wayPoints'] =
        featureWaypoints &&
        featureWaypoints.geometry &&
        featureWaypoints.geometry.coordinates
          ? featureWaypoints.geometry.coordinates
          : [];

      event['route'] =
        featureRoute &&
        featureRoute.geometry &&
        featureRoute.geometry.coordinates
          ? featureRoute.geometry.coordinates
          : [];

      const route = event['route'];
      let routeSplit = [];
      if (
        featureWaypoints &&
        featureWaypoints.properties &&
        featureWaypoints.properties.equiDistantIndexes
      ) {
        let equiDistantIndexes = featureWaypoints.properties.equiDistantIndexes;
        let prevIndex = 0;
        equiDistantIndexes.forEach(disIndex => {
          if (disIndex > 0) {
            routeSplit.push(route.slice(prevIndex, disIndex));
            prevIndex = disIndex + 1;
          }
        });
      }
      event['routeSplit'] = routeSplit;

      setEventRouteActive(event);
    }
  };

  useEffect(() => {
    setEvents().then();
  }, []);

  useEffect(() => {
    if (eventRouteActive) {
      let eventData = {
        ...currentMapData,
        events: [],
        focusEvent: null
      };
      setCurrentMapData(eventData);
      setCurrentActivePanel(Constants.mapRenderEventActive.ROUTE);
    }
  }, [eventRouteActive]);

  const resetMapCanvas = () => {
    if (window) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 5);
    }
  };

  const resetMapEvents = () => {
    setEventRouteActive(null);
    setCurrentActivePanel(Constants.mapRenderEventActive.MULTI);
    setEvents().then();
    resetMapCanvas();
  };

  const setSingleEventFocus = event => {
    let eventData = {
      ...currentMapData,
      center: [event.longitude, event.latitude],
      focusEvent: event
    };
    setCurrentMapData(eventData);

    if (
      _.includes(
        [
          Constants.updatedEventTypes.campfireEvent,
          Constants.updatedEventTypes.classicEvent,
          Constants.updatedEventTypes.store,
          Constants.updatedEventTypes.polarEvent,
          Constants.updatedEventTypes.fjallravenClassic
        ],
        event.eventType
      )
    ) {
      getEventDetails(event).then(eventDetails => {
        getEventRoute(eventDetails).then();
      });
    } else if (event.eventType === Constants.eventTypes.brandStoreEvent) {
      setCurrentActivePanel(Constants.mapRenderEventActive.SINGLE);
    } else {
      setCurrentActivePanel(Constants.mapRenderEventActive.SINGLE);
    }
  };

  const setFilterEventByType = type => {
    setEventRouteActive(null);
    setCurrentActivePanel(Constants.mapRenderEventActive.MULTI);
    setEvents(type).then();
    resetMapCanvas();
  };

  const setEventSearch = term => {
    if (term && term.length > 2) {
      setEvents(null, term).then();
    }
  };
  const providerValue = {
    currentMapData,
    setCurrentMapData,
    map,
    setMap,
    setSingleEventFocus,
    currentActivePanel,
    currentMarkers,
    setCurrentMarkers,
    setEventRouteActive,
    eventRouteActive,
    resetMapEvents,
    renderPathTraceIndex,
    setRenderPathTraceIndex,
    setDrawnRouteIndexes,
    drawnRouteIndexes,
    setFilterEventByType,
    activeEventType,
    setEventSearch,
    homeMapFilterItemCounts
  };
  return (
    <MapContext.Provider value={providerValue}>{children}</MapContext.Provider>
  );
};

export const MapProviderPolar = ({
  children,
  isEventDetailPage,
  eventDetailPageData
}) => {
  // const router = useRouter();
  // const client = sanityClientHandle();
  // const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const [currentMapData, setCurrentMapData] = useState(initMapData);
  const [currentActivePanel, setCurrentActivePanel] = useState(
    Constants.mapRenderEventActive.MULTI
  );
  const [currentMarkers, setCurrentMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [eventRouteActive, setEventRouteActive] = useState(null);
  // useState(null);
  const [activeEventType, setActiveEventType] = useState(null);
  const [renderPathTraceIndex, setRenderPathTraceIndex] = useState(null);
  const [drawnRouteIndexes, setDrawnRouteIndexes] = useState([]);
  const [homeMapFilterItemCounts, setHomeMapFilterItemCounts] = useState(null);
  const setEvents = async (type, term) => {
    let eventCounts = {};
    let events = [];
    let apiRes = null;

    // let postData = {
    //   countryCode
    // };
    if (
      !type ||
      (type !== Constants.eventTypes.brandStoreEvent &&
        type !== Constants.eventTypes.people)
    ) {
      // const upperCountryName =
      //   countryCode === 'UK' || countryCode === 'uk'
      //     ? 'GB'
      //     : countryCode.toUpperCase();
      let countryFilters = `venue.address.countryCode eq 'GB' or venue.address.countryCode eq 'DE' or venue.address.countryCode eq 'NL' or venue.address.countryCode eq 'FR' or venue.address.countryCode eq 'FI' or venue.address.countryCode eq 'SE' or venue.address.countryCode eq 'NO' or venue.address.countryCode eq 'DK'`;
      let filterString = `${countryFilters} and customField.a9322dc7-8f7c-4d7e-b948-d4472ceb11ee contains 'Yes'`;

      if (type) {
        //postData['category'] = [type];
        filterString += ` and customField.3ed3342c-9e13-42ee-b757-f6c8727798df contains '${type}'`;
      }

      const headers = {
        'Content-Type': 'application/json'
      };

      const data = {
        request_type: 'POST',
        cvent_request_endpoint: `/events/filter?sort=start:DESC`,
        cvent_request_params: { filter: filterString }
      };

      if (isEventDetailPage) {
        apiRes = eventDetailPageData;
      } else {
        try {
          apiRes = await axios.post(
            `${Constants.basePath.EVENT}/orchestration/state/cventServerEndpoints`,
            data,
            {
              headers: headers
            }
          );
          if (apiRes && apiRes.data && apiRes.data.data) {
            apiRes.data.data.length > 0 &&
              apiRes.data.data.forEach(eventlist => {
                eventlist.customFields &&
                  eventlist.customFields.length > 0 &&
                  eventlist.customFields.forEach(e => {
                    if (e.name == 'BEP - Event Category') {
                      eventlist.latitude = eventlist.venues[0].address.latitude
                        ? eventlist.venues[0].address.latitude
                        : initMapData.center[1];
                      eventlist.longitude = eventlist.venues[0].address
                        .longitude
                        ? eventlist.venues[0].address.longitude
                        : initMapData.center[0];
                      eventlist.eventType = e.value[0];
                      if (eventCounts[eventlist.eventType]) {
                        eventCounts[eventlist.eventType] =
                          eventCounts[eventlist.eventType] + 1;
                      } else {
                        eventCounts[eventlist.eventType] = 1;
                      }
                      events.push(eventlist);
                    }
                  });
              });
          }
        } catch (error) {
          events = [];
        }

        if (type) {
          events = _.filter(events, { eventType: type });
        }
      }
    }

    if (term) {
      events = _.filter(events, e => {
        return e.title.indexOf(term) > -1;
      });
    }
    setActiveEventType(type);
    let eventData = {
      ...initMapData,
      center:
        events && events.length > 0
          ? [events[0].longitude, events[0].latitude]
          : initMapData.center,
      events,
      focusEvent: null
    };
    setCurrentMapData(eventData);

    if (!homeMapFilterItemCounts) {
      setHomeMapFilterItemCounts(eventCounts);
    }
  };

  const getEventDetails = async event => {
    const headers = {
      'Content-Type': 'application/json'
    };
    const data = {
      request_type: 'GET',
      cvent_request_endpoint: `/events/${event.id}`,
      cvent_request_params: {}
    };
    let apiRes = await axios.post(
      `${Constants.basePath.EVENT}/orchestration/state/cventServerEndpoints`,
      data,
      {
        headers: headers
      }
    );

    // let apiRes = await axios.post(
    //   `${Constants.basePath.EVENT}/orchestration/event/search`,
    //   { id: event.id }
    // );
    if (apiRes && apiRes.data && apiRes.data.id) {
      event['panelDetails'] = apiRes.data.id ? apiRes.data : null;
    }
    return event;
  };

  const getEventRoute = async event => {
    let apiRes = await axios.get(
      // `${Constants.basePath.EVENT}/orchestration/event/route`
      `https://owcda.s3.amazonaws.com/fjallraven-route-map/json/fcuk.json`
    );

    if (
      apiRes &&
      apiRes.data &&
      apiRes.data &&
      apiRes.data.features &&
      apiRes.data.features.length > 0
    ) {
      let featureWaypoints = _.find(apiRes.data.features, {
        id: 'waypoints'
      });
      let featureRoute = _.find(apiRes.data.features, { id: 'route' });
      event['wayPoints'] =
        featureWaypoints &&
        featureWaypoints.geometry &&
        featureWaypoints.geometry.coordinates
          ? featureWaypoints.geometry.coordinates
          : [];

      event['route'] =
        featureRoute &&
        featureRoute.geometry &&
        featureRoute.geometry.coordinates
          ? featureRoute.geometry.coordinates
          : [];

      const route = event['route'];
      let routeSplit = [];
      if (
        featureWaypoints &&
        featureWaypoints.properties &&
        featureWaypoints.properties.equiDistantIndexes
      ) {
        let equiDistantIndexes = featureWaypoints.properties.equiDistantIndexes;
        let prevIndex = 0;
        equiDistantIndexes.forEach(disIndex => {
          if (disIndex > 0) {
            routeSplit.push(route.slice(prevIndex, disIndex));
            prevIndex = disIndex + 1;
          }
        });
      }
      event['routeSplit'] = routeSplit;

      setEventRouteActive(event);
    }
  };

  useEffect(() => {
    setEvents().then();
  }, []);

  useEffect(() => {
    if (eventRouteActive) {
      let eventData = {
        ...currentMapData,
        events: [],
        focusEvent: null
      };
      setCurrentMapData(eventData);
      setCurrentActivePanel(Constants.mapRenderEventActive.ROUTE);
    }
  }, [eventRouteActive]);

  const resetMapCanvas = () => {
    if (window) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 5);
    }
  };

  const resetMapEvents = () => {
    setEventRouteActive(null);
    setCurrentActivePanel(Constants.mapRenderEventActive.MULTI);
    setEvents().then();
    resetMapCanvas();
  };

  const setSingleEventFocus = event => {
    let eventData = {
      ...currentMapData,
      center: [event.longitude, event.latitude],
      focusEvent: event
    };
    setCurrentMapData(eventData);

    if (
      _.includes(
        [
          Constants.updatedEventTypes.campfireEvent,
          Constants.updatedEventTypes.classicEvent,
          Constants.updatedEventTypes.store,
          Constants.updatedEventTypes.polarEvent,
          Constants.updatedEventTypes.fjallravenClassic
        ],
        event.eventType
      )
    ) {
      getEventDetails(event).then(eventDetails => {
        getEventRoute(eventDetails).then();
      });
    } else if (event.eventType === Constants.eventTypes.brandStoreEvent) {
      setCurrentActivePanel(Constants.mapRenderEventActive.SINGLE);
    } else {
      setCurrentActivePanel(Constants.mapRenderEventActive.SINGLE);
    }
  };

  const setFilterEventByType = type => {
    setEventRouteActive(null);
    setCurrentActivePanel(Constants.mapRenderEventActive.MULTI);
    setEvents(type).then();
    resetMapCanvas();
  };

  const setEventSearch = term => {
    if (term && term.length > 2) {
      setEvents(null, term).then();
    }
  };
  const providerValue = {
    currentMapData,
    setCurrentMapData,
    map,
    setMap,
    setSingleEventFocus,
    currentActivePanel,
    currentMarkers,
    setCurrentMarkers,
    setEventRouteActive,
    eventRouteActive,
    resetMapEvents,
    renderPathTraceIndex,
    setRenderPathTraceIndex,
    setDrawnRouteIndexes,
    drawnRouteIndexes,
    setFilterEventByType,
    activeEventType,
    setEventSearch,
    homeMapFilterItemCounts
  };
  return (
    <MapContext.Provider value={providerValue}>{children}</MapContext.Provider>
  );
};
