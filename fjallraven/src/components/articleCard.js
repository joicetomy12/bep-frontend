import { useRouter } from 'next/router';
import React from 'react';

import { Constants } from '../config/constants';
import { sanityUrlFor } from '../config/sanityUrlFor';
import { uriToLang } from '../config/utils';
import { useCountry } from '../providers/countryProvider';
import { useGlobal } from '../providers/globalProvider';
import Styles from '../styles/articleCardStyle.module.css';
import { ChevronRight } from './icons';
import SanityBlockContent from './sanityBlockContent';
const ArticleCard = ({ article, category }) => {
  const { siteSettings } = useGlobal();
  const router = useRouter();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const isArticle = !!(
    article.articleType && article.articleType === 'Article'
  );
  const { genUrl } = useCountry();
  let articleTag = '';
  if (isArticle && article.categories && article) {
    category.filter(tag => {
      if (tag._id === article.categories[0]._ref) {
        return (articleTag = tag);
      }
    });
  }
  return (
    <div key={article.id} className="col-sm-4 mb-4">
      <div className={Styles.FeatureCard}>
        <div className={Styles.cardBackgroundImage + ' ' + Styles[article.tag]}>
          <a
            href={
              article.articleType && article.articleType === 'Article'
                ? genUrl(`article/${article.slug.current}`)
                : article.href
            }
          >
            <img
              src={
                isArticle
                  ? sanityUrlFor(article.image?.asset)
                      .width(350)
                      .height(250)
                      .auto('format')
                      .url()
                  : article.imgURL
              }
              alt=""
            />
          </a>
        </div>
        <div className={Styles.cardAbout}>
          <div className={Styles.addresCard}>
            <div className="d-flex align-items-center">
              {isArticle && articleTag.title[lang] ? (
                <div
                  className={Styles.tag + ' ' + Styles[articleTag.title[lang]]}
                >
                  <span>{articleTag.title[lang]}</span>
                </div>
              ) : (
                <div className={Styles.tag + ' ' + Styles[article.tag]}>
                  <span>{article.tag}</span>
                </div>
              )}
              <div className={Styles.tagText}>
                {isArticle && article.readingTime[lang]
                  ? article.readingTime[lang]
                  : ''}
              </div>
            </div>
          </div>
          <div className={Styles.cardTitle}>
            <a
              href={
                article.articleType && article.articleType === 'Article'
                  ? genUrl(`article/${article.slug.current}`)
                  : article.href
              }
            >
              {isArticle ? article.title[lang] : article.title}
            </a>
          </div>
          {!isArticle && (
            <div className={Styles.cardDescription}>
              {article.shortDescription}
            </div>
          )}
          {isArticle && article.excerpt[lang] && (
            <div className={Styles.cardDescription}>
              <SanityBlockContent blocks={article.excerpt[lang]} />
            </div>
          )}
          <a
            href={
              article.articleType && article.articleType === 'Article'
                ? genUrl(`article/${article.slug.current}`)
                : article.href
            }
            className={Styles.goToEvent}
          >
            {siteSettings?.terms?.getToKnow[lang]}
            <div className={Styles.chevronRightIcon}>
              <ChevronRight />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
