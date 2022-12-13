import { getCookie } from 'cookies-next';
import groq from 'groq';
import * as _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

import CommonHeaderSection from '../src/components/home/commonHeaderSection';
import CommunityUpdatesSection from '../src/components/home/communityUpdatesSection';
import FeaturedEventSection from '../src/components/home/featuredEventSection';
import GetUpdateSection from '../src/components/home/getUpdateSection';
import MapSection from '../src/components/home/mapSection';
import MoreFromFjallravenSection from '../src/components/home/moreFromFjallravenSection';
import NowLaunchingSection from '../src/components/home/nowLaunchingSection';
import PeopleSection from '../src/components/home/peopleSection';
import RecentVideosSection from '../src/components/home/recentVideosSection';
import TopSelectionSection from '../src/components/home/topSelectionSection';
import TrekkInSwedenSection from '../src/components/home/trekkInSwedenSection';
import WelcomeSection from '../src/components/home/welcomeSection';
import Layout from '../src/components/layout';
import { Constants } from '../src/config/constants';
import sanityClientHandle from '../src/config/sanityClient';
import { langToProduct, langToURI, uriToLang } from '../src/config/utils';
import {
  getMenuItems,
  getPeopleCategoryList,
  getPeopleCategoryTags,
  getPeopleCountryList
} from '../src/services/sanity';

const HomeIndex = ({
  page,
  userId,
  productDatas,
  countries,
  categoriesList,
  menuItems,
  siteSettings,
  peopleCategoryList,
  peopleCategoryTags,
  peopleCountryList,
  peoplecountriesLists
}) => {
  const router = useRouter();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const content = page && page.content ? page.content : null;
  const countryCode = router.query.code || Constants.defaultCountry.code;
  const langUri = langToURI(lang || Constants.defaultCountry.lang);
  let productSectionRendered = false;
  const pageTypeInfo = 'mainHome';
  const heroData = _.find(content, {
    _type: Constants.homepageSectionTypes.HERO
  });

  const productData = _.find(content, {
    _type: Constants.homepageSectionTypes.PRODUCT
  });

  const learnMoreData = _.find(content, {
    _type: Constants.homepageSectionTypes.LEARN_MORE
  });
  const renderComponent = data => {
    if (data.disabled) return;
    if (data._type === Constants.homepageSectionTypes.HERO) return;
    if (data._type === Constants.homepageSectionTypes.VIDEO_SECTION)
      return <RecentVideosSection key={'recentVideos'} data={data} />;
    if (data._type === Constants.homepageSectionTypes.COMMUNITY_UPDATE)
      return <CommunityUpdatesSection key={'communityUpdate'} data={data} />;
    if (data._type === Constants.homepageSectionTypes.GET_UPDATE_SECTION)
      return (
        <GetUpdateSection
          key={'getUpdate'}
          data={data}
          countryCode={countryCode}
          languageCode={langUri}
        />
      );

    if (data._type === Constants.homepageSectionTypes.PROMOTION)
      return <NowLaunchingSection key={'nowLaunching'} data={data} />;
    if (data._type === Constants.homepageSectionTypes.TOP_SELECTION_SECTION)
      return <TopSelectionSection key={'topSelection'} data={data} />;

    if (
      data._type === Constants.homepageSectionTypes.LEARN_MORE &&
      !productSectionRendered &&
      !_.isEmpty(productDatas)
    ) {
      if (
        (productData && !productData.disabled) ||
        (learnMoreData && !learnMoreData.disabled)
      ) {
        productSectionRendered = true;
        return (
          <TrekkInSwedenSection
            key={'trekkIn'}
            learnMore={learnMoreData}
            productDatas={productDatas}
            productContent={productData}
          />
        );
      }
    }

    switch (data.section) {
      case 'map':
        return (
          <MapSection
            key={'map'}
            data={data}
            peopleCategoryList={peopleCategoryList}
            peopleCountryList={peopleCountryList}
          />
        );
      case 'feature_event':
        return (
          <FeaturedEventSection
            heroImg={heroData}
            key={'featureEvents'}
            countryCode={countryCode}
            data={data}
          />
        );
      case 'people':
        return (
          <PeopleSection
            key={'people'}
            data={data}
            peopleCategoryList={peopleCategoryList}
            peopleCategoryTags={peopleCategoryTags}
            peopleCountryList={peopleCountryList}
            peoplecountriesLists={peoplecountriesLists}
          />
        );
      case 'moreFromFj':
        return (
          <MoreFromFjallravenSection
            key={'moreFromFj'}
            data={data}
            categoriesList={categoriesList}
          />
        );
      case 'promotion':
        return <CommonHeaderSection key={'promotion'} data={data} />;
      default:
        return;
    }
  };

  return (
    <Layout
      userId={userId}
      pageTypeInfo={pageTypeInfo}
      menuItems={menuItems}
      siteSettings={siteSettings}
      content={content}
      countryCode={countryCode}
      languageCode={langUri}
    >
      <div className={'page-home'}>
        {heroData && !heroData.disabled && (
          <WelcomeSection data={heroData} countries={countries} />
        )}
        {content && _.isArray(content) && content.map(c => renderComponent(c))}
      </div>
    </Layout>
  );
};

const query = groq`*[_type == "page" && _id=="frontpage"]`;

HomeIndex.getInitialProps = async function (context) {
  const lang = context.query.lang || Constants.defaultCountry.lang;
  const languageCode = langToProduct(lang);
  const countryCode = context.query.code || Constants.defaultCountry.code;
  const client = sanityClientHandle();
  const queryCategory = groq`*[_type == "articleCategory"]`;
  const categoriesList = await client.fetch(queryCategory);
  const userId = context.query.id || '';
  const pages = await client.fetch(query);
  const pageData = pages && pages.length > 0 ? pages[0] : null;
  const contents = pageData && pageData.content ? pageData.content : null;
  const product = _.filter(contents, {
    _type: Constants.homepageSectionTypes.PRODUCT
  });
  const productId = _.get(product[0], 'productId');
  const queryCountry = groq`*[_type == "country"]{code, flag, lang, title}`;
  const countriesList = await client.fetch(queryCountry);

  const countries = groq`*[_type == "countryData" && !(_id in path('drafts.**'))]`;
  const peoplecountriesLists = await client.fetch(countries);

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
  const peopleCategoryList = await getPeopleCategoryList(client);
  const peopleCategoryTags = await getPeopleCategoryTags(client);
  const peopleCountryList = await getPeopleCountryList(client);
  const menuItems = await getMenuItems(client);
  let productDatas = {};
  if (!_.isEmpty(productId)) {
    const productDataResponse1 = await fetch(
      `https://app-b2cbep-uat-001.azurewebsites.net/orchestration/product/featuredProducts?product=${productId}&language=${languageCode}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    productDatas = await productDataResponse1.json();
    if (productDataResponse1.status === 500) {
      await fetch(
        'https://app-b2cbep-uat-001.azurewebsites.net/orchestration/product/clearProducts',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const productDataResponseRecall = await fetch(
        `https://app-b2cbep-uat-001.azurewebsites.net/orchestration/product/featuredProducts?product=${productId}&language=${languageCode}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      productDatas = await productDataResponseRecall.json();
    }
  }
  return {
    userId,
    userIdDataId,
    userStatus,
    menuItems,
    page: pages && pages.length > 0 ? pages[0] : null,
    countries: countriesList,
    siteSettings:
      siteSettings && siteSettings.length > 0 ? siteSettings[0] : null,
    productDatas,
    peopleCategoryList,
    peopleCategoryTags,
    categoriesList,
    peopleCountryList,
    peoplecountriesLists
  };
};

export default HomeIndex;
