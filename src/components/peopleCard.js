import * as _ from 'lodash';
import { toLower } from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

import { Constants } from '../config/constants';
import { sanityUrlFor } from '../config/sanityUrlFor';
import { uriToLang } from '../config/utils';
import { useGlobal } from '../providers/globalProvider';
import Styles from '../styles/peopleCardStyle.module.css';
import { ChevronRight } from './icons';
const PeopleCard = ({
  people,
  peopleCategoryList,
  noResults,
  // peopleCategoryTags,
  peoplecountriesLists
}) => {
  const router = useRouter();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const { siteSettings } = useGlobal();
  // const { genUrl } = useCountry();

  const getPeopleCategoryTag = peopleid => {
    const item = _.find(peopleCategoryList, { _id: peopleid });
    const category = item && item.name ? _.get(item.name, lang, '') : '';
    return category;
  };

  const getPeopleCountryList = peopleid => {
    const item = _.find(peoplecountriesLists, { _id: peopleid._ref });
    const title = _.get(item, 'title', '');
    return title;
  };
  const getPeopleFirstName = people => {
    const fname = people.split(' ');
    const firstName = fname[0];
    return firstName;
  };

  const getPeopleCountryImg = peopleid => {
    const item = _.find(peoplecountriesLists, { _id: peopleid._ref });
    const code = _.get(item, 'code', '');
    return code;
  };

  const getUrl = (path, ccode) => {
    const item = _.find(peoplecountriesLists, { _id: ccode._ref });
    const code =
      _.get(item, 'code', '') === 'GB' ? 'uk' : _.get(item, 'code', '');

    const countryLang = Constants.countries[toLower(code)];

    if (path.startsWith('/')) {
      path = path.substring(1);
    }

    return `/${toLower(code) || Constants.defaultCountry.code}/${
      countryLang[0]
    }/${path}`;
  };
  return (
    <>
      {people && people.length == 0 ? (
        <div className={'noresults'}>{noResults}</div>
      ) : (
        people &&
        people.map(data => (
          <div
            key={_.get(data, '_id', '')}
            className="col-sm-6 col-lg-4 col-md-6  mb-4"
          >
            <div className={Styles.FeatureCard}>
              <div className={Styles.cardBackgroundImage}>
                {!_.isEmpty(_.get(data, 'country', '')) && (
                  <a
                    href={getUrl(
                      `people/${_.get(data, 'slug.current', '')}`,
                      _.get(data, 'country', '')
                    )}
                  >
                    <img
                      src={sanityUrlFor(
                        data && data.profileImage ? data.profileImage : ''
                      )
                        .height(197)
                        .width(350)
                        .fit('crop')
                        .auto('format')
                        .url()}
                      alt=""
                      className={Styles.imgGrayScale}
                    />
                  </a>
                )}
              </div>
              <div className={Styles.cardAbout}>
                <div className={Styles.cardTitle}>
                  {!_.isEmpty(_.get(data, 'country', '')) && (
                    <a
                      href={getUrl(
                        `people/${_.get(data, 'slug.current', '')}`,
                        _.get(data, 'country', '')
                      )}
                    >
                      {_.get(data, 'Name', '')}
                    </a>
                  )}
                </div>
                <div className={Styles.addresCard}>
                  <div className="d-flex flex-sm-column flex-md-row ">
                    {data.categoryColors && (
                      <div
                        className="sustainability"
                        style={{
                          backgroundColor: _.get(data, 'categoryColors', '')
                          // backgroundColor: people['categoryColorCode']['color']
                        }}
                      >
                        <span>
                          {getPeopleCategoryTag(
                            _.get(
                              data.peoplecategorytype &&
                                data.peoplecategorytype[0],
                              '_ref',
                              ''
                            )
                          )}
                        </span>
                      </div>
                    )}

                    {!_.isEmpty(_.get(data, 'country', '')) && (
                      <>
                        <div className="d-flex align-items-center   mt-sm-2 mt-md-0 ">
                          <img
                            src={`/assets/flags/${getPeopleCountryImg(
                              _.get(data, 'country', '')
                            )}.svg`}
                            className={Styles.flagImg}
                            width="24px"
                            alt=""
                          />
                          <div className={Styles.location}>
                            {getPeopleCountryList(_.get(data, 'country', ''))}
                          </div>
                        </div>
                      </>
                    )}
                    {/* <div className={Styles.location}>
                      {getPeopleCountryList(_.get(data, 'country', ''))}
                    </div> */}
                  </div>
                </div>
                <div className={Styles.cardDescription}>
                  {_.get(data && data.description, lang, '')}
                </div>
              </div>
              {!_.isEmpty(_.get(data, 'country', '')) && (
                <a
                  href={getUrl(
                    `people/${_.get(data, 'slug.current', '')}`,
                    _.get(data, 'country', '')
                  )}
                  className={Styles.goToEvent}
                >
                  {siteSettings?.terms?.getToKnow[lang]}{' '}
                  {getPeopleFirstName(_.get(data, 'Name', ''))}
                  <div className={Styles.chevronRightIcon}>
                    <ChevronRight />
                  </div>
                </a>
              )}
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default PeopleCard;
