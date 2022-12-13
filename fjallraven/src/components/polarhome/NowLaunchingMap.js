// import { useRouter } from 'next/router';
import React from 'react';

// import { Constants } from '../../config/constants';
import { sanityUrlFor } from '../../config/sanityUrlFor';
import Styles from '../../styles/home/featuredEventSectionStyle.module.css';
// import { uriToLang } from '../../config/utils';
import styles from '../../styles/home/nowLaunchingSectionStyle.module.css';
const NowLaunchingMap = ({ data }) => {
  return (
    <>
      {data && (
        <div className="container">
          <div className="d-flex justify-content-center">
            <div className={Styles.titleMap}>{data.heading}</div>
          </div>

          <div className="d-flex justify-content-center">
            <p className={styles.subtitles}>{data.tagline}</p>
          </div>
          <div className="position-relative hoverImageMap alignwidth rounderDiv">
            <a className="hoverImageMap">
              <img
                alt={''}
                src={sanityUrlFor(data.backgroundImage?.asset)
                  .auto('format')
                  .url()}
                className={styles.mapImagexxx}
              />
            </a>
            <div className={styles.centerDiv}>
              <h3>{data.title}</h3>
              {data.subtitle && data.subtitle && <p>{data.subtitle}</p>}
              {data.route && data.route && (
                <a
                  href={data.route}
                  className={
                    'btn themeButton buttonWhite mt-5 mx-auto ' +
                    styles.primaryBtn
                  }
                >
                  {data.polarcta?.title}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NowLaunchingMap;
