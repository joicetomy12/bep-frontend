// import axios from 'axios';
import { getCookie } from 'cookies-next';
import groq from 'groq';
import * as _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

import Layout from '../../src/components/layout';
import CommunityUpdatesSectionPolar from '../../src/components/polarhome/CommunityUpdatesSectionPolar';
import RegisterKickOff from '../../src/components/polarhome/RegisterKickOff';
import CommonHeaderSection from '../../src/components/PolarStories/commonHeaderSectionPolar';
import PolarPlayingVideo from '../../src/components/PolarStories/PolarPlayingVideo';
import TopSelectionSection from '../../src/components/PolarStories/topSelectionSectionStories';
import { Constants } from '../../src/config/constants';
import sanityClientHandle from '../../src/config/sanityClient';
import { langToURI, uriToLang } from '../../src/config/utils';
import { getMenuItems } from '../../src/services/sanity';
const Community = ({
  page,
  siteSettings,
  countries,
  menuItems,
  //storiesList,
  //   categories,
  userId
}) => {
  const content = page && page.content ? page.content : null;
  const router = useRouter();
  const countryCode = router.query.code || Constants.defaultCountry.code;
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const langUri = langToURI(lang || Constants.defaultCountry.lang);
  const renderComponent = data => {
    if (data.disabled) return;
    if (data._type === 'topSelectionArticleSectionPolar')
      return <TopSelectionSection key={'topSelection'} data={data} />;
    if (data._type === 'polarRegistrationCard') {
      return <RegisterKickOff key={'polarRegistrationCard'} data={data} />;
    }
    if (data._type === 'communityUpdatePolar')
      return (
        <CommunityUpdatesSectionPolar
          key={'communityUpdatePolar'}
          data={data}
        />
      );

    if (data._type === 'polarVideoHighlightsYoutubeSection') {
      const storiesList =
        data && data.polarvideohighlightsyoutubevideos
          ? data.polarvideohighlightsyoutubevideos
          : null;
      const storiesListing = _.sortBy(storiesList, ['sequence']);
      return (
        storiesListing &&
        storiesListing.length > 0 &&
        storiesListing.map((obj, index) => {
          return <PolarPlayingVideo data={obj} key={index} />;
        })
      );
    }
    switch (data.section) {
      case 'moreFromFj':
        return (
          <CommonHeaderSection
            key={'topSelectionArticleSectionPolar'}
            data={data}
          />
        );
      default:
        return;
    }
  };

  return (
    <Layout
      siteSettings={siteSettings}
      countries={countries}
      menuItems={menuItems}
      userId={userId}
      countryCode={countryCode}
      languageCode={langUri}
    >
      <div className={'page-home'}>
        {content && _.isArray(content) && content.map(c => renderComponent(c))}
      </div>
    </Layout>
  );
};

Community.getInitialProps = async function (context) {
  const userId = context.query.id || '';
  const client = sanityClientHandle();
  const lang = context.query.lang || Constants.defaultCountry.lang;
  const countryCode = context.query.code || Constants.defaultCountry.code;
  const query = groq`*[_type == "polarPagesListing" && _id=="communityPolarListings"]`;
  const pages = await client.fetch(query);
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
  const queryCountry = groq`*[_type == "country"]{code, flag, lang, title}`;
  const countriesList = await client.fetch(queryCountry);

  const menuItems = await getMenuItems(client);

  return {
    menuItems,
    userIdDataId,
    //storiesList,
    userStatus,
    page: pages && pages.length > 0 ? pages[0] : null,
    siteSettings:
      siteSettings && siteSettings.length > 0 ? siteSettings[0] : null,
    countries: countriesList,
    userId
  };
};

export default Community;
