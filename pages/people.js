import { getCookie } from 'cookies-next';
import groq from 'groq';
import * as _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import BackButton from '../src/components/backButton';
import Layout from '../src/components/layout';
import ListHeader from '../src/components/listHeader';
import PageBreadcrumb from '../src/components/PageBreadcrumb';
import PeopleCard from '../src/components/peopleCard';
import PagePagination from '../src/components/peoplePagination';
import { Constants } from '../src/config/constants';
import sanityClientHandle from '../src/config/sanityClient';
import { langToURI, uriToLang } from '../src/config/utils';
import {
  getMenuItems,
  getPeopleCategoryTags,
  getPeopleLists,
  getPeopleStatesList
} from '../src/services/sanity';
import styles from '../src/styles/peopleTopBanner.module.css';

const getQueryParam = url => {
  const qs = url.substring(url.indexOf('?') + 1).split('&');
  let result = { id: '', category: '' };
  for (let i = 0; i < qs.length; i++) {
    qs[i] = qs[i].split('=');
    result[qs[i][0]] = decodeURI(qs[i][1]);
  }
  return result;
};
const Peoples = ({
  page,
  siteSettings,
  countries,
  menuItems,
  userId,
  peopleCategoryList,
  peopleCategoryTags,
  peopleCountryList,
  peoplecountriesLists,
  peopleStateLists
}) => {
  const client = sanityClientHandle();
  const router = useRouter();
  const queryParam = getQueryParam(router.asPath);
  let categoryId = !_.isEmpty(router.query.category)
    ? router.query.category.replace('_', ' ')
    : queryParam.category.replace('_', ' ');
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
    { link: genUrl('/people'), label: 'All People' }
  ];
  const countryCode = router.query.code || Constants.defaultCountry.code;
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const langUri = langToURI(lang || Constants.defaultCountry.lang);
  const [peoples, setPeoples] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [searchInit, setSearchInit] = useState(false);
  let pageSize = 6;
  const [filters, setFilters] = useState({});
  const [currWindowWidth, setCurrWindowWidth] = useState(900);
  let startCount = 0;
  let endCount = pageSize;
  useEffect(() => {
    fetchSanityPeople().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    setFilters({
      ...filters
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curPage]);

  const fetchSanityPeople = async () => {
    if (window.innerWidth < 700) {
      setCurrWindowWidth(window.innerWidth);
      pageSize = 4; // It will kept +1 for this default pageSize. Example this will fetch 5 records.
    }
    startCount = (curPage - 1) * pageSize;
    endCount = startCount + pageSize;
    // let tempPage = 1;

    if (
      filters.searchTerm ||
      (filters.category && !_.isEmpty(filters.category)) ||
      categoryId ||
      (filters.country && !_.isEmpty(filters.country)) ||
      (filters.state && !_.isEmpty(filters.state))
    ) {
      let filterStirng = '';
      let tempPage = 1;
      if (filters.searchTerm) {
        if (searchInit) tempPage = 1;
        else {
          tempPage = curPage - 1 > 1 ? curPage - 1 : curPage;
        }
        startCount = (tempPage - 1) * pageSize;
        endCount = startCount + pageSize;
        filterStirng = filterStirng + `&& Name match "${filters.searchTerm}*"`;
      }
      if (filters.category && filters.category.length > 0) {
        filterStirng =
          filterStirng +
          `&& peoplecategorytype[]._ref match ["${filters.category}"]`;
      }
      if (filters.country && filters.country.length > 0) {
        // console.log('Hiiiiiiiiiiiiiiiiii');
        filterStirng =
          filterStirng + `&& country._ref match ["${filters.country}"]`;
      }
      if (filters.state && filters.state.length > 0) {
        filterStirng =
          filterStirng + `&& state[]._ref match ["${filters.state}"]`;
      }

      const peopleFiltersData = await client.fetch(
        groq`*[_type == "people" && !(_id in path('drafts.**')) ${filterStirng}][${startCount}...${endCount}]`
      );
      const peopleFiltersDataLength = await client.fetch(
        groq`count(*[_type == "people" && !(_id in path('drafts.**')) ${filterStirng}])`
      );
      setPeoples(peopleFiltersData);
      setTotalCount(peopleFiltersDataLength);
    } else {
      setPeoples([]);
      setTotalCount(0);

      //   if (_.isEmpty(filters.category) && !filters.category) {
      //     setPeoples([]);
      //     setTotalCount(0);
      //   }
      //   const peopleFiltersData = await client.fetch(
      //     groq`*[_type == "people" && !(_id in path('drafts.**'))][${startCount}...${endCount}]`
      //   );
      //   const peopleFiltersDataLength = await client.fetch(
      //     groq`count(*[_type == "people" && !(_id in path('drafts.**'))])`
      //   );
      //   setPeoples(peopleFiltersData);
      //   setTotalCount(peopleFiltersDataLength);
    }
  };

  const filterCallback = newFilter => {
    if (
      newFilter.searchTerm ||
      (newFilter.category && newFilter.category.length > 0) ||
      newFilter.stateName
    )
      setSearchInit(true);
    setFilters({
      ...filters,
      ...newFilter
    });
  };
  const noResults = _.get(
    siteSettings && siteSettings.terms && siteSettings.terms.searchResults,
    lang,
    'No Results'
  );
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
            <BackButton href={genUrl(`people`)} />
            <PageBreadcrumb breadcrumbs={breadcrumbs} />
          </div>
        </div>
        {page && (
          <ListHeader
            title={page.title[lang]}
            subtitle={page.subtitle[lang]}
            type={'people'}
            filterCallback={filterCallback}
            userId={userId}
            dataCount={totalCount}
            filterData={peopleCategoryList}
            countryCode={countryCode}
            peopleCountryList={peopleCountryList}
            peoplecountriesLists={peoplecountriesLists}
            peopleStatesList={peopleStateLists}
          />
        )}

        <div className="container">
          <div className="row">
            <PeopleCard
              noResults={noResults}
              people={peoples}
              peopleCategoryList={peopleCategoryList}
              peopleCategoryTags={peopleCategoryTags}
              peopleCountryList={peopleCountryList}
              peoplecountriesLists={peoplecountriesLists}
            />
          </div>
        </div>

        {totalCount > 0 && (
          <div className="container">
            <div className="row">
              <PagePagination
                totalResults={totalCount}
                activePage={curPage}
                perPage={currWindowWidth < 700 ? 5 : pageSize}
                setCurPage={setCurPage}
                setSearchInit={setSearchInit}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

Peoples.getInitialProps = async function (context) {
  const countryCode = context.query.code || Constants.defaultCountry.code;
  const lang = context.query.lang || Constants.defaultCountry.lang;
  const userId = context.query.id || '';
  const client = sanityClientHandle();
  const query = groq`*[_type == "pagesListing" && _id=="peopleListing"]`;
  const pages = await client.fetch(query);
  const siteSettingsQuery = groq`*[_type == "siteSettings" && _id=="siteSettings"]`;
  const siteSettings = await client.fetch(siteSettingsQuery);
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
  const peopleStatesList = await getPeopleStatesList(client);
  const peopleLists = await getPeopleLists(client);
  const peopleStateLists = peopleStatesList.filter(o1 =>
    peopleLists.some(
      o2 => _.get(o2.state && o2.state[0], '_ref', '') === _.get(o1, '_id', '')
    )
  );

  const peopleCategoryListWithOutFilters = await client.fetch(
    groq`*[_type == "peoplecategorytype" && !(_id in path("drafts.*"))]`
  );

  const peopleCategoryList = peopleCategoryListWithOutFilters.filter(o1 =>
    peopleLists.some(
      o2 =>
        _.get(o2.peoplecategorytype && o2.peoplecategorytype[0], '_ref', '') ===
        _.get(o1, '_id', '')
    )
  );
  const queryCountry = groq`*[_type == "country"]{code, flag, lang, title}`;
  const countriesList = await client.fetch(queryCountry);
  const menuItems = await getMenuItems(client);
  const countries = groq`*[_type == "countryData" && !(_id in path('drafts.**'))]`;
  const peoplecountriesLists = await client.fetch(countries);
  // const peopleCategoryList = await getPeopleCategoryList(client);
  const peopleCategoryTags = await getPeopleCategoryTags(client);

  return {
    userStatus,
    userIdDataId,
    menuItems,
    page: pages && pages.length > 0 ? pages[0] : null,
    siteSettings:
      siteSettings && siteSettings.length > 0 ? siteSettings[0] : null,
    countries: countriesList,
    userId,
    peopleCategoryList,
    peopleCategoryTags,
    peoplecountriesLists,
    peopleStateLists
  };
};

export default Peoples;
