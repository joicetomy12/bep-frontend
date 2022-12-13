import { useRouter } from 'next/router';
import React from 'react';

import { Constants } from '../../config/constants';
import { uriToLang } from '../../config/utils';
import { MapProviderPolar } from '../../providers/mapProvider';
import Styles from '../../styles/home/mapSection.module.css';
import IntroMapPolar from './IntroMapPolar';
const MapSectionPolar = ({ data, peopleCategoryList, peopleCountryList }) => {
  const router = useRouter();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);

  return (
    <>
      {data && (
        <section className="container-p mb-5 pt-5">
          <div className="d-flex justify-content-center">
            <div className={Styles.title}>{data.heading[lang]}</div>
          </div>

          <div className="d-flex justify-content-center">
            <div className={Styles.subTitle}>{data.tagline[lang]}</div>
          </div>
          <MapProviderPolar>
            <IntroMapPolar
              peopleCategoryList={peopleCategoryList}
              peopleCountryList={peopleCountryList}
            />
          </MapProviderPolar>
        </section>
      )}
    </>
  );
};

export default MapSectionPolar;
