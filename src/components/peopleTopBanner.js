import React from 'react';

import { sanityUrlFor } from '../config/sanityUrlFor';
import { useCountry } from '../providers/countryProvider';
import styles from '../styles/peopleTopBanner.module.css';
import BackButton from './backButton';
import PageBreadcrumb from './PageBreadcrumb';

const PeopleTopBanner = ({ people }) => {
  const { genUrl } = useCountry();
  const breadcrumbs = [
    { link: genUrl('/'), label: 'Home' },
    { link: genUrl('/people'), label: 'All People' },
    { label: people.Name }
  ];

  return (
    <div className="position-relative">
      <div className={styles.topBanner}>
        {/* <img src={people.bannerImage} alt="" /> */}
        <div className="d-flex breadcrumpContainer pt-1">
          <div className={`pl-3 d-flex ${styles.breadcrumbContent}`}>
            <BackButton href={genUrl(`people`)} />
            <PageBreadcrumb
              breadcrumbs={breadcrumbs}
              className={'breadcrumbBlack'}
            />
          </div>
        </div>
        <img
          src={sanityUrlFor(
            people && people.bannerImage && people.bannerImage.asset
              ? people.bannerImage.asset
              : ''
          )
            // .auto('format')
            .height(410)
            .width(1834)
            .fit('crop')
            .auto('format')
            .url()}
          alt=""
        />
      </div>
    </div>
  );
};

export default PeopleTopBanner;
