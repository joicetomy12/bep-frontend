const sanityClientHandle = require('./src/config/sanityClient');
const countries = require('./src/config/countries');
const apiUrl = require('./src/config/nextConstants');
const langToURI = lang => lang.replace('_', '-').toLowerCase();
const axios = require('axios');
const _ = require('lodash');
const replaceMultiple = text => {
  const characters = [
    {
      '#': '-'
    },
    {
      '@': '-'
    },
    {
      '?': '-'
    },
    {
      '/ /g': '-'
    },
    {
      '&': '-'
    },
    {
      ',': '-'
    },
    {
      ':': '-'
    }
  ];
  for (const [i, each] of characters.entries()) {
    const previousChar = Object.keys(each);
    const newChar = Object.values(each);

    text = text.replace(previousChar, newChar);
  }
  text.replace(/[^a-zA-Z0-9 ]/g, '-');

  return text;
};
module.exports = {
  exportPathMap: async function (defaultPathMap) {
    let pathBuilder = {
      '/': { page: '/' },
      ...defaultPathMap
    };
    for (let countryCode in countries) {
      let languages = countries[countryCode];
      let client = sanityClientHandle(countryCode);

      for (let i = 0; i < languages.length; i++) {
        let lang = languages[i];

        pathBuilder[`/${countryCode}/${langToURI(lang)}`] = {
          page: '/[code]/[lang]',
          query: { code: countryCode, lang: langToURI(lang) }
        };

        pathBuilder[`/${countryCode}/${langToURI(lang)}/events`] = {
          page: '/[code]/[lang]/events',
          query: {
            code: countryCode,
            lang: langToURI(lang),
            category: '',
            id: ''
          }
        };
        // if (countryCode == 'eu' && lang == 'en-gb') {
        //   pathBuilder[`/${countryCode}/${langToURI(lang)}/polar`] = {
        //     page: '/polar',
        //     query: {
        //       code: countryCode,
        //       lang: langToURI(lang),
        //       category: '',
        //       id: ''
        //     }
        //   };
        //   pathBuilder[`/${countryCode}/${langToURI(lang)}/polar/events`] = {
        //     page: '/polar/events',
        //     query: {
        //       code: countryCode,
        //       lang: langToURI(lang),
        //       category: '',
        //       id: ''
        //     }
        //   };
        //   pathBuilder[`/${countryCode}/${langToURI(lang)}/polar/stories`] = {
        //     page: '/polar/stories',
        //     query: {
        //       code: countryCode,
        //       lang: langToURI(lang),
        //       category: '',
        //       id: ''
        //     }
        //   };
        // }
        pathBuilder[`/${countryCode}/${langToURI(lang)}/people`] = {
          page: '/[code]/[lang]/people',
          query: {
            code: countryCode,
            lang: langToURI(lang),
            category: '',
            id: ''
          }
        };

        pathBuilder[`/${countryCode}/${langToURI(lang)}/articles`] = {
          page: '/[code]/[lang]/articles',
          query: {
            code: countryCode,
            lang: langToURI(lang),
            category: '',
            id: ''
          }
        };

        // find People Slugs
        const peopleData = await client.fetch(
          `*[_type == "people" && !(_id in path('drafts.**'))]`
        );
        if (peopleData && peopleData.length > 0) {
          for (let i = 0; i < peopleData.length; i++) {
            const people = peopleData[i];
            if (people && people.slug && people.slug.current) {
              pathBuilder[
                `/${countryCode}/${langToURI(lang)}/people/${
                  people.slug.current
                }`
              ] = {
                page: '/[code]/[lang]/people/[slug]',
                query: {
                  code: countryCode,
                  lang: langToURI(lang),
                  slug: people.slug.current
                }
              };

              pathBuilder[`/people/${people.slug.current}`] = {
                page: '/people/[slug]',
                query: {
                  code: '',
                  lang: '',
                  slug: people.slug.current
                }
              };
            }
          }
        }

        // Find article slugs
        const articles = await client.fetch(
          '*[_type == "article" && publishedAt < now()]{slug}'
        );
        if (articles && articles.length > 0) {
          for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            if (article && article.slug.current) {
              pathBuilder[
                `/${countryCode}/${langToURI(lang)}/article/${
                  article.slug.current
                }`
              ] = {
                page: '/[code]/[lang]/article/[slug]',
                query: {
                  code: countryCode,
                  lang: langToURI(lang),
                  slug: article.slug.current
                }
              };
            }
          }
        }

        //Events
        const upperCountryName =
          countryCode === 'uk' ? 'GB' : countryCode.toUpperCase();
        let filterString = `venue.address.countryCode eq '${upperCountryName}'`;
        let makingQuerySTring = `limit=200&sort=start:DESC`;
        const headers = {
          'Content-Type': 'application/json'
        };
        const data = {
          request_type: 'POST',
          cvent_request_endpoint: `/events/filter?${makingQuerySTring}`,
          cvent_request_params: { filter: filterString }
        };
        const cventCountRes = await axios.post(
          `${apiUrl.eventUrl}/orchestration/state/cventServerEndpoints`,
          data,
          {
            headers: headers
          }
        );
        let cventData = [];
        if (
          cventCountRes &&
          cventCountRes.status !== 500 &&
          cventCountRes.data &&
          cventCountRes.data.data
        ) {
          cventData =
            cventCountRes.data.data && _.isArray(cventCountRes.data.data)
              ? cventCountRes.data.data
              : [];
          if (cventData && cventData.length > 0) {
            for (let i = 0; i < cventData.length; i++) {
              let eventSlug = cventData[i].title.replace(/ /g, '-');
              const eventSlugFinal = replaceMultiple(eventSlug);
              if (eventSlugFinal) {
                pathBuilder[
                  `/${countryCode}/${langToURI(lang)}/event/${eventSlugFinal}`
                ] = {
                  page: '/[code]/[lang]/event/[slug]',
                  query: {
                    code: countryCode,
                    lang: langToURI(lang),
                    slug: eventSlugFinal,
                    id: '',
                    eid: ''
                  }
                };
              }
            }
          }
        }
      }
    }

    return pathBuilder;
  }
};
