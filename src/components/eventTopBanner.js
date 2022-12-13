import React, { useEffect, useState } from 'react';

import { Constants } from '../config/constants';
import { getcustomFieldsIdandValue } from '../config/utils';
import { useCountry } from '../providers/countryProvider';
import styles from '../styles/peopleTopBanner.module.css';
import BackButton from './backButton';
import PageBreadcrumb from './PageBreadcrumb';

const EventTopBanner = ({ event }) => {
  const { genUrl } = useCountry();
  const breadcrumbs = [
    { link: genUrl('/'), label: 'Home' },
    { link: genUrl('/events'), label: 'All Upcoming Event' },
    { label: event.title }
  ];

  const [commoncustomCategoryValue, setCommoncustomCategoryValue] =
    useState('');
  useEffect(() => {
    if (event.customFields && event.customFields.length > 0) {
      const customFieldValueandID = getcustomFieldsIdandValue(
        event.customFields,
        'BEP - Event Image URL'
      );
      setCommoncustomCategoryValue(customFieldValueandID.value);
    }
  }, [event]);

  return (
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
      <div className="position-relative">
        <div className={styles.topBanner}>
          <div className={`badgeCard ${styles.noneDisplay}`}>
            {event.customFields && event.customFields.length > 0 ? (
              <>
                <img
                  className="customBatchCard"
                  src={`/assets/images/events/${
                    getcustomFieldsIdandValue(
                      event.customFields,
                      'BEP - Event Category'
                    ).value
                  }.svg`}
                  alt=""
                />
                <p>
                  {
                    Constants.eventTypeDisplayName[
                      getcustomFieldsIdandValue(
                        event.customFields,
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
          <img src={commoncustomCategoryValue} alt="" />
        </div>
      </div>
    </>
  );
};

export default EventTopBanner;
