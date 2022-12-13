import * as _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

import { Constants } from '../../config/constants';
import { CurrencySymbols } from '../../config/currencySymbols';
import { sanityUrlFor } from '../../config/sanityUrlFor';
import { langToMarket, langToURIUpper, uriToLang } from '../../config/utils';
import styles from '../../styles/home/trekkInSwedenSectionStyle.module.css';

const TrekkInSwedenSection = ({ learnMore, productContent, productDatas }) => {
  const router = useRouter();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const langCode = langToURIUpper(
    router.query.lang || Constants.defaultCountry.lang
  );
  const langExt = router.query.lang || Constants.defaultCountry.lang;
  const countryCode = router.query.code || Constants.defaultCountry.code;
  const market = langToMarket(langCode, langExt, countryCode);
  const getPrice = referenceId => {
    const item = _.find(referenceId, { market: _.upperCase(market) });
    const price = item ? item.suggestedRetailPrice.replace('.', ',') : '';
    let priceTitle = '';
    if (item && item.currency && CurrencySymbols.symbols) {
      CurrencySymbols.symbols[item && item.currency].position &&
      CurrencySymbols.symbols[item && item.currency].position == 'prefix'
        ? (priceTitle = `${
            CurrencySymbols.symbols[item && item.currency].symbol
          }${' ' + price}`)
        : (priceTitle = `${price + ' '}${
            CurrencySymbols.symbols[item && item.currency].symbol
          }`);
    }
    return priceTitle;
  };
  const getLinkUrl = () => {
    const siteUrl = _.get(productDatas && productDatas[0], 'siteUrl');
    const bepPdpUrl = _.get(productDatas && productDatas[0], 'bepPdpUrl');
    const splitBepPdpUrl = bepPdpUrl && bepPdpUrl.split('|');
    let url = '';
    if (!_.isEmpty(splitBepPdpUrl)) {
      if (countryCode === 'uk') {
        url = splitBepPdpUrl[1];
      } else if (countryCode === 'eu') {
        url = splitBepPdpUrl[0];
      } else {
        url = splitBepPdpUrl;
      }
    } else {
      url = siteUrl;
    }
    return url;
  };

  return (
    <>
      {(learnMore || (productContent && productDatas && productDatas[0])) && (
        <div className="container">
          <div className={styles.shopPadding}>
            <>
              <React.Fragment key={_.get(productDatas[0], 'title', [])}>
                <div
                  key={_.get(productDatas[0], 'articleNo', [])}
                  className={'col-sm-6'}
                >
                  <div className={styles.shopBox}>
                    <h2>{productContent.title[lang]}</h2>
                    <div className={`d-flex mt-5 ${styles.shopFlex}`}>
                      <div className={`w-50 ${styles.width100}`}>
                        {!_.isEmpty(_.get(productDatas[0], 'mainMedia')) && (
                          <img
                            src={
                              _.get(productDatas[0], 'mainMedia') +
                              `?impolicy=thumbnail`
                            }
                            className={styles.shopImage}
                          />
                        )}
                      </div>
                      <div className={`w-50 ${styles.width100}`}>
                        <div className={styles.descText}>
                          <h3>{_.get(productDatas[0], 'name')}</h3>
                          <h4>
                            {' '}
                            {getPrice(
                              _.get(productDatas[0], 'productSkuList', [])
                            )}
                          </h4>
                          <p>{_.get(productDatas[0], 'shortDescription')}</p>
                          {
                            <a
                              target="_blank"
                              href={getLinkUrl()}
                              className={'btn themeButton ' + styles.primaryBtn}
                              rel="noreferrer"
                            >
                              {productContent.cta?.title[lang]}
                            </a>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            </>

            {learnMore && (
              <div
                className={
                  productDatas && productDatas.length > 0
                    ? 'col-sm-6 ml-14px'
                    : 'col-sm-12'
                }
              >
                <div className="position-relative h-100 hoverImage rounderDiv">
                  <a className="hoverImage  h-100">
                    <img
                      src={sanityUrlFor(learnMore.image?.asset).auto('format')}
                      className={styles.bigImage}
                    />
                  </a>
                  <div className={styles.centerDiv}>
                    <h3>{learnMore.title[lang]}</h3>
                    <p>{learnMore.subtitle[lang]}</p>
                    <a
                      href={learnMore.route[lang]}
                      className={`btn themeButton buttonWhite mt-5 mx-auto ${styles.primaryBtn}`}
                    >
                      {learnMore.cta?.title[lang]}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TrekkInSwedenSection;
