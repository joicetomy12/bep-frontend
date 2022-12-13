import 'react-multi-carousel/lib/styles.css';

import groq from 'groq';
import _ from 'lodash';
import { toLower } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import sanityClientHandle from '../../../src/config/sanityClient';
import { Constants } from '../../config/constants';
import { sanityUrlFor } from '../../config/sanityUrlFor';
import { uriToLang } from '../../config/utils';
import { useCountry } from '../../providers/countryProvider';
import { useGlobal } from '../../providers/globalProvider';
import Styles from '../../styles/home/peopleSectionStyle.module.css';
import { ChevronRight } from '../icons';

// const responsive = {
//   superLargeDesktop: {
//     breakpoint: { max: 4000, min: 3000 },
//     items: 4
//   },
//   xdisktop: {
//     breakpoint: { max: 3000, min: 2000 },
//     items: 4
//   },
//   desktop: {
//     breakpoint: { max: 2000, min: 1250 },
//     items: 4
//   },
//   tablet: {
//     breakpoint: { max: 1250, min: 464 },
//     items: 2
//   },
//   mobile: {
//     breakpoint: { max: 786, min: 0 },
//     items: 1.3,
//     arrows: false
//   }
// };
function PeopleSection({ data, peopleCategoryList, peoplecountriesLists }) {
  const router = useRouter();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const countryCode = router.query.code || Constants.defaultCountry.code;
  const { siteSettings } = useGlobal();
  const { genUrlEu } = useCountry();
  const client = sanityClientHandle();
  // const deviceWidthSet = deviceWidth <= 464 ? true : false;
  const [people, setPeople] = useState([]);
  // useEffect(() => {a
  //   fetchPeople().then();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  useEffect(() => {
    fetchSanityPeople().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let peopleCountryData = '';
  if (!_.isEmpty(countryCode)) {
    peopleCountryData = _.find(peoplecountriesLists, {
      // code: countryCode.toUpperCase
      code:
        countryCode.toUpperCase() === 'UK' ? 'GB' : countryCode.toUpperCase()
    });
  } else {
    peopleCountryData = '';
  }
  const fetchSanityPeople = async () => {
    const peopleFiltersData = await client.fetch(
      groq`*[_type =="people"&&!(_id in path('drafts.**'))&&  marketHomePage[]._ref match ["${peopleCountryData._id}"]]`
    );
    let peopleData = peopleFiltersData.map(data => data);
    // setPeople(peopleFiltersData);
    if (peopleFiltersData.length < 8) {
      const peopleFiltersDataFallBack = await client.fetch(
        groq`*[_type =="people"&&!(_id in path('drafts.**'))]  | order (Name asc)
        `
      );
      if (peopleFiltersDataFallBack && peopleFiltersData.length > 0) {
        let peopleDataFallBack = peopleFiltersDataFallBack;
        Array.prototype.push.apply(peopleData, peopleDataFallBack);
        const uniqueData = [];
        const unique = peopleData.filter(element => {
          const isDuplicate = uniqueData.includes(element.id);
          if (!isDuplicate) {
            uniqueData.push(element.Name);
            return true;
          }
          return false;
        });
        setPeople(unique);
      }
    } else {
      setPeople(peopleFiltersData);
    }
  };

  const getPeopleCategoryTag = peopleid => {
    const item = _.find(peopleCategoryList, { _id: peopleid });
    const category = item && item.name ? _.get(item.name, lang, '') : '';
    return category;
  };

  // const getPeopleCountryList = peopleid => {
  //   const item = _.find(Constants.countriesNames, { value: peopleid }, '');
  //   const title = _.get(item, 'title', '');
  //   return title;
  // };

  const getPeopleCountryList = peopleid => {
    const item = _.find(peoplecountriesLists, { _id: peopleid._ref });
    const title = _.get(item, 'title', '');
    return title;
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
  // const fetchPeople = async () => {
  //   const apiRes = await axios.post(
  //     `${Constants.basePath.PEOPLE}/orchestration/people/search`,
  //     {
  //       countryCode: router.query.code || Constants.defaultCountry.code,
  //       page: 0,
  //       size: 8
  //     }
  //   );
  //   if (apiRes && apiRes.data && apiRes.data.data.peopleList) {
  //     setPeople(apiRes.data.data.peopleList);
  //   }
  // };
  return (
    <>
      {data && people && people && (
        <section className="container">
          <div className={Styles.outerDiv}>
            <div
              className={`d-flex justify-content-center pt-5 ${Styles.responsiveTopFix}`}
            >
              <div className={Styles.title}>{data.heading[lang]}</div>
            </div>
            <div className="d-flex justify-content-center">
              <div className={Styles.subTitle}>{data.tagline[lang]}</div>
            </div>
            <div className="container">
              <div className="row justify-content-center">
                {/* <Carousel responsive={responsive} partialVisible={deviceWidthSet}> */}
                {people.slice(0, 8).map(data => {
                  return (
                    <div
                      key={_.get(data, '_id', '')}
                      className={Styles.FeatureCard}
                    >
                      <div className={Styles.cardBackgroundImage}>
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
                              .height(145)
                              .width(255)
                              .auto('format')
                              .fit('crop')
                              .url()}
                            alt=""
                            className={Styles.imgGrayScale}
                          />
                        </a>
                      </div>
                      <div className={Styles.cardAbout}>
                        <div className={Styles.cardTitle}>
                          <a
                            href={getUrl(
                              `people/${_.get(data, 'slug.current', '')}`,
                              _.get(data, 'country', '')
                            )}
                          >
                            {_.get(data, 'Name', '')}
                          </a>
                        </div>
                        <div className={Styles.addresCard}>
                          <div className="d-flex align-items-center">
                            {/* {value.categoryColorCode && ( */}
                            <div
                              // className={'tag ' + value.category}
                              className="sustainability"
                              style={{
                                backgroundColor: _.get(
                                  data,
                                  'categoryColors',
                                  ''
                                )
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
                            {/* // )} */}
                          </div>
                        </div>
                        <div className="d-flex align-items-center mt-2">
                          {!_.isEmpty(_.get(data, 'country', '')) && (
                            <img
                              src={`/assets/flags/${getPeopleCountryImg(
                                _.get(data, 'country', '')
                              )}.svg`}
                              className={Styles.flagImg}
                              width="24px"
                              alt=""
                            />
                          )}
                          <div className={Styles.location}>
                            {/* {getPeopleCountryList(
                              _.get(data, 'country', '') === 'UK'
                                ? 'GB'
                                : _.get(data, 'country', '')
                            )} */}
                            {getPeopleCountryList(_.get(data, 'country', ''))}
                          </div>
                        </div>
                        <div className={Styles.cardDescription}>
                          {_.get(data && data.description, lang, '')}
                        </div>
                        <a
                          href={getUrl(
                            `people/${_.get(data, 'slug.current', '')}`,
                            _.get(data, 'country', '')
                          )}
                          className={Styles.goToEvent}
                        >
                          {siteSettings?.terms?.getToKnow[lang]}{' '}
                          <div className={Styles.chevronRightIcon}>
                            <ChevronRight />
                          </div>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* </Carousel> */}
            </div>
          </div>
          <div className={`pt-5 pb-5 ${Styles.footerButton}`}>
            {data.cta && (
              <a
                href={genUrlEu(`people`)}
                title=""
                className="btn themeButton m-auto"
              >
                {data.cta.title[lang]}
              </a>
            )}
          </div>
        </section>
      )}
    </>
  );
}
export default PeopleSection;
