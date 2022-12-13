import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React from 'react';

import { langToURIUpper } from '../../src/config/utils';
import { Constants } from '../config/constants';

const FlowboxScript = ({ flowBoxKey }) => {
  const router = useRouter();
  const lang = router.query.lang || Constants.defaultCountry.lang;
  const flowboxLang = langToURIUpper(lang);
  let key = flowBoxKey;
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        (function(d, id) {
        if (!window.flowbox) { var f = function () { f.q.push(arguments); }; f.q = []; window.flowbox = f; }
        if (d.getElementById(id)) {return;}
        var s = d.createElement('script'), fjs = d.scripts[d.scripts.length - 1]; s.id = id; s.async = true;
        s.src = 'https://connect.getflowbox.com/flowbox.js';
        fjs.parentNode.insertBefore(s, fjs);
      })(document, 'flowbox-js-embed');
                  `
          }}
        ></script>
      </Head>
      <div id="js-flowbox-flow" />
      <Script strategy="lazyOnload">
        {`window.flowbox('init', {
        container: '#js-flowbox-flow',
        key: '${key}',
        locale: '${flowboxLang}'
      })`}
      </Script>
    </>
  );
};

export default FlowboxScript;
