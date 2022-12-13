import axios from 'axios';
import { getCookie } from 'cookies-next';
import groq from 'groq';
import * as _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import BackButton from '../../../src/components/backButton';
import EventCard from '../../../src/components/eventCard';
import Layout from '../../../src/components/layout';
import ListHeader from '../../../src/components/listHeader';
import PageBreadcrumb from '../../../src/components/PageBreadcrumb';
import { Constants } from '../../../src/config/constants';
import sanityClientHandle from '../../../src/config/sanityClient';
import {
  getCookieValue,
  langToURI,
  uriToLang
} from '../../../src/config/utils';
import {
  getMenuItems,
  getPeopleStatesList
} from '../../../src/services/sanity';
import styles from '../../../src/styles/peopleTopBanner.module.css';

// const getQueryParam = url => {
//   const qs = url.substring(url.indexOf('?') + 1).split('&');
//   let result = { id: '', category: '' };
//   for (let i = 0; i < qs.length; i++) {
//     qs[i] = qs[i].split('=');
//     result[qs[i][0]] = decodeURI(qs[i][1]);
//   }
//   return result;
// };

const Events = ({
  page,
  siteSettings,
  countries,
  menuItems,
  userId,
  heroData,
  peoplecountriesLists,
  peopleStatesList
}) => {
  const router = useRouter();
  // const queryParam = getQueryParam(router.asPath);
  // const categoryId = !_.isEmpty(router.query.category)
  //   ? router.query.category
  //   : queryParam.category;
  const [cvents, setCvents] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [categoryUUID, setCategoryUUID] = useState({});
  const countryCode = router.query.code || Constants.defaultCountry.code;
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const langUri = langToURI(lang || Constants.defaultCountry.lang);
  const [tags, setTags] = useState([]);
  const genUrl = path => {
    if (path.startsWith('/')) {
      path = path.substring(1);
    }
    return `/${router.query.code || Constants.defaultCountry.code}/${
      router.query.lang || Constants.defaultCountry.lang
    }/${path}`;
  };
  const breadcrumbs = [
    { link: genUrl('/'), label: 'Home' },
    { link: genUrl('/events'), label: 'All Upcoming Event' }
  ];

  const [filters, setFilters] = useState({
    countryCode: router.query.code || Constants.defaultCountry.code,
    page: curPage,
    size: 6
  });

  useEffect(() => {
    fetchCvents().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    // if(filters.searchTerm || (filters.category && filters.category.length >= 0)) setCurPage(1);
    fetchEventsFilteredTag();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const pagingEventsList = (getCurrentPage, pageAction) => {
    let getTokenVal = '';
    if (pageAction === 'previous') {
      setCurPage(getCurrentPage);
      getTokenVal = getCookieValue('prevToken' + getCurrentPage);
    } else if (pageAction === 'next') {
      setCurPage(getCurrentPage);
      getTokenVal = getCookieValue('nxtToken');
    }
    setFilters({
      ...filters,
      token: getTokenVal
    });
  };

  const categoryExists = (id, arr) => {
    return arr.some(function (el) {
      return el.id === id;
    });
  };

  const fetchCvents = async () => {
    if (window.innerWidth < 700) {
      filters.size = 3;
    } else {
      filters.size = 6;
    }
    let currentTime = new Date();
    // returns the month (from 0 to 11)
    let currentMonth = currentTime.getMonth() + 1;
    // returns the year (four digits)
    let currentYear = currentTime.getFullYear();
    // let showEventsOnBep = `customField.id eq a9322dc7-8f7c-4d7e-b948-d4472ceb11ee `;

    let filterString = `customField.a9322dc7-8f7c-4d7e-b948-d4472ceb11ee contains 'Yes' and start ge '${currentYear}-${
      currentMonth.toString().length == 1 ? '0' + currentMonth : currentMonth
    }-01T00:00:00.000Z'`;

    const filtersCountryArrayLength =
      filters.country && filters.country.length > 0
        ? filters.country.length
        : 0;
    if (filters.country && filters.country.length > 0) {
      let finalData = [];
      filters.country.map(el => {
        const countryName = _.find(peoplecountriesLists, { _id: el });
        if (!_.isEmpty(countryName) && countryName.code) {
          finalData.push(_.toUpper(countryName.code));
        }
      });

      if (finalData.length > 1) {
        let dataAppend = '';
        finalData &&
          finalData.map((el, index) => {
            dataAppend += ` venue.address.countryCode eq '${el}'`;
            if (index < finalData.length - 1) {
              dataAppend += ' or';
            }
          });
        filterString += ` and (${dataAppend})`;
      } else if (finalData.length == 1) {
        let dataAppend = `venue.address.countryCode eq '${finalData[0]}'`;
        filterString += ` and ${dataAppend}`;
      }
    }

    if (filters.state && filters.state.length > 0) {
      let finalData = [];
      filters.state.map(el => {
        const stateName = _.find(peopleStatesList, { _id: el });
        if (!_.isEmpty(stateName) && stateName.regions) {
          finalData.push(stateName.regions);
        }
      });

      filterString += ' and ';
      finalData.map((el, index) => {
        filterString += ` venue.address.countryCode eq '${el}'`;
        if (index < filtersCountryArrayLength - 1) filterString += ' or';
      });
    }

    // if (filters.country && filters.country.length > 0) {
    //   let filterStringCountry = '';
    //   let filtersData = filters.country;
    //   filtersData.map(el => {
    //     filterStringCountry =
    //       filterStringCountry + `and venue.address.countryCode eq '${el}' or`;
    //   });
    //   console.log('filterStringCountry::::::::::', filterStringCountry);
    // }
    if (filters.searchTerm) {
      filterString += ` and customField.${categoryUUID.SearchTitle} contains '${filters.searchTerm}'`;
    }

    if (filters.month) {
      const lastDateofSelectedMonth = new Date(
        filters.year,
        filters.month,
        0
      ).getDate();
      filterString += ` and start ge '${filters.year}-${
        filters.month.toString().length == 1
          ? '0' + filters.month
          : filters.month
      }-01T00:00:00.000Z' and start le '${filters.year}-${
        filters.month.toString().length == 1
          ? '0' + filters.month
          : filters.month
      }-${lastDateofSelectedMonth}T18:29:59.999Z'`;
    }

    const filtersCategoryArrayLength =
      filters.category && filters.category.length > 0
        ? filters.category.length
        : 0;
    if (filtersCategoryArrayLength > 0) {
      filterString += ' and (';
      filters.category.map((category, index) => {
        filterString += ` customField.${categoryUUID.EventCategory} eq '${category}'`;
        if (index < filtersCategoryArrayLength - 1) filterString += ' or';
      });
      filterString += ' )';
    }

    let makingQuerySTring = `limit=${filters.size}&sort=start:ASC`;
    if (filters.token) {
      makingQuerySTring += `&token=${filters.token}`;
    }
    const headers = {
      'Content-Type': 'application/json'
    };
    const data = {
      request_type: 'POST',
      cvent_request_endpoint: `/events/filter?${makingQuerySTring}`,
      cvent_request_params: { filter: filterString }
    };
    let cventCountRes = [];

    cventCountRes = await axios.post(
      `${Constants.basePath.EVENT}/orchestration/state/cventServerEndpoints`,
      data,
      {
        headers: headers
      }
    );
    let cventData = [];
    let cventToken = {};
    if (cventCountRes && cventCountRes.data && cventCountRes.data.data) {
      cventData =
        cventCountRes.data.data && _.isArray(cventCountRes.data.data)
          ? cventCountRes.data.data
          : [];
      cventToken = cventCountRes.data.paging ? cventCountRes.data.paging : {};
      setTotalCount(cventToken.totalCount);
      document.cookie = `prevToken${curPage}=${cventToken.currentToken}`;
      document.cookie = `nxtToken=${cventToken.nextToken}`;
      setCvents([...cventData]);
      setTotalPages(Math.ceil(cventToken.totalCount / filters.size));
    }
    if (_.isEmpty(filters.state) && _.isEmpty(filters.country)) {
      setCvents([]);
    }
  };

  const filterCallback = newFilter => {
    if (curPage > 1) {
      delete filters.token;
    }
    setCurPage(1);
    setFilters({
      ...filters,
      ...newFilter
    });
  };

  const categoryCallback = categoryIdObj => {
    setCategoryUUID({
      ...categoryUUID,
      ...categoryIdObj
    });
  };

  const noResults = _.get(
    siteSettings && siteSettings.terms && siteSettings.terms.searchResults,
    lang,
    'No Results'
  );

  const fetchEventsFilteredTag = () => {
    const filteredData = [
      { id: 'Campfire' },
      { id: 'Store' },
      { id: 'Classic' },
      { id: 'Polar' }
    ];
    let customFilterSet = [];
    _.isArray(filteredData) &&
      filteredData.length > 0 &&
      filteredData.map(event => {
        if (event && event.id) {
          let evetCatValue = event.id.toLowerCase();
          if (evetCatValue == Constants.eventTypes.store.toLowerCase()) {
            !categoryExists(Constants.eventTypes.store, customFilterSet) &&
              customFilterSet.push({
                id: Constants.eventTypes.store,
                attrid: Constants.eventTypes.store,
                title: siteSettings.eventCategory.store[lang]
              });
          } else if (
            evetCatValue == Constants.eventTypes.campfireEvent.toLowerCase()
          ) {
            !categoryExists(
              Constants.eventTypes.campfireEvent,
              customFilterSet
            ) &&
              customFilterSet.push({
                id: Constants.eventTypes.campfireEvent,
                attrid: Constants.eventTypes.campfireEvent,
                title: siteSettings.eventCategory.campfireEvent[lang]
              });
          } else if (
            evetCatValue == Constants.eventTypes.classicEvent.toLowerCase()
          ) {
            !categoryExists(
              Constants.eventTypes.classicEvent,
              customFilterSet
            ) &&
              customFilterSet.push({
                id: Constants.eventTypes.classicEvent,
                attrid: Constants.eventTypes.classicEvent,
                title: siteSettings.eventCategory.classicEvent[lang]
              });
          } else if (
            evetCatValue == Constants.eventTypes.polarEvent.toLowerCase()
          ) {
            !categoryExists(Constants.eventTypes.polarEvent, customFilterSet) &&
              customFilterSet.push({
                id: Constants.eventTypes.polarEvent,
                attrid: Constants.eventTypes.polarEvent,
                title: siteSettings.eventCategory.polarEvent[lang]
              });
          } else if (
            evetCatValue == Constants.eventTypes.brandStoreEvent.toLowerCase()
          ) {
            !categoryExists(
              Constants.eventTypes.brandStoreEvent,
              customFilterSet
            ) &&
              customFilterSet.push({
                id: Constants.eventTypes.brandStoreEvent,
                attrid: Constants.eventTypes.brandStoreEvent,
                title: siteSettings.eventCategory.brandStoreEvent[lang]
              });
          }
        }
      });
    setTags(customFilterSet);
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
      <div className={'page-events'}>
        <div className="d-flex breadcrumpContainer pt-1">
          <div className={`pl-3 d-flex ${styles.breadcrumbContent}`}>
            <BackButton href={genUrl(`events`)} />
            <PageBreadcrumb breadcrumbs={breadcrumbs} />
          </div>
        </div>
        {page && (
          <ListHeader
            title={page.title[lang]}
            peoplecountriesLists={peoplecountriesLists}
            peopleStatesList={peopleStatesList}
            subtitle={page.subtitle[lang]}
            type={'event'}
            filterCallback={filterCallback}
            userId={userId}
            dataCount={cvents.length}
            filterData={tags}
            countryCode={countryCode}
          />
        )}

        <div className="container">
          <div className="row">
            {cvents && cvents.length == 0 ? (
              <div className={`noresults`}>{noResults}</div>
            ) : (
              cvents.map(cvent => (
                <EventCard
                  heroImage={heroData}
                  key={cvent.code}
                  event={cvent}
                  categoryCallback={categoryCallback}
                  userId={userId}
                />
              ))
            )}
          </div>
        </div>
        {totalCount > 0 && (
          <div className="container">
            <div className="row cvent-pagination-container">
              <div className="cventpagination">
                <span
                  className={`${curPage <= 1 ? 'disablePagination' : ''}`}
                  onClick={() =>
                    curPage > 1
                      ? pagingEventsList(curPage - 1, 'previous')
                      : null
                  }
                >
                  ❮
                </span>
                <span
                  className={`${
                    curPage >= totalPages ? 'disablePagination' : ''
                  }`}
                  onClick={() =>
                    totalPages > 1 && curPage <= totalPages
                      ? pagingEventsList(curPage + 1, 'next')
                      : null
                  }
                >
                  ❯
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

Events.getInitialProps = async function (context) {
  const client = sanityClientHandle();
  const lang = context.query.lang || Constants.defaultCountry.lang;
  const countryCode = context.query.code || Constants.defaultCountry.code;
  const userId = context.query.id || '';
  const query = groq`*[_type =="pagesListing" && _id=="eventListing"]`;
  const pages = await client.fetch(query);
  const queryHero = groq`*[_type == "page" && _id=="frontpage"]{backgroundImage}`;
  const heroData = await client.fetch(queryHero);
  const siteSettingsQuery = groq`*[_type == "siteSettings" && _id=="siteSettings"]`;
  const siteSettings = await client.fetch(siteSettingsQuery);
  let { req, res } = context;
  const userIdDataId = getCookie('activeUserId', { req, res });
  let userStatus = {};
  const countries = groq`*[_type == "countryData" && !(_id in path('drafts.**'))]`;
  const peoplecountriesLists = await client.fetch(countries);
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
  const queryCountry = groq`*[_type == "country"]{code, flag, lang, title}`;
  const peopleStatesList = await getPeopleStatesList(client);
  const countriesList = await client.fetch(queryCountry);
  const menuItems = await getMenuItems(client);
  return {
    menuItems,
    userIdDataId,
    userStatus,
    page: pages && pages.length > 0 ? pages[0] : null,
    siteSettings:
      siteSettings && siteSettings.length > 0 ? siteSettings[0] : null,
    countries: countriesList,
    userId,
    heroData,
    peoplecountriesLists,
    peopleStatesList
  };
};

export default Events;
