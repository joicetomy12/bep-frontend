import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { event } from '../../../lib/gtag';
import { Constants } from '../../config/constants';
import { uriToLang } from '../../config/utils';
import { useGlobal } from '../../providers/globalProvider';
import { useMap } from '../../providers/mapProvider';
import styles from '../../styles/home/EventMapFilter.module.css';
import Tooltip from '../Tooltip';

const EventMapFilter = () => {
  const router = useRouter();
  const { siteSettings } = useGlobal();
  const { setFilterEventByType, homeMapFilterItemCounts } = useMap();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState();
  const settingFilter = type => {
    event({
      event: 'click',
      eventValue: {
        category: 'experience map',
        action: 'legend selection',
        label: `${type}`
      }
    });
    if (type !== selectedFilter) {
      setSelectedFilter(type);
      setFilterEventByType(type);
    } else {
      setSelectedFilter();
      setFilterEventByType();
    }
  };

  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);

  useEffect(() => {
    if (siteSettings && siteSettings.eventCategory) {
      setShowFilters(true);
    }
  }, [siteSettings]);
  return (
    <>
      {showFilters && (
        <div
          className={`position-absolute m-auto ${
            styles.filterBox + ' ' + styles.filterBoxHide
          } `}
        >
          <Tooltip
            description={
              siteSettings.eventCategory[
                Constants.updatedEventTypes.store + 'Desc'
              ][lang]
            }
            title={`${
              siteSettings.eventCategory[Constants.updatedEventTypes.store][
                lang
              ]
            } (${
              homeMapFilterItemCounts &&
              homeMapFilterItemCounts[Constants.eventTypes.store]
                ? homeMapFilterItemCounts[Constants.eventTypes.store]
                : 0
            })`}
            direction="right"
          >
            <button
              onClick={() => {
                settingFilter(Constants.eventTypes.store);
              }}
              title=""
              className={
                styles.filterBtn +
                ' ' +
                (selectedFilter === Constants.eventTypes.store
                  ? styles.activeFilter
                  : '')
              }
            >
              <img src="/assets/images/store.svg" alt="filter" />
              <label>
                {
                  siteSettings.eventCategory[Constants.updatedEventTypes.store][
                    lang
                  ]
                }
              </label>
            </button>
          </Tooltip>
          <Tooltip
            description={
              siteSettings.eventCategory[
                Constants.updatedEventTypes.campfireEvent + 'Desc'
              ][lang]
            }
            title={`${
              siteSettings.eventCategory[
                Constants.updatedEventTypes.campfireEvent
              ][lang]
            } (${
              homeMapFilterItemCounts &&
              homeMapFilterItemCounts[Constants.eventTypes.campfireEvent]
                ? homeMapFilterItemCounts[Constants.eventTypes.campfireEvent]
                : 0
            })`}
            direction="right"
          >
            <button
              onClick={() => settingFilter(Constants.eventTypes.campfireEvent)}
              title=""
              className={
                styles.filterBtn +
                ' ' +
                (selectedFilter === Constants.eventTypes.campfireEvent
                  ? styles.activeFilter
                  : '')
              }
            >
              <img src="/assets/images/campfireEvent.svg" alt="filter" />
              <label>
                {
                  siteSettings.eventCategory[
                    Constants.updatedEventTypes.campfireEvent
                  ][lang]
                }
              </label>
            </button>
          </Tooltip>
          <Tooltip
            description={
              siteSettings.eventCategory[
                Constants.updatedEventTypes.classicEvent + 'Desc'
              ][lang]
            }
            title={`${
              siteSettings.eventCategory[
                Constants.updatedEventTypes.classicEvent
              ][lang]
            } (${
              homeMapFilterItemCounts &&
              homeMapFilterItemCounts[Constants.eventTypes.classicEvent]
                ? homeMapFilterItemCounts[Constants.eventTypes.classicEvent]
                : 0
            })`}
            direction="right"
          >
            <button
              onClick={() => settingFilter(Constants.eventTypes.classicEvent)}
              title=""
              className={
                styles.filterBtn +
                ' ' +
                (selectedFilter === Constants.eventTypes.classicEvent
                  ? styles.activeFilter
                  : '')
              }
            >
              <img src="/assets/images/classicEvent.svg" alt="filter" />
              <label>
                {
                  siteSettings.eventCategory[
                    Constants.updatedEventTypes.classicEvent
                  ][lang]
                }
              </label>
            </button>
          </Tooltip>
          <Tooltip
            description={
              siteSettings.eventCategory[
                Constants.updatedEventTypes.polarEvent + 'Desc'
              ][lang]
            }
            title={`${
              siteSettings.eventCategory[
                Constants.updatedEventTypes.polarEvent
              ][lang]
            } (${
              homeMapFilterItemCounts &&
              homeMapFilterItemCounts[Constants.eventTypes.polarEvent]
                ? homeMapFilterItemCounts[Constants.eventTypes.polarEvent]
                : 0
            })`}
            direction="right"
          >
            <button
              onClick={() => settingFilter(Constants.eventTypes.polarEvent)}
              title=""
              className={
                styles.filterBtn +
                ' ' +
                (selectedFilter === Constants.eventTypes.polarEvent
                  ? styles.activeFilter
                  : '')
              }
            >
              <img src="/assets/images/polarEvent.svg" alt="filter" />
              <label>
                {
                  siteSettings.eventCategory[
                    Constants.updatedEventTypes.polarEvent
                  ][lang]
                }
              </label>
            </button>
          </Tooltip>
          <div className={styles.rightBox}>
            <Tooltip
              description={
                siteSettings.eventCategory[
                  Constants.updatedEventTypes.brandStoreEvent + 'Desc'
                ][lang]
              }
              title={`${
                siteSettings.eventCategory[
                  Constants.updatedEventTypes.brandStoreEvent
                ][lang]
              } (${
                homeMapFilterItemCounts &&
                homeMapFilterItemCounts[Constants.eventTypes.brandStoreEvent]
                  ? homeMapFilterItemCounts[
                      Constants.eventTypes.brandStoreEvent
                    ]
                  : 0
              })`}
              direction="right"
            >
              <button
                onClick={() =>
                  settingFilter(Constants.eventTypes.brandStoreEvent)
                }
                title=""
                className={
                  styles.filterBtn +
                  ' ' +
                  (selectedFilter === Constants.eventTypes.brandStoreEvent
                    ? styles.activeFilter
                    : '')
                }
              >
                <img src="/assets/images/brandStoreEvent.svg" alt="filter" />
                <label>
                  {
                    siteSettings.eventCategory[
                      Constants.updatedEventTypes.brandStoreEvent
                    ][lang]
                  }
                </label>
              </button>
            </Tooltip>
            <Tooltip
              description={
                siteSettings.terms ? siteSettings.terms.peopleDesc[lang] : ''
              }
              title={`${
                siteSettings.terms ? siteSettings.terms.people[lang] : ''
              } (${
                homeMapFilterItemCounts &&
                homeMapFilterItemCounts[Constants.eventTypes.people]
                  ? homeMapFilterItemCounts[Constants.eventTypes.people]
                  : 0
              })`}
              direction="right"
            >
              <button
                onClick={() => settingFilter(Constants.eventTypes.people)}
                title=""
                className={
                  styles.filterBtn +
                  ' ' +
                  (selectedFilter === Constants.eventTypes.people
                    ? styles.activeFilter
                    : '')
                }
              >
                <img src="/assets/images/people.svg" alt="filter" />
                <label>
                  {siteSettings.terms ? siteSettings.terms.people[lang] : ''}
                </label>
              </button>
            </Tooltip>
          </div>
        </div>
      )}
    </>
  );
};

export default EventMapFilter;
