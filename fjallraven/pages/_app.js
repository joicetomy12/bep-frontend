import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/globals.css';

import * as _ from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { Constants } from '../src/config/constants';
import { uriToLang } from '../src/config/utils';

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();
  let { lang } = pageProps;
  lang = uriToLang(lang || Constants.defaultCountry.lang);
  const pageInfo = _.get(pageProps, 'page', '');
  let title = 'Fjällräven Experience';
  if (!_.isEmpty(pageInfo)) {
    let pageTitleData = _.get(pageInfo, 'title', '');
    title = !_.isEmpty(pageTitleData) ? pageTitleData[lang] : title;
  } else {
    const pageUrl = asPath;
    const pageParam = pageUrl.split('/');
    const paramArray = pageParam[pageParam.length - 1];
    const pageTitle = !_.isEmpty(paramArray) ? paramArray.split('?')[0] : '';
    title = `${pageTitle} | Fjällräven`;
  }
  let finalTitle = title;
  if (title) {
    const arr = finalTitle.replace(/-/g, ' ').toLowerCase().split(' ');
    //loop through each element of the array and capitalize the first letter.
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    //Join all the elements of the array back into a string
    finalTitle = arr.join(' ');
  }
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{finalTitle ? finalTitle.replace(/\s+/g, ' ') : ''}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/images/favicon-16x16.png"
        />
        <link
          rel="mask-icon"
          href="/assets/images/safari-pinned-tab.svg"
          color="#ca0d36"
        />
        <link rel="shortcut icon" href="/assets/images/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="" />
        <link rel="stylesheet" href="/assets/fonts.css" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          crossOrigin="anonymous"
        />
      </Head>
      {pageInfo && pageInfo._id == 'frontpage' && (
        <Head>
          <link
            href="https://experience.fjallraven.com/uk/en-gb"
            hrefLang="en-gb"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/de/de-de"
            hrefLang="de-de"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/fi/fi-fi"
            hrefLang="fi-FI"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/no/no"
            hrefLang="no-no"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/dk/da-dk"
            hrefLang="da-DK"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/fr/fr-fr"
            hrefLang="fr-FR"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/se/sv-se"
            hrefLang="sv-se"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/nl/nl-nl"
            hrefLang="nl-NL"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/us/en-us"
            hrefLang="en-US"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/ca/en-ca"
            hrefLang="en-CA"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/ca/fr-ca"
            hrefLang="fr-CA"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb "
            hrefLang="en-at"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb "
            hrefLang="en-be"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb "
            hrefLang="en-bg"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb "
            hrefLang="en-hr"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb "
            hrefLang="en-cz"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb "
            hrefLang="en-ee"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb "
            hrefLang="en-gr"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb "
            hrefLang="en-hu"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb "
            hrefLang="en-ie"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb "
            hrefLang="en-it"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb "
            hrefLang="en-lv"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb "
            hrefLang="en-lt"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb "
            hrefLang="en-lu"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb "
            hrefLang="en-pl"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb "
            hrefLang="en-pt"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb "
            hrefLang="en-ro"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb "
            hrefLang="en-sk"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb "
            hrefLang="en-si"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb "
            hrefLang="en-es"
            rel="alternate"
          />
        </Head>
      )}
      {pageInfo && pageInfo._id == 'articleListing' && (
        <Head>
          <link
            href="https://experience.fjallraven.com/uk/en-gb/articles"
            hrefLang="en-gb"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/de/de-de/articles"
            hrefLang="de-de"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/fi/fi-fi/articles"
            hrefLang="fi-FI"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/no/no/articles"
            hrefLang="no-no"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/dk/da-dk/articles"
            hrefLang="da-DK"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/fr/fr-fr/articles"
            hrefLang="fr-FR"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/se/sv-se/articles"
            hrefLang="sv-se"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/nl/nl-nl/articles"
            hrefLang="nl-NL"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/us/en-us/articles"
            hrefLang="en-US"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/ca/en-ca/articles"
            hrefLang="en-CA"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/ca/fr-ca/articles"
            hrefLang="fr-CA"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/articles "
            hrefLang="en-at"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/articles "
            hrefLang="en-be"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/articles "
            hrefLang="en-bg"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/articles "
            hrefLang="en-hr"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/articles "
            hrefLang="en-cz"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/articles "
            hrefLang="en-ee"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/articles "
            hrefLang="en-gr"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/articles "
            hrefLang="en-hu"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/articles "
            hrefLang="en-ie"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/articles "
            hrefLang="en-it"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/articles "
            hrefLang="en-lv"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/articles "
            hrefLang="en-lt"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/articles "
            hrefLang="en-lu"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/articles "
            hrefLang="en-pl"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/articles "
            hrefLang="en-pt"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/articles "
            hrefLang="en-ro"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/articles "
            hrefLang="en-sk"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/articles "
            hrefLang="en-si"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/articles "
            hrefLang="en-es"
            rel="alternate"
          />
        </Head>
      )}
      {pageInfo && pageInfo._id == 'eventListing' && (
        <Head>
          <link
            href="https://experience.fjallraven.com/uk/en-gb/events"
            hrefLang="en-gb"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/de/de-de/events"
            hrefLang="de-de"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/fi/fi-fi/events"
            hrefLang="fi-FI"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/no/no/events"
            hrefLang="no-no"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/dk/da-dk/events"
            hrefLang="da-DK"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/fr/fr-fr/events"
            hrefLang="fr-FR"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/se/sv-se/events"
            hrefLang="sv-se"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/nl/nl-nl/events"
            hrefLang="nl-NL"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/us/en-us/events"
            hrefLang="en-US"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/ca/en-ca/events"
            hrefLang="en-CA"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/ca/fr-ca/events"
            hrefLang="fr-CA"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/events "
            hrefLang="en-at"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/events "
            hrefLang="en-be"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/events "
            hrefLang="en-bg"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/events "
            hrefLang="en-hr"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/events "
            hrefLang="en-cz"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/events "
            hrefLang="en-ee"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/events "
            hrefLang="en-gr"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/events "
            hrefLang="en-hu"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/events "
            hrefLang="en-ie"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/events "
            hrefLang="en-it"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/events "
            hrefLang="en-lv"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/events "
            hrefLang="en-lt"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/events "
            hrefLang="en-lu"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/events "
            hrefLang="en-pl"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/events "
            hrefLang="en-pt"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/events "
            hrefLang="en-ro"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/events "
            hrefLang="en-sk"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/events "
            hrefLang="en-si"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/events "
            hrefLang="en-es"
            rel="alternate"
          />
        </Head>
      )}
      {pageInfo && pageInfo._id == 'peopleListing' && (
        <Head>
          <link
            href="https://experience.fjallraven.com/uk/en-gb/people"
            hrefLang="en-gb"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/de/de-de/people"
            hrefLang="de-de"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/fi/fi-fi/people"
            hrefLang="fi-FI"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/no/no/people"
            hrefLang="no-no"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/dk/da-dk/people "
            hrefLang="da-DK"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/fr/fr-fr/people"
            hrefLang="fr-FR"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/se/sv-se/people "
            hrefLang="sv-se"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/nl/nl-nl/people "
            hrefLang="nl-NL"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/us/en-us/people"
            hrefLang="en-US"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/ca/en-ca/people"
            hrefLang="en-CA"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/ca/fr-ca/people"
            hrefLang="fr-CA"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/people "
            hrefLang="en-at"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/people "
            hrefLang="en-be"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/people "
            hrefLang="en-bg"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/people "
            hrefLang="en-hr"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/people "
            hrefLang="en-cz"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/people "
            hrefLang="en-ee"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/people "
            hrefLang="en-gr"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/people "
            hrefLang="en-hu"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/people "
            hrefLang="en-ie"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/people "
            hrefLang="en-it"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/people "
            hrefLang="en-lv"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/people "
            hrefLang="en-lt"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/people "
            hrefLang="en-lu"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/people "
            hrefLang="en-pl"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/people "
            hrefLang="en-pt"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/people "
            hrefLang="en-ro"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/people "
            hrefLang="en-sk"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/people "
            hrefLang="en-si"
            rel="alternate"
          />
          <link
            href="https://experience.fjallraven.com/eu/en-gb/people "
            hrefLang="en-es"
            rel="alternate"
          />
        </Head>
      )}

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
