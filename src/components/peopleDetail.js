import 'react-multi-carousel/lib/styles.css';

import _ from 'lodash';
import React from 'react';

import { ChevronRight } from '../components/icons';
// import { Constants } from '../config/constants';
import { sanityUrlFor } from '../config/sanityUrlFor';
import styles from '../styles/peopleDetail.module.css';
import PeopleTags from './peopleTags';

const PeopleDetail = ({
  people,
  lang,
  peopleCategoryList,
  peopleCategoryTags,
  peopleStatesList,
  siteSettings,
  peoplecountriesLists
}) => {
  const getPeopleCategoryList = peopleid => {
    const item = _.find(peopleCategoryList, { _id: peopleid });
    const category = item && item.name ? _.get(item.name, lang, '') : '';
    return category;
  };
  const getPeopleCountryList = peopleid => {
    const item = _.find(peoplecountriesLists, { _id: peopleid._ref }, '');
    const title = _.get(item, 'title', '');
    return title;
  };
  const getPeopleStateList = stateid => {
    const item = _.find(peopleStatesList, { _id: stateid });
    const state = _.get(item, 'regions', '');
    return state;
  };

  const getPeopleCountryImg = peopleid => {
    const item = _.find(peoplecountriesLists, { _id: peopleid._ref });
    const code = _.get(item, 'code', '');
    return code;
  };
  return (
    <div className={styles.peopleDetail}>
      {/* <img
        src={people.imgURL}
        
        className={`${styles.peopleImg} ${styles.imgGrayScale}`}
        alt=""
      /> */}
      <img
        src={sanityUrlFor(
          people && people.profileImage && people.profileImage.asset
            ? people.profileImage.asset
            : ''
        )
          .auto('format')
          // .height(164)
          // .width(290)
          .url()}
        alt=""
        className={`${styles.peopleImg} ${styles.imgGrayScale}`}
      />

      <p className={styles.guideName}>{_.get(people, 'Name', '')}</p>
      <div className="d-flex align-items-center phone_center">
        {people.categoryColors && (
          <div
            className="sustainability"
            style={{
              backgroundColor: _.get(people, 'categoryColors', '')
              // backgroundColor: '#6C7C57'
              // _.get(people, 'categoryColors', '')
            }}
          >
            <span>
              {getPeopleCategoryList(
                _.get(
                  people.peoplecategorytype && people.peoplecategorytype[0],
                  '_ref',
                  ''
                )
              )}
            </span>
          </div>
        )}
        {/* {people.tagColorCodeList && ( */}
        {people.peopletagstype.length > 0 &&
          people.peopletagstype.map((peopleTag, index) => {
            return (
              <div key={index}>
                <PeopleTags
                  // className="sustainability_taglist"
                  lang={lang}
                  peopleTags={peopleTag}
                  peopleCategoryTags={peopleCategoryTags}
                />
              </div>
            );
          })}
      </div>
      <div className="d-flex align-items-center phone_center mt-3">
        <div>
          <img
            // src={`/assets/flags/${_.get(people, 'country', '')}.svg`}
            src={`/assets/flags/${getPeopleCountryImg(
              _.get(people, 'country', '')
            )}.svg`}
            className={styles.flagImg}
            width="24px"
            alt=""
          />
        </div>

        <div className={styles.location}>
          {getPeopleCountryList(_.get(people, 'country', ''))} |{' '}
          {getPeopleStateList(
            _.get(people.state && people.state[0], '_ref', '')
          )}{' '}
          | {_.get(people, 'city', '')}
        </div>

        <div className={styles.location}>
          {people.facebookUrl && (
            <a
              target="_blank"
              href={_.get(people, 'facebookUrl', '')}
              rel="noreferrer"
            >
              <img
                src={`/assets/socialmediaicons/Facebook.svg`}
                className={styles.socialmedia2}
                width="24px"
                alt=""
              />
            </a>
          )}
          {people.instagramUrl && (
            <a
              target="_blank"
              href={_.get(people, 'instagramUrl', '')}
              rel="noreferrer"
            >
              <img
                src={`/assets/socialmediaicons/Instagram.svg`}
                className={styles.socialmedia1}
                width="24px"
                alt=""
              />
            </a>
          )}
        </div>
        <div className={styles.location}>
          {people.facebookUrl && (
            <a
              target="_blank"
              href={_.get(people, 'facebookUrl', '')}
              rel="noreferrer"
            >
              <img
                src={`/assets/socialmediaicons/Facebook.svg`}
                className={styles.socialmedia_1}
                width="24px"
                alt=""
              />
            </a>
          )}
          {people.instagramUrl && (
            <a
              target="_blank"
              href={_.get(people, 'instagramUrl', '')}
              rel="noreferrer"
            >
              <img
                src={`/assets/socialmediaicons/Instagram.svg`}
                className={styles.socialmedia_2}
                width="24px"
                alt=""
              />
            </a>
          )}
        </div>
      </div>
      {/* <br /> */}

      <div className={styles.cardDescription}>
        {_.get(people && people.description, lang, '')}
        {people.storeWebsite && (
          <a
            target="_blank"
            href={_.get(people, 'storeWebsite', '')}
            rel="noreferrer"
            className={styles.goToEvent}
          >
            <span>
              {_.get(siteSettings.peopleCategory.storeWebsite, lang, '')}
            </span>

            <div className={styles.chevronRightIcon}>
              <ChevronRight />
            </div>
          </a>
        )}
      </div>
    </div>
  );
};

export default PeopleDetail;
