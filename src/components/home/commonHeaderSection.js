import { useRouter } from 'next/router';
import React from 'react';

import { Constants } from '../../config/constants';
import { uriToLang } from '../../config/utils';
import Styles from '../../styles/home/commonSectionHeaderStyle.module.css';
function CommonHeaderSection({ data }) {
  const router = useRouter();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  return (
    <>
      {data && (
        <section className="container pl-0">
          <div className="d-flex justify-content-center">
            <div className={Styles.title}>{data.heading[lang]}</div>
          </div>

          <div className="d-flex justify-content-center">
            <div className={Styles.subTitle}>{data.tagline[lang]}</div>
          </div>
        </section>
      )}
    </>
  );
}

export default CommonHeaderSection;
