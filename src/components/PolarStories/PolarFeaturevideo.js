// import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { sanityUrlFor } from '../../config/sanityUrlFor';
// import { uriToLang } from '../../config/utils';
import styles from '../../styles/home/featuredVideosSection.module.css';
const PolarFeaturevideo = ({
  // setIdFirst,
  featuredPlaylistsImg,
  thumbData,
  switchVideo,
  featuredVideos,
  featuredPlaylists
}) => {
  //   const router = useRouter();
  //   const lang = uriToLang(Constants.defaultCountry.lang || router.query.lang);
  const [isMobileOne, setIsMobileOne] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const openDropdownOne = () => {
    isMobileOne ? setIsMobileOne(false) : setIsMobileOne(true);
  };
  const openDropdownTwo = () => {
    isMobile ? setIsMobile(false) : setIsMobile(true);
  };
  return (
    <div className={styles.featuredVideo}>
      <div className={styles.featuredVideoScroll}>
        <div className={styles.noneDisplay}>
          {featuredVideos && <h2>Featured videos ({featuredVideos.length})</h2>}
          {featuredVideos &&
            featuredVideos.length > 0 &&
            featuredVideos.map((v, index) => (
              <div
                className={
                  styles.featuredDiv +
                  (index === featuredVideos.length - 1
                    ? ' ' + styles.noBorder
                    : '')
                }
                key={index}
                onClick={() => {
                  thumbData(v.videoCode);
                  switchVideo(v.videoCode);
                }}
              >
                <div className="w-25">
                  <img
                    src={sanityUrlFor(v.backgroundImage?.asset)
                      .auto('format')
                      .url()}
                  />
                </div>
                <div className="w-75">
                  <h3>{v.heading}</h3>
                  <p>{v.subtitle}</p>
                </div>
              </div>
            ))}
        </div>

        <div className={styles.noneDisplay}>
          {featuredPlaylists && (
            <h2>Featured Playlists ({featuredPlaylists.length})</h2>
          )}
          {featuredPlaylists &&
            featuredPlaylists.length > 0 &&
            featuredPlaylists.map((v, index) => (
              <div
                className={styles.featuredDiv}
                key={index}
                onClick={() => {
                  switchVideo(v.videoCode);
                  featuredPlaylistsImg(
                    sanityUrlFor(v.backgroundImage?.asset).auto('format').url()
                  );
                }}
              >
                <div className="w-25">
                  <img
                    src={sanityUrlFor(v.backgroundImage?.asset)
                      .auto('format')
                      .url()}
                  />
                </div>
                <div className="w-75">
                  <h3>{v.heading}</h3>
                  <p>{v.subtitle}</p>
                </div>
              </div>
            ))}
        </div>
        {featuredVideos && (
          <div className={styles.noDisplay}>
            <button
              className="btn  "
              onClick={openDropdownTwo}
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {featuredVideos && (
                <h2>
                  <img
                    src="/assets/svgImages/vectordown.svg"
                    alt=""
                    className={styles.arrowdrop}
                  />{' '}
                  Featured Videos ({featuredVideos.length})
                </h2>
              )}
            </button>
            {isMobile && (
              <div>
                {featuredVideos &&
                  featuredVideos.length > 0 &&
                  featuredVideos.map((v, index) => (
                    <div
                      className={styles.featuredDiv}
                      key={index}
                      onClick={() => {
                        thumbData(v.videoCode);
                        switchVideo(v.videoCode);
                      }}
                    >
                      <div className="w-25">
                        <img
                          src={sanityUrlFor(v.backgroundImage?.asset)
                            .auto('format')
                            .url()}
                        />
                      </div>
                      <div className="w-75">
                        <h3>{v.heading}</h3>
                        <p>{v.subtitle}</p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
        {featuredPlaylists && (
          <div className={styles.noDisplay}>
            <button
              className="btn  "
              onClick={openDropdownOne}
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {featuredPlaylists && (
                <h2>
                  <img
                    src="/assets/svgImages/vectordown.svg"
                    alt=""
                    className={styles.arrowdrop}
                  />{' '}
                  Featured Playlists ({featuredPlaylists.length})
                </h2>
              )}
            </button>
            {isMobileOne && (
              <div>
                {featuredPlaylists &&
                  featuredPlaylists.length > 0 &&
                  featuredPlaylists.map((v, index) => (
                    <div
                      className={styles.featuredDiv}
                      key={index}
                      onClick={() => {
                        switchVideo(v.videoCode);
                        featuredPlaylistsImg(
                          sanityUrlFor(v.backgroundImage?.asset)
                            .auto('format')
                            .url()
                        );
                      }}
                    >
                      <div className="w-25">
                        <img
                          src={sanityUrlFor(v.backgroundImage?.asset)
                            .auto('format')
                            .url()}
                        />
                      </div>
                      <div className="w-75">
                        <h3>{v.heading}</h3>
                        <p>{v.subtitle}</p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PolarFeaturevideo;
