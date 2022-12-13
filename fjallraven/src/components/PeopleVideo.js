import 'react-multi-carousel/lib/styles.css';

import _ from 'lodash';
import React from 'react';

import { sanityUrlFor } from '../config/sanityUrlFor';
import styles from '../styles/peopleDetail.module.css';

const PeopleVideo = ({ people, lang }) => {
  const favoritVid = _.get(people, 'favouritevideo', []);
  const backpackItem = _.get(people, 'inmybackpack', []);
  return (
    people && (
      <div>
        <div className="blogWidth">
          {favoritVid.length > 0 &&
            favoritVid.map(content => {
              return (
                <>
                  {_.isEqual(content._type, 'videosection') && (
                    // <div className={`container  ${styles.videowidth}`}>
                    <div>
                      {content.Youtube ? (
                        <iframe
                          className={styles.videowidth}
                          src={content.Youtube[0].url}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        ''
                      )}
                    </div>
                    //  </div>
                  )}
                </>
              );
            })}
        </div>
        <div className="backpackitems">
          {backpackItem.length > 0 &&
            backpackItem.map(item => {
              return (
                <>
                  <h2>{_.get(item.title, lang, '')}</h2>
                  {item.imagesgallery && item.imagesgallery[0].asset && (
                    <img
                      src={sanityUrlFor(item.imagesgallery[0].asset)
                        .height(661)
                        .width(1100)
                        .auto('format')
                        .url()}
                      alt=""
                      className={styles.backpackImg}
                    />
                  )}
                </>
              );
            })}
        </div>
      </div>
    )
  );
};

export default PeopleVideo;
