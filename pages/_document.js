import * as _ from 'lodash';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

import { Constants } from '../src/config/constants';
import { DataCulture } from '../src/config/cookiebot';
import { Currency } from '../src/config/currency';
import { uriToLang } from '../src/config/utils';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    let { code, lang } = this.props.__NEXT_DATA__.query;
    let langCode = lang || 'en-gb';
    code = code || 'uk';
    let countryCode = code;
    if (countryCode === 'uk') {
      countryCode = 'GB';
    } else if (countryCode === 'eu') {
      countryCode = 'AT';
    } else {
      countryCode = _.upperCase(code);
    }
    lang = uriToLang(lang || Constants.defaultCountry.lang);
    let dataCulture = DataCulture[_.upperCase(code)] || '';
    let currency = Currency[countryCode] || '';

    const pageInfo = _.get(
      this.props.__NEXT_DATA__.props &&
        this.props.__NEXT_DATA__.props.pageProps,
      'userStatus',
      ''
    );
    const pageInfoTitle = _.get(this.props.__NEXT_DATA__, 'page', '');
    let asPath = '';
    if (pageInfoTitle == '/') {
      asPath = '/';
    } else {
      let asPath1 = pageInfoTitle.replace('[code]', code);
      asPath = asPath1.replace('[lang]', lang);
    }
    const pageInfoDetails = _.get(
      this.props.__NEXT_DATA__.props &&
        this.props.__NEXT_DATA__.props.pageProps,
      'page',
      ''
    );
    let title = 'Fjällräven Experience';
    if (!_.isEmpty(pageInfoDetails)) {
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
    const customerStatus = _.get(
      pageInfo && pageInfo.userStatus,
      'gtmCustomerStatus',
      ''
    );
    const visitorType =
      customerStatus && customerStatus === 'Guest' ? 'new' : 'returning';
    const userEmail = _.get(pageInfo && pageInfo.userStatus, 'userEmail', '');
    return (
      <Html lang={lang === 'de_de' ? 'de' : lang}>
        <Head>
          {code !== 'ca' && (
            <script
              id="Cookiebot"
              data-culture={dataCulture}
              src="https://consent.cookiebot.com/uc.js"
              data-cbid="b9bf820a-1c34-4bd5-8c9c-b60716a6f025"
              data-blockingmode="auto"
              type="text/javascript"
            ></script>
          )}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                    "site": {
                      "countryCode": "${countryCode}",
                      "currencyCode": "${currency}",
                    "brandName": "Fjallraven", 
                    "accountPool": "1" 
                    },
                    "page": {
                      "name": "${finalTitle.replace(/\s+/g, ' ')}}", 
                    "type": "other", 
                    "category": "subdomain", 
                    },
                    "customer": { 
                      "visitorType": "${visitorType}",
                      "customerStatus":"${customerStatus}",
                      "language": "${langCode}",
                      "email": "${userEmail}"
                    }
                    });`
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-WSVS6MX');`
            }}
          />
        </Head>

        <body>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WSVS6MX" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
