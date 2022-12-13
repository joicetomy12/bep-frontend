import { useRouter } from 'next/router';
import React from 'react';

import { Constants } from '../../config/constants';
import { uriToLang } from '../../config/utils';
import { useGlobal } from '../../providers/globalProvider';
import { useMap } from '../../providers/mapProvider';
import styles from '../../styles/home/mapSearch.module.css';
const MapSearch = () => {
  const router = useRouter();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const { setEventSearch, resetMapEvents } = useMap();
  const { siteSettings } = useGlobal();
  return (
    <div className={`position-absolute m-auto ${styles.searchBox}`}>
      <button onClick={resetMapEvents} title="" className={styles.searchBtn} />
      <input
        type="text"
        placeholder={siteSettings?.terms?.search[lang]}
        className={styles.searchName}
        onKeyUp={event => setEventSearch(event.target.value)}
      />
    </div>
  );
};

export default MapSearch;
