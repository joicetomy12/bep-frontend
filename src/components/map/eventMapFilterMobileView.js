import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { event } from '../../../lib/gtag';
import { Constants } from '../../config/constants';
import { uriToLang } from '../../config/utils';
import { useGlobal } from '../../providers/globalProvider';
import { useMap } from '../../providers/mapProvider';
import styles from '../../styles/home/EventMapFilter.module.css';
import FilterButton from './filterButton';
const EventMapFilterMobileView = ({ setMobileFilter }) => {
  const router = useRouter();
  const { siteSettings } = useGlobal();
  const { setFilterEventByType, resetMapEvents, homeMapFilterItemCounts } =
    useMap();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);

  const [filterSelected, setFilterSelected] = useState();
  const [showFilters, setShowFilters] = useState(false);

  const handleSelectedCategory = type => {
    event({
      event: 'click',
      eventValue: {
        category: 'experience map',
        action: 'legend selection',
        label: `${type}`
      }
    });
    if (type !== filterSelected) {
      setFilterSelected(type);
    } else {
      setFilterSelected();
    }
  };

  useEffect(() => {
    if (siteSettings && siteSettings.eventCategory) {
      setShowFilters(true);
    }
  }, [siteSettings]);

  return (
    <>
      {showFilters && (
        <div className="fullscreenMobile bg-white">
          <div className={styles.filterBoxMobileBody}>
            <div className={styles.headerMobile}>
              <img
                className={styles.closeMobile}
                onClick={() => {
                  resetMapEvents();
                  setMobileFilter(false);
                }}
                src={'/assets/images/icons/close.svg'}
              />
              <h3>Filter map</h3>
            </div>

            <div className={`${styles.filterBox} ${styles.filterBoxMobile}`}>
              <button
                onClick={() =>
                  handleSelectedCategory(Constants.eventTypes.store)
                }
                title=""
                className={
                  styles.filterBtn +
                  ' ' +
                  (filterSelected === Constants.eventTypes.store
                    ? styles.activeFilter
                    : '')
                }
              >
                <img
                  src={`/assets/images/${Constants.eventTypes.store}.svg`}
                  alt="filter"
                />
                <label>
                  {
                    siteSettings.eventCategory[
                      Constants.updatedEventTypes.store
                    ][lang]
                  }{' '}
                  (
                  {homeMapFilterItemCounts &&
                  homeMapFilterItemCounts[Constants.eventTypes.store]
                    ? homeMapFilterItemCounts[Constants.eventTypes.store]
                    : 0}
                  )
                </label>
              </button>
              <button
                onClick={() =>
                  handleSelectedCategory(Constants.eventTypes.campfireEvent)
                }
                title=""
                className={
                  styles.filterBtn +
                  ' ' +
                  (filterSelected === Constants.eventTypes.campfireEvent
                    ? styles.activeFilter
                    : '')
                }
              >
                <img
                  src={`/assets/images/${Constants.updatedEventTypes.campfireEvent}.svg`}
                  alt="filter"
                />
                <label>
                  {' '}
                  {
                    siteSettings.eventCategory[
                      Constants.updatedEventTypes.campfireEvent
                    ][lang]
                  }{' '}
                  (
                  {homeMapFilterItemCounts &&
                  homeMapFilterItemCounts[Constants.eventTypes.campfireEvent]
                    ? homeMapFilterItemCounts[
                        Constants.eventTypes.campfireEvent
                      ]
                    : 0}
                  )
                </label>
              </button>
              <button
                onClick={() =>
                  handleSelectedCategory(Constants.eventTypes.classicEvent)
                }
                title=""
                className={
                  styles.filterBtn +
                  ' ' +
                  (filterSelected === Constants.eventTypes.classicEvent
                    ? styles.activeFilter
                    : '')
                }
              >
                <img
                  src={`/assets/images/${Constants.eventTypes.classicEvent}.svg`}
                  alt="filter"
                />
                <label>
                  {' '}
                  {
                    siteSettings.eventCategory[
                      Constants.updatedEventTypes.classicEvent
                    ][lang]
                  }{' '}
                  (
                  {homeMapFilterItemCounts &&
                  homeMapFilterItemCounts[Constants.eventTypes.classicEvent]
                    ? homeMapFilterItemCounts[Constants.eventTypes.classicEvent]
                    : 0}
                  )
                </label>
              </button>
              <button
                onClick={() =>
                  handleSelectedCategory(Constants.eventTypes.polarEvent)
                }
                title=""
                className={
                  styles.filterBtn +
                  ' ' +
                  (filterSelected === Constants.eventTypes.polarEvent
                    ? styles.activeFilter
                    : '')
                }
              >
                <img
                  src={`/assets/images/${Constants.eventTypes.polarEvent}.svg`}
                  alt="filter"
                />
                <label>
                  {' '}
                  {
                    siteSettings.eventCategory[
                      Constants.updatedEventTypes.polarEvent
                    ][lang]
                  }{' '}
                  (
                  {homeMapFilterItemCounts &&
                  homeMapFilterItemCounts[Constants.eventTypes.polarEvent]
                    ? homeMapFilterItemCounts[Constants.eventTypes.polarEvent]
                    : 0}
                  )
                </label>
              </button>
              <button
                onClick={() =>
                  handleSelectedCategory(Constants.eventTypes.brandStoreEvent)
                }
                title=""
                className={
                  styles.filterBtn +
                  ' ' +
                  (filterSelected === Constants.eventTypes.brandStoreEvent
                    ? styles.activeFilter
                    : '')
                }
              >
                <img
                  src={`/assets/images/${Constants.updatedEventTypes.brandStoreEvent}.svg`}
                  alt="filter"
                />
                <label>
                  {' '}
                  {
                    siteSettings.eventCategory[
                      Constants.updatedEventTypes.brandStoreEvent
                    ][lang]
                  }{' '}
                  (
                  {homeMapFilterItemCounts &&
                  homeMapFilterItemCounts[Constants.eventTypes.brandStoreEvent]
                    ? homeMapFilterItemCounts[
                        Constants.eventTypes.brandStoreEvent
                      ]
                    : 0}
                  )
                </label>
              </button>
              <button
                onClick={() =>
                  handleSelectedCategory(Constants.eventTypes.people)
                }
                title=""
                className={
                  styles.filterBtn +
                  ' ' +
                  (filterSelected === Constants.eventTypes.people
                    ? styles.activeFilter
                    : '')
                }
              >
                <img
                  src={`/assets/images/${Constants.eventTypes.people}.svg`}
                  alt="filter"
                />
                <label>
                  {' '}
                  {siteSettings.terms ? siteSettings.terms.people[lang] : ''} (
                  {homeMapFilterItemCounts &&
                  homeMapFilterItemCounts[Constants.eventTypes.people]
                    ? homeMapFilterItemCounts[Constants.eventTypes.people]
                    : 0}
                  )
                </label>
              </button>
            </div>

            <div className={styles.footerMobile}>
              <FilterButton
                onClick={() => {
                  setFilterEventByType(filterSelected);
                  setMobileFilter(false);
                }}
                label={'Confirm'}
                icon={'FilterRightIcon'}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventMapFilterMobileView;
