import React from 'react';

import styles from '../../src/styles/detailHeroHeader.module.css';
import { sanityUrlFor } from '../config/sanityUrlFor';
import { useCountry } from '../providers/countryProvider';
import BackButton from './backButton';
import PageBreadcrumb from './PageBreadcrumb';

const DetailHeroHeader = ({ title, tag, imgURL, readingTime }) => {
  const { currentCountryData, genUrl } = useCountry();
  const breadcrumbs = [
    { link: genUrl('/'), label: 'Home' },
    { link: genUrl('/articles'), label: 'Articles' },
    { label: title }
  ];
  return (
    <div className={styles.pageListHeader}>
      <div className={styles.heroSection}>
        <img
          src={sanityUrlFor(imgURL?.asset, currentCountryData.code)
            .width(600)
            .auto('format')
            .url()}
          alt=""
          className="img-fluid fadeIn cssanimation"
        />
        <div
          className={`position-absolute w-100 m-auto ${styles.breadcrumbContent}`}
        >
          <PageBreadcrumb
            breadcrumbs={breadcrumbs}
            className={'breadcrumbWhite'}
          />
          <BackButton />
        </div>
        <div
          className={`position-absolute w-100 m-auto ${styles.bannerContent}`}
        >
          <div className="container text-center">
            <h2 className="fadeInBottom cssanimation">{title}</h2>
          </div>
        </div>

        <div
          className={`d-flex align-items-center ${styles.heroFooterContainer}`}
        >
          {tag && (
            <div className={styles.tag + ' ' + styles[tag]}>
              <span>{tag}</span>
            </div>
          )}
          {readingTime && (
            <div className={styles.tagText}>{readingTime.en_gb}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailHeroHeader;
