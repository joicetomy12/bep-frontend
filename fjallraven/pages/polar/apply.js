// import axios from 'axios';
import { getCookie } from 'cookies-next';
import groq from 'groq';
import * as _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

// import ArticlesCard from '../../src/components/articleCard';
import Layout from '../../src/components/layout';
import PolarForm from '../../src/components/polarhome/PolarForm';
import RegisterKickOff from '../../src/components/polarhome/RegisterKickOff';
import WelcomeSection from '../../src/components/polarhome/welcomeSection';
import CommonHeaderSection from '../../src/components/PolarStories/commonHeaderSectionPolar';
import TopSelectionSection from '../../src/components/PolarStories/topSelectionSectionStories';
// import ListHeader from '../../src/components/polarhome/listHeader';
// import PagePagination from '../../src/components/PagePagination';
import { Constants } from '../../src/config/constants';
import sanityClientHandle from '../../src/config/sanityClient';
import { langToURI, uriToLang } from '../../src/config/utils';
import { getMenuItems } from '../../src/services/sanity';
// const getQueryParam = url => {
//   const qs = url.substring(url.indexOf('?') + 1).split('&');
//   let result = { id: '', category: '' };
//   for (let i = 0; i < qs.length; i++) {
//     qs[i] = qs[i].split('=');
//     result[qs[i][0]] = qs[i][1];
//   }
//   return result;
// };
const Application = ({ page, siteSettings, countries, menuItems, userId }) => {
  const content = page && page.content ? page.content : null;
  const polarFormData = _.find(content, {
    _type: 'polarApplicationConfirmed'
  });
  const router = useRouter();
  //   const queryParam = getQueryParam(router.asPath);
  //   const categoryId = !_.isEmpty(router.query.category)
  //     ? router.query.category
  //     : queryParam.category;

  const countryCode = router.query.code || Constants.defaultCountry.code;
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const langUri = langToURI(lang || Constants.defaultCountry.lang);
  // //   const [articles, setArticles] = useState([]);
  // //   const [totalCount, setTotalCount] = useState(0);
  //   const [curPage, setCurPage] = useState(1);
  // //   const [tags, setTags] = useState([]);
  //   const [searchInit, setSearchInit] = useState(false);
  //   let pageSize = 9;
  //   const [filters, setFilters] = useState({
  //     countryCode: countryCode,
  //     // name: '',
  //     page: curPage - 1 < 0 ? 0 : curPage - 1,
  //     size: 3
  //     // category: ''
  //   });
  //   const categoryExists = (id, arr) => {
  //     return arr.some(function (el) {
  //       return el.id === id;
  //     });
  //   };
  //   const noResults = _.get(
  //     siteSettings && siteSettings.terms && siteSettings.terms.searchResults,
  //     lang,
  //     'No Results'
  //   );
  //   useEffect(() => {
  //     // if(filters.searchTerm || (filters.category && filters.category.length >= 0)) setCurPage(1);
  //     fetchArticles().then();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [filters]);

  //   useEffect(() => {
  //     // if(filters.searchTerm || (filters.category && filters.category.length >= 0)) setCurPage(1);
  //     fetchArticleapidata().then();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [router]);

  //   const fetchArticleapidata = async () => {
  //     const apiRes = await axios.post(
  //       `${Constants.basePath.PEOPLE}/orchestration/blog/search`,
  //       {
  //         countryCode: countryCode
  //       }
  //     );
  //     const articleSubmenuList = apiRes.data.data.categoryList
  //       ? apiRes.data.data.categoryList
  //       : [];
  //     let customArticleFilterSet = [];
  //     _.isArray(articleSubmenuList) &&
  //       articleSubmenuList.length > 0 &&
  //       articleSubmenuList.map(articleData => {
  //         const idGeneratedValue = articleData.replace(/ /g, '_');
  //         !categoryExists(articleData, customArticleFilterSet) &&
  //           customArticleFilterSet.push({
  //             id: articleData,
  //             attrid: idGeneratedValue,
  //             title: articleData
  //           });
  //       });
  //     setTags(customArticleFilterSet);
  //   };

  //   useEffect(() => {
  //     setFilters({
  //       ...filters,
  //       page: curPage - 1
  //     });
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [curPage]);
  //   const fetchArticles = async () => {
  //     if (window.innerWidth < 700) {
  //       filters.size = 6;
  //     } else {
  //       filters.size = 9;
  //     }
  //     if (filters.category && filters.category.length === 0) {
  //       delete filters.category;
  //       filters.page = 0;
  //     }
  //     if (filters.searchTerm || filters.stateId) {
  //       if (searchInit) filters.page = 0;
  //       else filters.page = curPage - 1 > 0 ? curPage - 1 : 0;
  //     }
  //     if (categoryId) {
  //       filters.category = [categoryId.trim().replace(/_/g, ' ')];
  //       filters.page = curPage - 1 > 0 ? curPage - 1 : 0;
  //     }
  //     const res = await axios.post(
  //       `${Constants.basePath.PEOPLE}/orchestration/blog/search`,
  //       filters
  //     );
  //     let articlesData = [];
  //     if (res && res.data) {
  //       articlesData =
  //         res.data.data && _.isArray(res.data.data.blogList)
  //           ? res.data.data.blogList
  //           : [];
  //       articlesData = articlesData.map(a => {
  //         if (a.articleType === 'Article') {
  //           const sanityArticle = JSON.parse(a.sanityObject);
  //           return {
  //             articleType: a.articleType,
  //             sanityObject: a.sanityObject,
  //             id: a.id,
  //             ...sanityArticle
  //           };
  //         } else {
  //           return {
  //             id: a.blogObjectJson?.id,
  //             imgURL: a.blogObjectJson?.articleData?.image?.desktop,
  //             href: a.blogObjectJson?.articleData?.href,
  //             tag: a.category,
  //             title: a.title,
  //             sanityObject: a.sanityObject,
  //             shortDescription: ''
  //           };
  //         }
  //       });

  //       setArticles([...articlesData]);
  //       setTotalCount(res.data.data.totalCount);
  //       if (
  //         _.isEmpty(filters.category) &&
  //         !filters.category &&
  //         !filters.searchTerm
  //       ) {
  //         setArticles([]);
  //       }
  //     }
  //   };

  //   const filterCallback = newFilter => {
  //     if (
  //       newFilter.searchTerm ||
  //       (newFilter.category && newFilter.category.length > 0) ||
  //       newFilter.stateId
  //     )
  //       setSearchInit(true);
  //     setFilters({
  //       ...filters,
  //       ...newFilter
  //     });
  //   };
  const renderComponent = data => {
    if (data.disabled) return;
    if (data._type === 'topSelectionArticleSectionPolar')
      return <TopSelectionSection key={'topSelection'} data={data} />;
    if (data._type === 'polarRegistrationCard') {
      return <RegisterKickOff key={'polarRegistrationCard'} data={data} />;
    }
    if (data._type === 'getUpdatePolarSection')
      return (
        <PolarForm
          key={'getUpdatePolarFormSection'}
          data={data}
          polarFormData={polarFormData}
          countryCode={countryCode}
          languageCode={langUri}
        />
      );
    switch (data.section) {
      case 'moreFromFj':
        return (
          <CommonHeaderSection
            key={'topSelectionArticleSectionPolar'}
            data={data}
            // categoriesList={categoriesList}
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
        {page && !page.disabled && <WelcomeSection data={page} />}
        {content && _.isArray(content) && content.map(c => renderComponent(c))}
      </div>
      {/* <div className={'page-events'}>
        {page && (
          <ListHeader
            title={page.title[lang]}
            subtitle={page.subtitle[lang]}
            type={'article'}
            imgURL={page.backgroundImage}
            filterCallback={filterCallback}
            userId={userId}
            dataCount={articles.length}
            filterData={tags}
            countryCode={countryCode}
          />
        )}
        <div className="container">
          <div className="row">
            {articles && articles.length == 0 ? (
              <div className={`noresults`}>{noResults}</div>
            ) : (
              articles.map(p => (
                <ArticlesCard
                  key={p.id}
                  article={p}
                  userId={userId}
                  category={categories}
                />
              ))
            )}
          </div>
        </div>
        {totalCount > 0 && !_.isEmpty(filters.category) && filters.category && (
          <div className="container">
            <div className="row">
              <PagePagination
                totalResults={totalCount}
                activePage={curPage}
                perPage={pageSize}
                setCurPage={setCurPage}
                setSearchInit={setSearchInit}
              />
            </div>
          </div>
        )}
      </div> */}
    </Layout>
  );
};

Application.getInitialProps = async function (context) {
  const userId = context.query.id || '';
  const client = sanityClientHandle();
  const lang = context.query.lang || Constants.defaultCountry.lang;
  const countryCode = context.query.code || Constants.defaultCountry.code;
  const query = groq`*[_type == "polarPagesListing" && _id=="applicationPolarListing"]`;

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
    userStatus,
    page: pages && pages.length > 0 ? pages[0] : null,
    siteSettings:
      siteSettings && siteSettings.length > 0 ? siteSettings[0] : null,
    countries: countriesList,
    userId
  };
};

export default Application;
