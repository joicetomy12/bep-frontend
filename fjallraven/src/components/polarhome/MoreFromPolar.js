import * as _ from 'lodash';
import React from 'react';

import { sanityUrlFor } from '../../config/sanityUrlFor';
import Styles from '../../styles/polar/featuredEventSectionStyle.module.css';
import styles from '../../styles/polar/moreFromFjallravenSectionStyle.module.css';

const MoreFromPolar = ({ data }) => {
  // const router = useRouter();
  // const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);

  // const [posts, setPosts] = useState([]);
  // const { genUrl } = useCountry();
  // useEffect(() => {
  //   fetchArticles().then();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // const filters = {
  //   countryCode: router.query.code || Constants.defaultCountry.code,
  //   page: 0,
  //   size: Config.homepageBlogItemCount
  // };
  // const fetchArticles = async () => {
  //   const res = await axios.post(
  //     `${Constants.basePath.PEOPLE}/orchestration/blog/search`,
  //     filters
  //   );
  //   let articlesData = [];
  //   if (res && res.data) {
  //     articlesData =
  //       res.data.data && _.isArray(res.data.data.blogList)
  //         ? res.data.data.blogList
  //         : [];
  //     articlesData = articlesData.map(a => {
  //       if (a.articleType === 'Article') {
  //         const sanityArticle = JSON.parse(a.sanityObject);
  //         return {
  //           articleType: a.articleType,
  //           id: a.id,
  //           ...sanityArticle
  //         };
  //       } else {
  //         return {
  //           articleType: a.articleType,
  //           id: a.blogObjectJson?.id,
  //           imgURL: a.blogObjectJson?.articleData?.image?.desktop,
  //           href: a.blogObjectJson?.articleData?.href,
  //           tag: a.category,
  //           title: a.title,
  //           shortDescription: ''
  //         };
  //       }
  //     });
  //     setPosts([...articlesData]);
  //   }
  // };
  // const getBlogCategory = referenceId => {
  //   const item = _.find(categoriesList, { _id: referenceId });
  //   const title = item ? _.get(item.title, lang, '') : '';
  //   return title;
  // };

  return (
    <>
      {data && (
        <>
          <div className={styles.communityUpdateSection}>
            <div className="container pt-4 pb-5">
              <div className="d-flex justify-content-center">
                <div>
                  <div className="sectiontitle">{data.title}</div>
                  <p className="intro">{data.heading}</p>
                </div>
              </div>
              {data && (
                <div className="row mb-3 alignwidth">
                  <div className="col-sm-6 nopadlft responsiveMargin">
                    <div className={`h-100 ${styles.imageBox}`}>
                      <a
                        className="hoverImage h-100"
                        href={_.get(data && data.storiesfirst[0], 'route', '')}
                      >
                        <img
                          src={sanityUrlFor(
                            data && data.storiesfirst[0].image?.asset
                          )
                            .auto('format')
                            .url()}
                          className={styles.bigImage}
                        />
                      </a>
                      <div className={styles.bottomDiv}>
                        <div
                          className={
                            'tag ' +
                            _.get(data && data.storiesfirst[0], 'label', '')
                          }
                        >
                          <span>
                            {_.get(data && data.storiesfirst[0], 'label', '')}
                          </span>
                        </div>
                        <h3>
                          {_.get(data && data.storiesfirst[0], 'title', '')}
                        </h3>
                        <a
                          href={_.get(
                            data && data.storiesfirst[0],
                            'route',
                            ''
                          )}
                          className="btn themeButton buttonWhite"
                        >
                          {_.get(
                            data && data.storiesfirst[0],
                            'buttontext',
                            ''
                          )}
                        </a>
                      </div>
                    </div>
                  </div>
                  {data && (
                    <div className="col-sm-6 nopadryft">
                      <div
                        className={`mb-3 ${styles.imageBox} ${styles.imageBoxMaxHeight}`}
                      >
                        <a
                          className="hoverImage minCardStyle"
                          href={_.get(
                            data && data.storiessecond[0],
                            'route',
                            ''
                          )}
                        >
                          <img
                            src={sanityUrlFor(
                              data && data.storiessecond[0].image?.asset
                            )
                              .auto('format')
                              .url()}
                            className={styles.bigImage}
                          />
                        </a>
                        <div className={styles.bottomDiv}>
                          <div
                            className={
                              'tag ' +
                              _.get(data && data.storiessecond[0], 'label', '')
                            }
                          >
                            <span>
                              {_.get(
                                data && data.storiessecond[0],
                                'label',
                                ''
                              )}
                            </span>
                          </div>

                          <h3>
                            {_.get(data && data.storiessecond[0], 'title', '')}
                          </h3>
                          <a
                            href={_.get(
                              data && data.storiessecond[0],
                              'route',
                              ''
                            )}
                            className="btn themeButton buttonWhite"
                          >
                            {_.get(
                              data && data.storiessecond[0],
                              'buttontext',
                              ''
                            )}
                          </a>
                        </div>
                      </div>
                      {data && (
                        <div
                          className={`${styles.imageBox} ${styles.imageBoxMaxHeight}`}
                        >
                          <a
                            className="hoverImage minCardStyle"
                            href={_.get(
                              data && data.storiesthird[0],
                              'route',
                              ''
                            )}
                          >
                            <img
                              src={sanityUrlFor(
                                data && data.storiesthird[0].image?.asset
                              )
                                .auto('format')
                                .url()}
                              className={styles.bigImage}
                            />
                          </a>
                          <div className={styles.bottomDiv}>
                            <div
                              className={
                                'tag ' +
                                _.get(data && data.storiesthird[0], 'label', '')
                              }
                            >
                              <span>
                                {_.get(
                                  data && data.storiesthird[0],
                                  'label',
                                  ''
                                )}
                              </span>
                            </div>

                            <h3>
                              {_.get(data && data.storiesthird[0], 'title', '')}
                            </h3>
                            <a
                              href={_.get(
                                data && data.storiesthird[0],
                                'route',
                                ''
                              )}
                              className="btn themeButton buttonWhite"
                            >
                              {_.get(
                                data && data.storiesthird[0],
                                'buttontext',
                                ''
                              )}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {data.cta && data.cta.title && (
              <div className={`mt-4 mb-5 ${Styles.footerButton}`}>
                <a href="" title="" className="btn themeButton">
                  {''}
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MoreFromPolar;
