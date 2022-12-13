import 'react-multi-carousel/lib/styles.css';

import { getCookie } from 'cookies-next';
import groq from 'groq';
import * as _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

import DetailHeroHeader from '../../../../src/components/detailHeroHeader';
import Layout from '../../../../src/components/layout';
import SanityBlockContent from '../../../../src/components/sanityBlockContent';
import { Constants } from '../../../../src/config/constants';
import sanityClientHandle from '../../../../src/config/sanityClient';
import { langToURI, uriToLang } from '../../../../src/config/utils';
import { getMenuItems } from '../../../../src/services/sanity';
import styles from '../../../../src/styles/articleContent.module.css';

const Article = ({ siteSettings, pageData, menuItems, userId }) => {
  const router = useRouter();
  const countryCode = router.query.code || Constants.defaultCountry.code;
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const langUri = langToURI(lang || Constants.defaultCountry.lang);

  return (
    <Layout
      siteSettings={siteSettings}
      menuItems={menuItems}
      userId={userId}
      countryCode={countryCode}
      languageCode={langUri}
    >
      <div className={'page-events page-article-details'}>
        {pageData && (
          <>
            <DetailHeroHeader
              title={pageData.title[lang]}
              imgURL={pageData.image}
              readingTime={pageData.readingTime}
              tag={
                pageData.categories && pageData.categories.length > 0
                  ? pageData.categories[0].title[lang]
                  : ''
              }
            />
            <div className={`container ${styles.body}`}>
              <SanityBlockContent blocks={pageData.body[lang]} />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

Article.getInitialProps = async function (context) {
  const userId = context.query.id || '';
  const countryCode = context.query.code || Constants.defaultCountry.code;
  const lang = context.query.lang || Constants.defaultCountry.lang;
  const client = sanityClientHandle();
  const siteSettingsQuery = groq`*[_type == "siteSettings" && _id=="siteSettings"]`;
  const siteSettings = await client.fetch(siteSettingsQuery);
  let { req, res } = context;
  const userIdDataId = getCookie('activeUserId', { req, res });
  let userStatus = {};
  if (!_.isEmpty(userIdDataId)) {
    let dataCountryCode = countryCode;
    if (dataCountryCode === 'se') {
      dataCountryCode = 'sw';
    }
    const cartDataResponse = await fetch(
      Constants.basePath.ORCHESTRATION_API_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          request_type: 'POST',
          epi_request_endpoint: `/${lang}/api/bependpoints/userstatus`,
          epi_request_params: {
            brand: 'fjallraven',
            marketId: _.upperCase(dataCountryCode),
            userId: userIdDataId
          }
        })
      }
    );
    userStatus = await cartDataResponse.json();
  }
  const queryPage = groq`*[_type == "article" && slug.current=="${context.query.slug}"]{categories[]->{title}, ...}`;
  const pages = await client.fetch(queryPage);
  const menuItems = await getMenuItems(client);
  return {
    userIdDataId,
    userStatus,
    menuItems,
    siteSettings:
      siteSettings && siteSettings.length > 0 ? siteSettings[0] : null,
    pageData: pages && pages.length > 0 ? pages[0] : null,
    userId
  };
};

export default Article;
