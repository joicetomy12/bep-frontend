export const Constants = {
  basePath: {
    EVENT: 'https://orchestration-bep.fjallraven.com',
    PEOPLE: 'https://orchestration-bep.fjallraven.com',
    BLOG: 'https://orchestration-bep.fjallraven.com',
    LOCATION: 'https://orchestration-bep.fjallraven.com',
    BANDIFY_STORE: 'https://api.where2stageit.com/fjallraven/rest/getlist',
    HEADER_DATA: '/epi/',
    EPI_LOCAL_FILE: '/epi/',
    EPI_SERVER_FOOTER: 'https://stbepuat001.blob.core.windows.net/episerver/',
    EPI_SERVER_TOKEN: 'https://www.fjallraven.com/episerverapi/token',
    EPI_SERVER_CART_DETAILS:
      'https://www.fjallraven.com/en-gb/api/bependpoints/userstatus',
    EPI_SERVER_CART_ITEM_UPDATE:
      'https://www.fjallraven.com/en-gb/api/bependpoints/updatecart',
    SUBSCRIBEUSER:
      'https://www.fjallraven.com/de-de/api/bependpoints/subscribeuser',
    ORCHESTRATION_API_URL:
      'https://orchestration-bep.fjallraven.com/orchestration/state/epiServerEndpoints',
    OCTO_SERVER_ENDPOINT:
      'https://orchestration-bep.fjallraven.com/orchestration/state/occtooServerEndpoints',
    USER_CART_DATA:
      'https://www.fjallraven.com/en-gb/api/bependpoints/userstatus'
  },
  Youtubekey: {
    key: 'AIzaSyCDI79cJDa3nfz2FFawJPzyI0jGwOvKAtk'
  },
  epiServerToken: {
    grant_type: 'password',
    username: 'bep@june.com',
    password: 'c2c48b57'
  },
  activeUserIdKey: 'activeUserId',
  mapRenderTypes: {
    STANDARD: 'standard'
  },
  defaultCountry: {
    name: 'Europe',
    lang: 'en-gb',
    code: 'eu',
    database: 'uk'
  },
  flowboxCountryMapping: {
    uk: {
      lang: 'en-GB',
      key: '5qJd3wV6TwerIAL5JBMBMg'
    },
    no: {
      lang: 'no-NO',
      key: '5qJd3wV6TwerIAL5JBMBMg'
    },
    de: {
      lang: 'de-De',
      key: '5qJd3wV6TwerIAL5JBMBMg'
    },
    nl: {
      lang: 'nl-Nl',
      key: '5qJd3wV6TwerIAL5JBMBMg'
    },
    fr: {
      lang: 'fr-Fr',
      key: '5qJd3wV6TwerIAL5JBMBMg'
    },
    fi: {
      lang: 'fi-Fi',
      key: '5qJd3wV6TwerIAL5JBMBMg'
    },
    se: {
      lang: 'sv-Se',
      key: '5qJd3wV6TwerIAL5JBMBMg'
    },
    dk: {
      lang: 'da-Dk',
      key: '5qJd3wV6TwerIAL5JBMBMg'
    },
    eu: {
      lang: 'en-GB',
      key: '5qJd3wV6TwerIAL5JBMBMg'
    },
    us: {
      lang: 'en-US',
      key: '3LaoewK1RJKQOS-IqvPh0A'
    },
    ca: {
      lang: 'en-CA',
      key: '3LaoewK1RJKQOS-IqvPh0A'
    }
  },
  homepageHeroEventCodeReplaceText: '_eventCount_',
  mapRenderEventActive: {
    MULTI: 'multi',
    SINGLE: 'single',
    ROUTE: 'route'
  },
  eventTypes: {
    campfireEvent: 'Campfire',
    brandStoreEvent: 'BrandStore',
    classicEvent: 'Classic',
    polarEvent: 'Polar',
    store: 'Store',
    people: 'people'
  },
  updatedEventTypes: {
    campfireEvent: 'campfireEvent',
    brandStoreEvent: 'brandStoreEvent',
    classicEvent: 'classicEvent',
    polarEvent: 'polarEvent',
    store: 'store',
    people: 'people'
  },
  peopleFilterTypes: {
    guide: 'guide',
    ambassador: 'ambassador',
    alumni: 'alumni'
  },
  articleFilterTypes: {
    adventure: 'adventure',
    guide: 'guide',
    sustainability: 'sustainability',
    product: 'product',
    development: 'development',
    experience: 'experience'
  },
  eventTypeDisplayName: {
    campfireEvent: 'Campfire Event',
    brandStoreEvent: 'Brand store',
    classicEvent: 'Classic Event',
    polarEvent: 'Polar Event',
    fjallravenClassic: 'Fjällräven Classic',
    store: 'Store Event',
    campfire: 'Campfire Event',
    brandstore: 'Brand store',
    classic: 'Classic Event',
    polar: 'Polar Event',
    fjallraven: 'Fjällräven Classic'
  },
  homepageSectionTypes: {
    HERO: 'hero',
    PRODUCT: 'product',
    LEARN_MORE: 'learnMore',
    GET_UPDATE_SECTION: 'getUpdateSection',
    WELCOME_MESSAGE: 'welcomeMessage',
    PROMOTION: 'promotion',
    TOP_SELECTION_SECTION: 'topSelectionSection',
    VIDEO_SECTION: 'videoSection',
    TOP_SELECTION: 'top_selection',
    MAP: 'map',
    PEOPLE: 'people',
    FEATURE_EVENT: 'feature_event',
    COMMUNITY_UPDATE: 'communityUpdate',
    MORE_FROM_FJ: 'moreFromFj'
  },
  gtmMapping: {
    uk: 'GB',
    eu: 'AT',
    de: 'DE',
    nl: 'NL',
    fr: 'FR',
    fi: 'FI',
    se: 'SE',
    dk: 'DK',
    no: 'NO',
    us: 'US',
    ca: 'CA'
  },
  countries: {
    uk: ['en-gb'],
    eu: ['en-gb'],
    de: ['de-de'],
    nl: ['nl-nl'],
    fr: ['fr-fr'],
    fi: ['fi-fi'],
    se: ['sv-se'],
    no: ['no'],
    dk: ['da-dk'],
    us: ['en-us'],
    ca: ['en-ca', 'fr-ca']
  },
  countriesNames: [
    { title: 'Canada', value: 'CA' },
    { title: 'Denmark', value: 'DK' },
    { title: 'Finland', value: 'FI' },
    { title: 'France', value: 'FR' },
    { title: 'Germany', value: 'DE' },
    { title: 'Netherlands', value: 'NL' },
    { title: 'Norway', value: 'NO' },
    { title: 'Sweden', value: 'SE' },
    { title: 'United Kingdom', value: 'GB' },
    { title: 'United States', value: 'US' },
    { title: 'Europe', value: 'EU' }
  ],
  mappedCountriesNames: [
    { title: 'Canada', value: 'ca', id: 10 },
    { title: 'Denmark', value: 'dk', id: 8 },
    { title: 'Finland', value: 'fi', id: 5 },
    { title: 'France', value: 'fr', id: 4 },
    { title: 'Germany', value: 'de', id: 2 },
    { title: 'Netherlands', value: 'nl', id: 3 },
    { title: 'Norway', value: 'no', id: 7 },
    { title: 'Sweden', value: 'se', id: 6 },
    { title: 'United Kingdom', value: 'gb', id: 1 },
    { title: 'United States', value: 'us', id: 9 },
    { title: 'Europe', value: 'eu', id: 11 }
  ]
};
