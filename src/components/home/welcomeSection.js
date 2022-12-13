import * as _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

import { Constants } from '../../config/constants';
import { sanityUrlFor, sanityUrlForFile } from '../../config/sanityUrlFor';
import { uriToLang } from '../../config/utils';
import { useCountry } from '../../providers/countryProvider';
const WelcomeSection = ({ data }) => {
  const router = useRouter();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const { currentCountryData, genUrl } = useCountry();
  let videoUrlSanity = _.get(data, 'backgroundvideo.asset._ref', '');
  const title = _.get(data && data.cta && data.cta.title, lang, '');
  const routeUrl = _.get(data, 'route', '');
  const myVideoURL = videoUrlSanity ? videoUrlSanity.split('-') : [];
  return (
    <>
      {data && (
        <section
          className={`intro-text mainBanner position-relative mb-5 ${
            data.hideOverlay ? 'mainBannerHideOverlay' : ''
          }`}
        >
          {!data.backgroundvideo
            ? data.backgroundImage && (
                <img
                  src={sanityUrlFor(
                    data.backgroundImage?.asset,
                    currentCountryData.code
                  )
                    .auto('format')
                    .url()}
                  alt=""
                  className="img-fluid fadeIn cssanimation"
                />
              )
            : data.backgroundvideo &&
              myVideoURL &&
              myVideoURL.length > 0 && (
                <video
                  className="videoHereo"
                  style={{ width: '100%', objectFit: 'cover' }}
                  loop="true"
                  muted="muted"
                  preload=""
                  autoPlay="true"
                  playsinline=""
                  height="720"
                >
                  <source
                    type="video/mp4"
                    src={sanityUrlForFile(myVideoURL[1] + '.' + myVideoURL[2])}
                  />
                </video>
              )}
          <div className="bannerContent position-absolute w-100 m-auto">
            <div className="container text-center">
              <h1 className="fadeInBottom cssanimation">
                {data.heading[lang]}
              </h1>
              {data.tagline && data.tagline[lang] && (
                <h3 className="bannerTextSmall fadeInBottom cssanimation ">
                  {data.tagline[lang]}
                </h3>
              )}
              {title && (
                <a
                  href={genUrl(`${routeUrl}`)}
                  className="btn themeButton buttonWhite mt-5 mx-auto extraPadding f-14p"
                >
                  {title}
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default WelcomeSection;
