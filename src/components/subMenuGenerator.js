import * as _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { uriToLang } from '../../src/config/utils';
import { Constants } from '../config/constants';

// import { useGlobal } from '../providers/globalProvider';
const SubMenuGenerator = ({ sequence, url, navigationmenus }) => {
  const router = useRouter();
  // const { siteSettings } = useGlobal();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const [submenuArray, setSubmenuArray] = useState([]);

  useEffect(() => {
    const orderingSubMenus = _.sortBy(navigationmenus, ['submenusequence']);
    setSubmenuArray(orderingSubMenus);
  }, [sequence]);

  return (
    <ul>
      {submenuArray &&
        submenuArray.map(
          (subMenu, key) =>
            subMenu.submenusequence !== 0 && (
              <li key={key}>
                <a
                  className="nav-link-submenu-li"
                  href={`${
                    !_.isEmpty(subMenu.navigate) && !_.isEmpty(url)
                      ? url + subMenu.navigate
                      : '/'
                  }`}
                >
                  {subMenu.submenuTitle[lang]}
                </a>
              </li>
            )
        )}
    </ul>
  );
};

export default SubMenuGenerator;

export const MobSubMenuGenerator = ({ sequence, url, navigationmenus }) => {
  // const router = useRouter();
  // const { siteSettings } = useGlobal();
  // const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);

  const router = useRouter();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  // const langCode = uriToLang(lang);
  const [submenuArray, setSubmenuArray] = useState([]);

  // useEffect(() => {
  //   if (sequence == 2) {
  //     let eventSubMenu = [];
  //     eventSubMenu.push(
  //       // {
  //       //   title: `${_.get(
  //       //     mobileMenuTitle,
  //       //     `mobileMenuTitle[${langCode}]`,
  //       //     ''
  //       //   )}`,
  //       //   url: url
  //       // },
  //       { title: 'View All Events', url: url },
  //       { title: 'Store Events', url: url + `?category=Store` },
  //       {
  //         title: 'Classic Events',
  //         url: url + `?category=Classic`
  //       },
  //       {
  //         title: 'Campfire Events',
  //         url: url + `?category=Campfire`
  //       },
  //       { title: 'Polar Events', url: url + `?category=Polar` }
  //     );

  //     setSubmenuArray(eventSubMenu);
  //   } else if (sequence == 1) {
  //     let polarSubMenu = [];
  //     polarSubMenu.push(
  //       // {
  //       //   title: `${_.get(
  //       //     mobileMenuTitle,
  //       //     `mobileMenuTitle[${langCode}]`,
  //       //     ''
  //       //   )}`,
  //       //   url: url
  //       // },
  //       { title: 'About Polar', url: url },
  //       {
  //         title: 'Polar Events ',
  //         url: url + `/events`
  //       },
  //       {
  //         title: 'Polar Stories',
  //         url: url + `/stories`
  //       },
  //       {
  //         title: 'Polar Apply',
  //         url: url + `/apply`
  //       },
  //       {
  //         title: 'Polar Community',
  //         url: url + `/community`
  //       }
  //     );
  //     setSubmenuArray(polarSubMenu);
  //   } else if (sequence == 5) {
  //     setSubmenuArray([]);
  //   } else if (sequence == 3) {
  //     let peopleSubMenu1 = [];
  //     const fetchPeopleapidata = async () => {
  //       const peoplesList = await client.fetch(
  //         groq`*[_type == "people" && !(_id in path("drafts.**"))]`
  //       );

  //       const peopleCategoryList = await client.fetch(
  //         groq`*[_type == "peoplecategorytype" && !(_id in path("drafts.*"))]`
  //       );

  //       const peoplesListsCategory = peopleCategoryList.filter(o1 =>
  //         peoplesList.some(
  //           o2 =>
  //             _.get(
  //               o2.peoplecategorytype && o2.peoplecategorytype[0],
  //               '_ref',
  //               ''
  //             ) === _.get(o1, '_id', '')
  //         )
  //       );
  //       const peopleSubmenuList1 = peoplesListsCategory
  //         ? peoplesListsCategory
  //         : [];
  //       peopleSubmenuList1.length > 0 &&
  //         peopleSubmenuList1.map(peopleCategoryData => {
  //           peopleCategoryData &&
  //             peopleSubMenu1.push({
  //               title: _.get(
  //                 peopleCategoryData && peopleCategoryData.name,
  //                 lang,
  //                 ''
  //               ),
  //               url:
  //                 url +
  //                 `?category=${_.get(
  //                   peopleCategoryData && peopleCategoryData.name,
  //                   lang,
  //                   ''
  //                 ).replace(/ /g, '_')}`,
  //               section: ''
  //             });
  //         });
  //       setSubmenuArray(peopleSubMenu1);
  //     };
  //     fetchPeopleapidata();
  //   }
  //   // else if (sequence == 2) {
  //   //   let peopleSubMenu1 = [];
  //   //   const fetchPeopleapidata = async () => {
  //   //     const apiRes1 = await client.fetch(
  //   //       groq`*[_type == "peoplecategorytype" && !(_id in path("drafts.*"))]`
  //   //     );
  //   //     const peopleSubmenuList1 = apiRes1 ? apiRes1 : [];
  //   //     peopleSubmenuList1.length > 0 &&
  //   //       peopleSubmenuList1.map(peopleCategoryData => {
  //   //         console.log('data', !_.isEmpty(_.get(peopleCategoryData.name, lang, '')))
  //   //         peopleCategoryData &&
  //   //           peopleSubMenu1.push(
  //   //          {
  //   //             title: _.get(
  //   //               peopleCategoryData && peopleCategoryData.name,
  //   //               lang,
  //   //               ''
  //   //             ),
  //   //             url:
  //   //               url +
  //   //               `?category=${_.get(
  //   //                 peopleCategoryData && peopleCategoryData.name,
  //   //                 lang,
  //   //                 ''
  //   //               ).replace(/ /g, '_')}`,
  //   //             section: ''
  //   //           });
  //   //       });
  //   //     peopleSubMenu1.unshift({
  //   //       title: `${_.get(
  //   //         mobileMenuTitle,
  //   //         `mobileMenuTitle[${langCode}]`,
  //   //         ''
  //   //       )}`,
  //   //       url: url
  //   //     });
  //   //     setSubmenuArray(peopleSubMenu1);
  //   //   };
  //   //   fetchPeopleapidata();
  //   // }
  //   // else if (sequence == 2) {
  //   //   let peopleSubMenu1 = [];
  //   //   const fetchPeopleapidata = async () => {
  //   //     const apiRes1 = await client.fetch(
  //   //       groq`*[_type == "peoplecategorytype" && !(_id in path("drafts.*"))]`
  //   //     );
  //   //     const peopleSubmenuList1 = apiRes1 ? apiRes1 : [];
  //   //     peopleSubmenuList1.length > 0 &&
  //   //       peopleSubmenuList1.map(peopleCategoryData => {
  //   //         peopleCategoryData &&
  //   //           peopleCategoryData &&
  //   //           !_.isEmpty(
  //   //             _.get(peopleCategoryData && peopleCategoryData.name, lang, '')
  //   //           ) &&
  //   //           peopleSubMenu1.push({
  //   //             title: _.get(
  //   //               peopleCategoryData && peopleCategoryData.name,
  //   //               lang,
  //   //               ''
  //   //             ),
  //   //             url:
  //   //               url +
  //   //               `?category=${_.get(
  //   //                 peopleCategoryData && peopleCategoryData.name,
  //   //                 lang,
  //   //                 ''
  //   //               ).replace(/ /g, '_')}`,
  //   //             section: ''
  //   //           });
  //   //       });
  //   //     peopleSubMenu1.unshift({
  //   //       title: `${_.get(
  //   //         mobileMenuTitle,
  //   //         `mobileMenuTitle[${langCode}]`,
  //   //         ''
  //   //       )}`,
  //   //       url: url
  //   //     });
  //   //     setSubmenuArray(peopleSubMenu1);
  //   //   };
  //   //   fetchPeopleapidata();
  //   // }
  //   else if (sequence == 4) {
  //     let articleSubMenu = [];
  //     const fetchArticleapidata = async () => {
  //       const apiRes = await axios.post(
  //         `${Constants.basePath.PEOPLE}/orchestration/blog/search`,
  //         {
  //           countryCode: countryCode
  //         }
  //       );

  //       const articleSubmenuList = apiRes.data.data.categoryList
  //         ? apiRes.data.data.categoryList
  //         : [];
  //       articleSubmenuList.length > 0 &&
  //         articleSubmenuList.map(articleCategoryData => {
  //           articleCategoryData &&
  //             articleSubMenu.push({
  //               title: articleCategoryData,
  //               url:
  //                 url + `?category=${articleCategoryData.replace(/ /g, '_')}`,
  //               section: ''
  //             });
  //         });
  //       articleSubMenu.unshift(
  //         { title: mobileMenuTitle[lang], url: url }
  //         //   {title: `${_.get(
  //         //     mobileMenuTitle,
  //         //     `mobileMenuTitle[${langCode}]`,
  //         //     ''
  //         //   )}`,
  //         //   url: url
  //         // }
  //       );
  //       setSubmenuArray(articleSubMenu);
  //     };
  //     fetchArticleapidata();
  //   }
  // }, [sequence]);
  useEffect(() => {
    const orderingSubMenus = _.sortBy(navigationmenus, ['submenusequence']);
    setSubmenuArray(orderingSubMenus);
  }, [sequence]);

  return (
    <ul>
      {submenuArray &&
        submenuArray.map((subMenu, key) => (
          <li key={key}>
            <a
              className="nav-link-submenu-li"
              href={`${
                !_.isEmpty(subMenu.navigate) && !_.isEmpty(url)
                  ? url + subMenu.navigate
                  : '/'
              }`}
            >
              {subMenu.submenuTitle[lang]}
            </a>
          </li>
        ))}
    </ul>
  );
};
