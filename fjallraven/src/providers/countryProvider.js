import axios from 'axios';
import * as _ from 'lodash';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import React from 'react';

import { Constants } from '../config/constants';

const initCountryData = Constants.defaultCountry;

const CountryContext = React.createContext(null);

export const useCountry = () => {
  const state = useContext(CountryContext);
  if (!state) {
    throw new Error('Error using call in context!');
  }
  return state;
};

export const CountryProvider = ({ children, countriesInit }) => {
  const router = useRouter();
  const [currentCountryData, setCurrentCountryData] = useState(initCountryData);
  const [lang, setLang] = useState(Constants.defaultCountry.lang);
  const [countries, setCountries] = useState(countriesInit || []);
  const [locations, setLocations] = useState([]);
  const [eventsStates, setEventsStates] = useState([]);

  useEffect(() => {
    const defaultCountry = _.find(countries, {
      code: router.query.code || Constants.defaultCountry.code
    });
    if (defaultCountry) {
      setCurrentCountryData(defaultCountry);
      setLang(router.query.lang || defaultCountry.lang);
    }
    fetchLocations().then();
    fetchEventLocation().then();
  }, [countries]);

  const genUrl = path => {
    if (path.startsWith('/')) {
      path = path.substring(1);
    }
    return `/${router.query.code || Constants.defaultCountry.code}/${
      router.query.lang || currentCountryData.lang
    }/${path}`;
  };
  const genUrlEu = path => {
    if (path.startsWith('/')) {
      path = path.substring(1);
    }
    let url = '';
    !router.query.code
      ? (url = '')
      : (url = `/${router.query.code || Constants.defaultCountry.code}/${
          router.query.lang || currentCountryData.lang
        }`);
    return `${url}/${path}`;
  };

  const fetchLocations = async () => {
    let routerCode = router.query.code === 'eu' ? 'uk' : router.query.code;
    let currentCountryCode =
      currentCountryData.code === 'eu' ? 'uk' : currentCountryData.code;
    const res = await axios.get(
      `${Constants.basePath.LOCATION}/orchestration/state/get?countryCode=${
        routerCode || currentCountryCode
      }`
    );
    let loc = [];
    if (res && res.data) {
      loc = res.data.data ? res.data.data : [];
      setLocations(loc);
    }
  };

  const fetchEventLocation = async () => {
    const res1 = await axios.get(
      `${Constants.basePath.LOCATION}/orchestration/state/get?countryCode=US`
    );
    const res2 = await axios.get(
      `${Constants.basePath.LOCATION}/orchestration/state/get?countryCode=CA`
    );
    let loc = [];
    if (res1 && res1.data && res2 && res2.data) {
      loc =
        res1.data.data && res2.data.data
          ? [...res1.data.data, ...res2.data.data]
          : [];
      setEventsStates(loc);
    }
  };

  const providerValue = {
    currentCountryData,
    setCurrentCountryData,
    countries,
    setCountries,
    lang,
    genUrl,
    genUrlEu,
    locations,
    eventsStates
  };
  return (
    <CountryContext.Provider value={providerValue}>
      {children}
    </CountryContext.Provider>
  );
};
