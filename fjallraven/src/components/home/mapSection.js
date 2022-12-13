import { useRouter } from 'next/router';
import React from 'react';

import { Constants } from '../../config/constants';
import { uriToLang } from '../../config/utils';
import { MapProvider } from '../../providers/mapProvider';
import Styles from '../../styles/home/mapSection.module.css';
import IntroMap from './introMap';
const MapSection = ({ data, peopleCategoryList, peopleCountryList }) => {
  const router = useRouter();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);

  return (
    <>
      {data && (
        <section className="container mb-5 pt-5">
          <div className="d-flex justify-content-center">
            <div className={Styles.title}>{data.heading[lang]}</div>
          </div>

          <div className="d-flex justify-content-center">
            <div className={Styles.subTitle}>{data.tagline[lang]}</div>
          </div>
          <MapProvider>
            <IntroMap
              peopleCategoryList={peopleCategoryList}
              peopleCountryList={peopleCountryList}
            />
          </MapProvider>
        </section>
      )}
    </>
  );
};

export default MapSection;
