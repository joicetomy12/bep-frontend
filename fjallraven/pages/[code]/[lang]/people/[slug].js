import { getCookie } from 'cookies-next';
import groq from 'groq';
import * as _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

// import Carousel from 'react-multi-carousel';
// import EventCardTextOnly from '../../../../src/components/eventCardTextOnly';
// import FavoritProduct from '../../../../src/components/favoritProduct';
import FlowboxScript from '../../../../src/components/flowboxScript';
import TrekkInSwedenSection from '../../../../src/components/home/trekkInSwedenSection';
import Layout from '../../../../src/components/layout';
import PeopleDetail from '../../../../src/components/peopleDetail';
import PeopleQuestionire from '../../../../src/components/PeopleQuestionire';
import PeopleTopBanner from '../../../../src/components/peopleTopBanner';
import PeopleVideo from '../../../../src/components/PeopleVideo';
import { Constants } from '../../../../src/config/constants';
import sanityClientHandle from '../../../../src/config/sanityClient';
import { langToURI, uriToLang } from '../../../../src/config/utils';
import { langToURIUpper } from '../../../../src/config/utils';
import {
  getMenuItems,
  getPeopleCategoryList,
  getPeopleCategoryTags,
  getPeopleCountryList,
  getPeopleStatesList
} from '../../../../src/services/sanity';
import styles from '../../../../src/styles/people.module.css';
// import { FPData } from '../../../../src/staticData/alsoLikeProductData';
// import { Data } from '../../../../src/staticData/participatesEventData';

// const responsive = {
//   superLargeDesktop: {
//     breakpoint: { max: 4000, min: 3000 },
//     items: 1
//   },
//   xdisktop: {
//     breakpoint: { max: 3000, min: 2000 },
//     items: 1
//   },
//   desktop: {
//     breakpoint: { max: 2000, min: 1250 },
//     items: 1
//   },
//   tablet: {
//     breakpoint: { max: 1250, min: 464 },
//     items: 1
//   },
//   mobile: {
//     breakpoint: { max: 786, min: 0 },
//     items: 1
//   }
// };
const People = ({
  siteSettings,
  countries,
  menuItems,
  userId,
  pageData,
  peopleCategoryList,
  peopleCategoryTags,
  peopleCountryList,
  peopleStatesList,
  productDatas,
  peoplecountriesLists
}) => {
  const router = useRouter();
  const countryCode = router.query.code || Constants.defaultCountry.code;
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const langUri = langToURI(lang || Constants.defaultCountry.lang);
  const productData = siteSettings.peopleProductCard;

  // useEffect(() => {
  //   fetchPeople().then();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const fetchPeople = async () => {
  //   const res = await axios.post(
  //     `${Constants.basePath.PEOPLE}/orchestration/people/search`,
  //     {
  //       slugId: router.query.slug
  //     }
  //   );
  //   let people = null;
  //   if (res && res.data) {
  //     people =
  //       res.data.data &&
  //       res.data.data.peopleList &&
  //       res.data.data.peopleList.length > 0
  //         ? res.data.data.peopleList[0]
  //         : null;
  //     setPeople(people);
  //   }
  // };

  return (
    <Layout
      siteSettings={siteSettings}
      countries={countries}
      menuItems={menuItems}
      userId={userId}
      countryCode={countryCode}
      languageCode={langUri}
    >
      {pageData && (
        <div className={'page-people-detail'}>
          <PeopleTopBanner people={pageData} />
          <div className={`container ${styles.subcontainer}`}>
            <div className="row">
              <div className="col-sm-6 getDown ">
                <PeopleDetail
                  people={pageData}
                  lang={lang}
                  siteSettings={siteSettings}
                  peopleCategoryList={peopleCategoryList}
                  peopleCategoryTags={peopleCategoryTags}
                  peopleCountryList={peopleCountryList}
                  peopleStatesList={peopleStatesList}
                  peoplecountriesLists={peoplecountriesLists}
                />
              </div>
              <div className="col-sm-6 downtoearth rightSlides">
                {/* {pageData && pageData.question.length >0 && ( */}
                <PeopleQuestionire
                  className="min-over"
                  question={pageData.question}
                  people={pageData}
                />
                {/* )}  */}

                {/* {pageData.events && pageData.events.length > 0 && (
                  <>
                    <h3 className="eventTitleMain">Participates in 3 events</h3>
                    <div className="notSigned">
                      Not signed up for any current events
                    </div>
                    <Carousel responsive={responsive}>
                      {Data.map(event => {
                        return (
                          <EventCardTextOnly key={event.id} event={event} />
                        );
                      })}
                    </Carousel>
                  </>
                )} */}

                {/* {pageData.products && pageData.products.length > 0 && (
                  <>
                    <h3 className="eventTitleMain mt-2">Favorite products</h3>
                    <Carousel responsive={responsive}>
                      {FPData.map(product => {
                        return (
                          <FavoritProduct key={product.id} product={product} />
                        );
                      })}
                    </Carousel>
                  </>
                )} */}
              </div>
            </div>

            <div className="pt-3 getDown">
              <PeopleVideo people={pageData} lang={lang} />
              {productDatas.length > 0 && (
                <TrekkInSwedenSection
                  key={'trekkIn'}
                  productDatas={productDatas}
                  productContent={productData}
                />
              )}
            </div>

            <div className=" flowbox_down pt-10">
              {pageData.flowboxKey && (
                <div>
                  <h2>{siteSettings?.terms?.latestsPost[lang]}</h2>
                  <FlowboxScript flowBoxKey={pageData.flowboxKey} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

// export async function getStaticProps(context) {
//   // const countryCode = context.params.code || Constants.defaultCountry.code;
//   const userId = context.params.id || '';
//   const client = sanityClientHandle();
//   const siteSettingsQuery = groq`*[_type == "siteSettings" && _id=="siteSettings"]`;
//   const siteSettings = await client.fetch(siteSettingsQuery);
//   const queryCountry = groq`*[_type == "country"]{code, flag, lang, title}`;
//   const countriesList = await client.fetch(queryCountry);
//   const menuItems = await getMenuItems(client);
//   return {
//     props: {
//       menuItems,
//       siteSettings:
//         siteSettings && siteSettings.length > 0 ? siteSettings[0] : null,
//       countries: countriesList,
//       userId
//     }
//   };
// }

// export async function getStaticPaths() {
//   const pathArray = [];
//   for (let countryCode in Constants.countries) {
//     let languages = Constants.countries[countryCode];
//     for (let i = 0; i < languages.length; i++) {
//       let lang = languages[i];
//       const res = await axios.post(
//         `${Constants.basePath.pageData}/orchestration/people/search`,
//         {
//           countryCode: countryCode,
//           page: 0,
//           size: 100
//         }
//       );
//       let peopleData = [];
//       if (res && res.data && res.data.data) {
//         peopleData =
//           res.data.data.peopleList && _.isArray(res.data.data.peopleList)
//             ? res.data.data.peopleList
//             : [];
//       }
//       for (let i = 0; i < peopleData.length; i++) {
//         pathArray.push({
//           params: {
//             code: countryCode,
//             lang: langToURI(lang),
//             slug: peopleData[i].slugId,
//             id: ''
//           }
//         });
//       }
//     }
//   }

//   return { paths: pathArray, fallback: false };
// }

People.getInitialProps = async function (context) {
  const lang = context.query.lang || Constants.defaultCountry.lang;
  const userId = context.query.id || '';
  const client = sanityClientHandle();
  const countryCode = context.query.code || Constants.defaultCountry.code;
  const siteSettingsQuery = groq`*[_type == "siteSettings" && _id=="siteSettings"]`;
  const siteSettings = await client.fetch(siteSettingsQuery);
  const queryPage = groq`*[_type == "people" && slug.current=="${context.query.slug}"]`;
  const queryCountry = groq`*[_type == "country"]{code, flag, lang, title}`;
  const countriesList = await client.fetch(queryCountry);
  const pages = await client.fetch(queryPage);
  const menuItems = await getMenuItems(client);
  const productId = _.get(pages[0], 'productcard');
  const countries = groq`*[_type == "countryData" && !(_id in path('drafts.**'))]`;
  const peoplecountriesLists = await client.fetch(countries);
  const peopleCategoryList = await getPeopleCategoryList(client);
  const peopleCategoryTags = await getPeopleCategoryTags(client);
  const peopleCountryList = await getPeopleCountryList(client);
  const peopleStatesList = await getPeopleStatesList(client);
  const languageCode = langToURIUpper(lang);
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
    menuItems,
    siteSettings:
      siteSettings && siteSettings.length > 0 ? siteSettings[0] : null,
    countries: countriesList,
    userId,
    peopleCategoryList,
    peopleCategoryTags,
    userIdDataId,
    userStatus,
    peopleCountryList,
    peopleStatesList,
    pageData: pages && pages.length > 0 ? pages[0] : null,
    productDatas,
    peoplecountriesLists
  };
};

export default People;
