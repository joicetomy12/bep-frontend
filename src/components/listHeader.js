import * as _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import styles from '../../src/styles/listHeader.module.css';
import { Constants } from '../config/constants';
import { sanityUrlFor } from '../config/sanityUrlFor';
import { getMonths, replaceMultiple, uriToLang } from '../config/utils';
// import { getcustomFieldsIdandValue } from '../config/utils';
import { useCountry } from '../providers/countryProvider';
import { useGlobal } from '../providers/globalProvider';
import BackButton from './backButton';
import ListEvent from './listEvents';
import ListLocationTag from './listLocationTag';
import ListTag from './listTag';
import PageBreadcrumb from './PageBreadcrumb';
const getQueryParam = url => {
  const qs = url.substring(url.indexOf('?') + 1).split('&');
  let result = { id: '', category: '' };
  for (let i = 0; i < qs.length; i++) {
    qs[i] = qs[i].split('=');
    result[qs[i][0]] = decodeURI(qs[i][1]);
  }
  return result;
};
const ListHeader = ({
  title,
  subtitle,
  type,
  filterCallback,
  imgURL,
  filterData,
  peopleStatesList,
  peoplecountriesLists
}) => {
  const router = useRouter();
  const queryParam = getQueryParam(router.asPath);
  let categoryId = !_.isEmpty(router.query.category)
    ? replaceMultiple(router.query.category)
    : replaceMultiple(queryParam.category);

  const { siteSettings, isMobile } = useGlobal();
  const isEventListing = type === 'event' ? true : false;
  const isArticleListing = type === 'article' ? true : false;
  const isPeopleListing = type === 'people' ? true : false;
  const [filterTags, setFilterTags] = useState([]);
  const [selectedFilterTags, setSelectedFilterTags] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedLocaxtion, setSelectedLocation] = useState();
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const months = getMonths(11);
  const countryCode = router.query.code || Constants.defaultCountry.code;
  const { currentCountryData, eventsStates, locations } = useCountry();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  let peopleCatSubmenuData = '';
  if (isPeopleListing && !_.isEmpty(categoryId)) {
    peopleCatSubmenuData = _.find(filterData, e => e.name[lang] === categoryId);
  } else {
    peopleCatSubmenuData = '';
  }
  let peopleCountryData = '';
  if (isPeopleListing && !_.isEmpty(countryCode)) {
    peopleCountryData = _.find(peoplecountriesLists, {
      // code: countryCode.toUpperCase()
      code:
        countryCode.toUpperCase() === 'UK' ? 'GB' : countryCode.toUpperCase()
    });
  } else {
    peopleCountryData = '';
  }

  let eventData = '';
  if (isEventListing && !_.isEmpty(countryCode)) {
    eventData = _.find(peoplecountriesLists, {
      code:
        countryCode.toUpperCase() === 'UK' ? 'GB' : countryCode.toUpperCase()
    });
  } else {
    eventData = '';
  }
  const genUrl = path => {
    if (path.startsWith('/')) {
      path = path.substring(1);
    }
    return `/${router.query.code || Constants.defaultCountry.code}/${
      router.query.lang || currentCountryData.lang
    }/${path}`;
  };
  const breadcrumbs = [
    { link: genUrl('/'), label: 'Home' },
    { link: genUrl('/articles'), label: 'All Articles' }
  ];

  const debouncedFetchApi = _.debounce(
    term => filterCallback({ searchTerm: term }),
    1000
  );
  const debouncedCategoryFetchApi = _.debounce(
    (selectedFilterTags, selectedStates, selectedCountries) =>
      filterCallback({
        category: selectedFilterTags,
        state: selectedStates,
        country: selectedCountries
      }),
    2000
  );

  const search = term => {
    debouncedFetchApi(term);
    // filterCallback({ searchTerm: term });
  };
  const monthChange = (m, index) => {
    filterCallback({ month: m.month, year: m.year });
    setSelectedMonth(index);
  };
  const locationChange = loc => {
    if (isEventListing || isPeopleListing)
      filterCallback({ stateName: loc.stateName });
    else filterCallback({ stateId: loc.id });
    setSelectedLocation(loc.id);
  };
  const categoryExists = (id, arr) => {
    return arr.some(function (el) {
      return el.id === id;
    });
  };

  //
  //starting of setting filter tags to display on listheader panel for people,event,articles
  useEffect(() => {
    if (isEventListing) {
      setFilterTags(filterData);
    }
    if (isPeopleListing) {
      let customPeopleFilterSet = [];
      _.isArray(filterData) &&
        filterData.length > 0 &&
        filterData.map(peopleData => {
          if (peopleData._type) {
            const idGeneratedValue = _.get(peopleData, '_id', '');
            !categoryExists(peopleData._type, customPeopleFilterSet) &&
              !_.isEmpty(_.get(peopleData.name, lang, '')) &&
              customPeopleFilterSet.push({
                id: _.get(peopleData, '_id', ''),
                attrid: idGeneratedValue,
                title: _.get(peopleData.name, lang, '')
              });
          }
        });

      setFilterTags(customPeopleFilterSet);
    }

    if (isArticleListing) {
      setFilterTags(filterData);
    }
  }, [filterData]);

  //End of setting filter tags to display on listheader panel for people,event,articles
  //
  //
  //Setting tag change functionality for people,event,articles

  //For Articles
  useEffect(() => {
    if (isArticleListing && !_.isEmpty(categoryId)) {
      setTimeout(() => {
        const idGeneratedValue = categoryId.replace(/ /g, '_');
        tagChange(
          {
            id: categoryId,
            attrid: idGeneratedValue,
            title: categoryId
          },
          true
        );
      }, 300);
    }
  }, [router]);

  //For Events
  useEffect(() => {
    if (isEventListing && !_.isEmpty(categoryId)) {
      setTimeout(() => {
        const idGeneratedValue = categoryId.replace(/ /g, '_');
        tagChange(
          {
            id: categoryId,
            attrid: idGeneratedValue,
            title: categoryId
          },
          true
        );
      }, 300);
    }
  }, [router]);
  //For People tag change
  useEffect(() => {
    if (
      isPeopleListing &&
      !_.isEmpty(categoryId) &&
      !_.isEmpty(peopleCatSubmenuData)
    ) {
      setTimeout(() => {
        tagChange(
          {
            id: peopleCatSubmenuData._id,
            attrid: peopleCatSubmenuData._id,
            title: _.get(peopleCatSubmenuData, lang, '')
          },
          true
        );
      }, 300);
    }
  }, [router]);

  //All selection filters peoples
  useEffect(() => {
    if (isPeopleListing && _.isEmpty(categoryId)) {
      setTimeout(() => {
        allSelectFilterTags(filterTags);
      }, 300);
    }
  }, [filterTags]);

  //All selection filters articles
  useEffect(() => {
    if (isArticleListing && _.isEmpty(categoryId)) {
      setTimeout(() => {
        allSelectFilterTags(filterData);
      }, 300);
    }
  }, [filterData]);

  //All selection filters events
  useEffect(() => {
    if (isEventListing && _.isEmpty(categoryId)) {
      setTimeout(() => {
        allSelectFilterTags(filterData);
      }, 300);
    }
  }, [filterData]);

  //Selection of default country on people
  useEffect(() => {
    if (isPeopleListing && countryCode !== 'eu') {
      const id = _.get(peopleCountryData, '_id', '');
      setTimeout(() => {
        countrySelection(true, id);
      }, 300);
    } else if (isPeopleListing && countryCode === 'eu') {
      setTimeout(() => {
        all(true);
      }, 300);
    }
  }, [router]);

  //Selection of default country on events
  useEffect(() => {
    if (isEventListing && !_.isEmpty(eventData) && countryCode !== 'eu') {
      const id = _.get(eventData, '_id', '');
      setTimeout(() => {
        countrySelection(true, id);
      }, 300);
    } else if (!isArticleListing) {
      let countryLists = [];
      peoplecountriesLists.map(country => {
        countryLists.push(country._id);
      });
      setSelectedCountries(countryLists);
    }
  }, [router]);

  useEffect(() => {
    // filterCallback({ category: selectedFilterTags });
    debouncedCategoryFetchApi(
      selectedFilterTags,
      selectedStates,
      selectedCountries
    );
  }, [selectedFilterTags, selectedStates, selectedCountries]);

  const tagChange = (tag, checked) => {
    if (checked) {
      setSelectedFilterTags([...selectedFilterTags, tag.id]);
    } else {
      let selectedFilters = [...selectedFilterTags];
      let index = selectedFilters.indexOf(tag.id);
      if (index > -1) {
        selectedFilters.splice(index, 1);
        setSelectedFilterTags(selectedFilters);
      }
    }
  };

  const countrySelection = (checked, country) => {
    if (checked) {
      setSelectedCountries([...selectedCountries, country]);
    } else {
      let selectedFilters = [...selectedCountries];
      let index = selectedFilters.indexOf(country);
      if (index > -1) {
        selectedFilters.splice(index, 1);
        setSelectedCountries(selectedFilters);
      }
    }
  };

  const all = check => {
    if (check) {
      let countryLists = [];
      peoplecountriesLists.map(country => {
        countryLists.push(country._id);
      });
      let filterIds = [];
      filterTags.map(el => {
        filterIds.push(el.id);
      });
      setSelectedFilterTags(filterIds);
      setSelectedCountries(countryLists);
    } else {
      // const defaultId = _.get(peopleCountryData, '_id', '');
      // let countryLists = [];
      // setSelectedFilterTags([]);
      setSelectedCountries([]);
    }
  };

  // const allEvents = check => {
  //   if (check) {
  //     let countryLists = [];
  //     Constants.mappedCountriesNames.map(country => {
  //       countryLists.push(country.id);
  //     });
  //     setSelectedCountries(countryLists);
  //   } else {
  //     const defaultId = eventData.id;
  //     let countryLists = [];
  //     setSelectedCountries([...countryLists, defaultId]);
  //   }
  // };

  const allSelectFilterTags = filterTags => {
    let filterIds = [];
    filterTags.map(el => {
      filterIds.push(el.id);
    });
    setSelectedFilterTags(filterIds);
  };
  const stateSelection = (checked, state) => {
    if (checked) {
      setSelectedStates([...selectedStates, state]);
    } else {
      let selectedFilters = [...selectedStates];
      let index = selectedFilters.indexOf(state);
      if (index > -1) {
        selectedFilters.splice(index, 1);
        setSelectedStates(selectedFilters);
      }
    }
  };

  return (
    <div
      className={
        styles.pageListHeader +
        (isArticleListing ? ' ' + styles.noTopPadding : '')
      }
    >
      {isArticleListing && (
        <>
          <div className="d-flex breadcrumpContainer pt-1">
            <div className={`pl-3 d-flex ${styles.breadcrumbContent}`}>
              <BackButton href={genUrl(`event`)} />
              <PageBreadcrumb
                breadcrumbs={breadcrumbs}
                className={'breadcrumbBlack'}
              />
            </div>
          </div>
          <div className={styles.heroSection}>
            <img
              src={sanityUrlFor(imgURL?.asset, currentCountryData.code)
                .auto('format')
                .width(1384)
                .height(438)
                .url()}
              alt=""
              className="img-fluid fadeIn cssanimation"
            />

            <div
              className={`position-absolute w-100 m-auto ${styles.bannerContent}`}
            >
              <div className="container text-center">
                {isArticleListing ? (
                  <h2
                    style={{ color: '#ffff' }}
                    className="fadeInBottom cssanimation"
                  >
                    {title}
                  </h2>
                ) : (
                  <h2 className="fadeInBottom cssanimation">this</h2>
                )}
                <p className="bannerTextSmall fadeInBottom cssanimation ">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {isPeopleListing ? (
        <div className="container">
          {!isArticleListing && (
            <>
              <h2>{title}</h2>
              <p style={{ color: '#303030' }}>{subtitle}</p>
            </>
          )}
          <div
            className={`d-flex flex-wrap ${
              isMobile
                ? styles.justifyContentLeftMobile
                : 'justify-content-center'
            }`}
          >
            {/* LOCATION drop Down */}
            {/* <div className={'d-flex dropdown-filter'}>
              <div className="mr-2 flex-fill">
                <div className={`dropdown ${styles.whiteDropdown}`}>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdownMenu2">
                      <img
                        src="/assets/images/icons/location.svg"
                        alt="flag"
                        className="mx-2"
                      />{' '}
                      {siteSettings?.terms?.location[lang]}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {locations &&
                        locations.map(loc => (
                    
                          <Dropdown.Item
                            key={indexVal}
                            eventKey={loc.id}
                            onSelect={() => locationChange(loc)}
                            className={
                              loc.id === selectedLocaxtion ? 'active' : ''
                            }
                          >
                           {loc.stateName}
                          </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>  */}
            <div className={'d-flex dropdown-filter'}>
              <div className="mr-2 flex-fill">
                <ListLocationTag
                  peoplecountriesLists={peoplecountriesLists}
                  peopleStatesList={peopleStatesList}
                  onStateChange={stateSelection}
                  onCountryChange={countrySelection}
                  selectedStates={selectedStates}
                  all={all}
                  selectedCountries={selectedCountries}
                />
              </div>
            </div>

            <div className={`search-filter ${styles.searchFilterContainer}`}>
              <input
                type="text"
                className={`${styles.searchBox} search-filter-input`}
                placeholder={_.upperCase(
                  siteSettings.terms ? siteSettings.terms?.search[lang] : ''
                )}
                onChange={e => search(e.target.value)}
              />
            </div>
          </div>
          <div className="py-3">
            <div
              className={`d-flex flex-wrap ${
                isMobile
                  ? styles.justifyContentLeftMobile
                  : 'justify-content-center'
              }`}
            >
              {filterTags.map(tag => (
                <ListTag
                  tag={tag}
                  key={tag.id}
                  selectedFilterTags={selectedFilterTags}
                  onChange={tagChange}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          {!isArticleListing && (
            <>
              <h2>{title}</h2>
              <p style={{ color: '#303030' }}>{subtitle}</p>
            </>
          )}
          <div
            className={`d-flex flex-wrap ${
              isMobile
                ? styles.justifyContentLeftMobile
                : 'justify-content-center'
            }`}
          >
            {!isArticleListing && (
              <div className="mr-2">
                <ListEvent
                  peoplecountriesLists={peoplecountriesLists}
                  peopleStatesList={peopleStatesList}
                  onStateChange={stateSelection}
                  onCountryChange={countrySelection}
                  selectedStates={selectedStates}
                  all={all}
                  selectedCountries={selectedCountries}
                  countries={Constants.mappedCountriesNames}
                  eventsStates={eventsStates}
                />
              </div>
            )}

            <div className={`search-filter ${styles.searchFilterContainer}`}>
              <input
                type="text"
                className={`${styles.searchBox} search-filter-input`}
                placeholder={_.upperCase(
                  siteSettings.terms ? siteSettings.terms?.search[lang] : ''
                )}
                onChange={e => search(e.target.value)}
              />
            </div>

            <div className={'d-flex dropdown-filter'}>
              {isEventListing && (
                <div className="mr-2 flex-fill">
                  <div className={`dropdown ${styles.whiteDropdown}`}>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <img
                          src="/assets/images/icons/date.svg"
                          alt="flag"
                          className="mx-2"
                        />{' '}
                        {siteSettings?.terms?.month[lang]}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {months.map((m, index) => (
                          <React.Fragment key={m.year + m.month}>
                            {(index === 0 ||
                              (index > 0 &&
                                months[index - 1].year !== m.year)) && (
                              <Dropdown.Header
                                className={styles.dropdownHeader}
                              >
                                {m.year}:
                              </Dropdown.Header>
                            )}
                            <Dropdown.Item
                              eventKey={m.year + m.month}
                              onSelect={() => monthChange(m, index)}
                              className={
                                selectedMonth === index ? 'active' : ''
                              }
                            >
                              {m.monthDisplayName}
                            </Dropdown.Item>
                          </React.Fragment>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              )}
              <div className="mr-2 flex-fill">
                {(countryCode == 'us' || countryCode == 'ca') &&
                  isPeopleListing &&
                  isEventListing && (
                    <div className={`dropdown ${styles.whiteDropdown}`}>
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          <img
                            src="/assets/images/icons/location.svg"
                            alt="flag"
                            className="mx-2"
                          />{' '}
                          {siteSettings?.terms?.location[lang]}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {locations &&
                            locations.map(loc => (
                              <Dropdown.Item
                                key={loc.id}
                                eventKey={loc.id}
                                onSelect={() => locationChange(loc)}
                                className={
                                  loc.id === selectedLocaxtion ? 'active' : ''
                                }
                              >
                                {loc.stateName}
                              </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  )}
              </div>
            </div>
          </div>

          <div className="py-3">
            <div
              className={`d-flex flex-wrap ${
                isMobile
                  ? styles.justifyContentLeftMobile
                  : 'justify-content-center'
              }`}
            >
              {filterTags.map(tag => (
                <ListTag
                  tag={tag}
                  key={tag.id}
                  selectedFilterTags={selectedFilterTags}
                  onChange={tagChange}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListHeader;
