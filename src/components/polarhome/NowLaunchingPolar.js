// import { useRouter } from 'next/router';
import React from 'react';

// import { Constants } from '../../config/constants';
import { sanityUrlFor } from '../../config/sanityUrlFor';
// import { uriToLang } from '../../config/utils';
import styles from '../../styles/home/nowLaunchingSectionStyle.module.css';

const NowLaunchingPolar = ({ data }) => {
  // const router = useRouter();
  // const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  return (
    <>
      {data && (
        <div className="container">
          <div className="position-relative hoverImage alignwidth rounderDiv">
            <a className="hoverImage">
              <img
                alt={''}
                src={sanityUrlFor(data.image?.asset).auto('format').url()}
                className={styles.bigImage}
              />
            </a>
            <div className={styles.centerDiv}>
              <h3>{data.title}</h3>
              {data.subtitle && data.subtitle && <p>{data.subtitle}</p>}
              {data.polarcta && data.polarcta && (
                <a
                  href={data?.polarcta?.path}
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

export default NowLaunchingPolar;
