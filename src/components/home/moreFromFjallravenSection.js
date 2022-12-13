import axios from 'axios';
import * as _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Config } from '../../config/config';
import { Constants } from '../../config/constants';
import { sanityUrlFor } from '../../config/sanityUrlFor';
import { uriToLang } from '../../config/utils';
import { useCountry } from '../../providers/countryProvider';
import Styles from '../../styles/home/featuredEventSectionStyle.module.css';
import styles from '../../styles/home/moreFromFjallravenSectionStyle.module.css';

const MoreFromFjallravenSection = ({ data, categoriesList }) => {
  const router = useRouter();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);

  const [posts, setPosts] = useState([]);
  const { genUrl } = useCountry();
  useEffect(() => {
    fetchArticles().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filters = {
    countryCode: router.query.code || Constants.defaultCountry.code,
    page: 0,
    size: Config.homepageBlogItemCount
  };
  const fetchArticles = async () => {
    const res = await axios.post(
      `${Constants.basePath.PEOPLE}/orchestration/blog/search`,
      filters
    );
    let articlesData = [];
    if (res && res.data) {
      articlesData =
        res.data.data && _.isArray(res.data.data.blogList)
          ? res.data.data.blogList
          : [];
      articlesData = articlesData.map(a => {
        if (a.articleType === 'Article') {
          const sanityArticle = JSON.parse(a.sanityObject);
          return {
            articleType: a.articleType,
            id: a.id,
            ...sanityArticle
          };
        } else {
          return {
            articleType: a.articleType,
            id: a.blogObjectJson?.id,
            imgURL: a.blogObjectJson?.articleData?.image?.desktop,
            href: a.blogObjectJson?.articleData?.href,
            tag: a.category,
            title: a.title,
            shortDescription: ''
          };
        }
      });
      setPosts([...articlesData]);
    }
  };
  const getBlogCategory = referenceId => {
    const item = _.find(categoriesList, { _id: referenceId });
    const title = item ? _.get(item.title, lang, '') : '';
    return title;
  };
  return (
    <>
      {data && (
        <>
          <div className={styles.communityUpdateSection}>
            <div className="container pt-4">
              <div className="d-flex justify-content-center">
                <div>
                  <div className="sectiontitle">{data.heading[lang]}</div>
                  <p className="intro">{data.tagline[lang]}</p>
                </div>
              </div>
              {posts && posts.length > 0 && (
                <div className="row mb-3 alignwidth">
                  <div className="col-sm-6 nopadlft responsiveMargin">
                    <div className={`h-100 ${styles.imageBox}`}>
                      <a
                        className="hoverImage h-100"
                        href={
                          posts[0].articleType &&
                          posts[0].articleType === 'Article'
                            ? genUrl(`article/${posts[0].slug.current}`)
                            : posts[0].href
                        }
                      >
                        <img
                          src={
                            posts[0].articleType &&
                            posts[0].articleType === 'Article'
                              ? sanityUrlFor(posts[0].image?.asset)
                                  .auto('format')
                                  .url()
                              : posts[0].imgURL
                          }
                          className={styles.bigImage}
                        />
                      </a>
                      <div className={styles.bottomDiv}>
                        {posts[0].articleType &&
                        posts[0].articleType === 'Article' ? (
                          <div
                            className={
                              'tag ' + posts[0]?.category?.toLowerCase()
                            }
                          >
                            <span>
                              {getBlogCategory(
                                _.get(
                                  posts[0] && posts[0].categories[0],
                                  '_ref',
                                  ''
                                )
                              )}
                            </span>
                          </div>
                        ) : (
                          <div className={'tag ' + _.get(posts[0], 'tag', '')}>
                            <span>{_.get(posts[0], 'tag', '')}</span>
                          </div>
                        )}
                        <h3>
                          {posts[0].articleType &&
                          posts[0].articleType === 'Article'
                            ? posts[0].title[lang]
                            : posts[0].title}
                        </h3>
                        <a
                          href={
                            posts[0].articleType &&
                            posts[0].articleType === 'Article'
                              ? genUrl(`article/${posts[0].slug.current}`)
                              : posts[0].href
                          }
                          className="btn themeButton buttonWhite"
                        >
                          read more
                        </a>
                      </div>
                    </div>
                  </div>
                  {posts && posts.length > 1 && (
                    <div className="col-sm-6 nopadryft pl-0">
                      <div
                        className={`mb-3 ${styles.imageBox} ${styles.imageBoxMaxHeight}`}
                      >
                        <a
                          className="hoverImage minCardStyle"
                          href={
                            posts[1].articleType &&
                            posts[1].articleType === 'Article'
                              ? genUrl(`article/${posts[1].slug.current}`)
                              : posts[1].href
                          }
                        >
                          <img
                            src={
                              posts[1].articleType &&
                              posts[1].articleType === 'Article'
                                ? sanityUrlFor(posts[1].image?.asset)
                                    .auto('format')
                                    .url()
                                : posts[1].imgURL
                            }
                            className={styles.bigImage}
                          />
                        </a>
                        <div className={styles.bottomDiv}>
                          {posts[1].articleType &&
                          posts[1].articleType === 'Article' ? (
                            <div
                              className={
                                'tag ' + posts[1]?.category?.toLowerCase()
                              }
                            >
                              <span>
                                {getBlogCategory(
                                  _.get(
                                    posts[1] && posts[1].categories[0],
                                    '_ref',
                                    ''
                                  )
                                )}
                              </span>
                            </div>
                          ) : (
                            <div
                              className={'tag ' + _.get(posts[1], 'tag', '')}
                            >
                              <span>{_.get(posts[1], 'tag', '')}</span>
                            </div>
                          )}
                          <h3>
                            {posts[1].articleType &&
                            posts[1].articleType === 'Article'
                              ? posts[1].title[lang]
                              : posts[1].title}
                          </h3>
                          <a
                            href={
                              posts[1].articleType &&
                              posts[1].articleType === 'Article'
                                ? genUrl(`article/${posts[1].slug.current}`)
                                : posts[1].href
                            }
                            className="btn themeButton buttonWhite"
                          >
                            read more
                          </a>
                        </div>
                      </div>
                      {posts && posts.length > 2 && (
                        <div
                          className={`${styles.imageBox} ${styles.imageBoxMaxHeight}`}
                        >
                          <a
                            className="hoverImage minCardStyle"
                            href={
                              posts[2].articleType &&
                              posts[2].articleType === 'Article'
                                ? genUrl(`article/${posts[2].slug.current}`)
                                : posts[2].href
                            }
                          >
                            <img
                              src={
                                posts[2].articleType &&
                                posts[2].articleType === 'Article'
                                  ? sanityUrlFor(posts[2].image?.asset)
                                      .auto('format')
                                      .url()
                                  : posts[2].imgURL
                              }
                              className={styles.bigImage}
                            />
                          </a>
                          <div className={styles.bottomDiv}>
                            {posts[2].articleType &&
                            posts[2].articleType === 'Article' ? (
                              <div
                                className={
                                  'tag ' + posts[2]?.category?.toLowerCase()
                                }
                              >
                                <span>
                                  {getBlogCategory(
                                    _.get(
                                      posts[2] && posts[2].categories[0],
                                      '_ref',
                                      ''
                                    )
                                  )}
                                </span>
                              </div>
                            ) : (
                              <div
                                className={'tag ' + _.get(posts[2], 'tag', '')}
                              >
                                <span>{_.get(posts[2], 'tag', '')}</span>
                              </div>
                            )}
                            <h3>
                              {' '}
                              {posts[2].articleType &&
                              posts[2].articleType === 'Article'
                                ? posts[2].title[lang]
                                : posts[2].title}
                            </h3>
                            <a
                              href={
                                posts[2].articleType &&
                                posts[2].articleType === 'Article'
                                  ? genUrl(`article/${posts[2].slug.current}`)
                                  : posts[2].href
                              }
                              className="btn themeButton buttonWhite"
                            >
                              read more
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
                <a
                  href={genUrl(`articles`)}
                  title=""
                  className="btn themeButton"
                >
                  {_.capitalize(data.cta.title[lang])}
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MoreFromFjallravenSection;
