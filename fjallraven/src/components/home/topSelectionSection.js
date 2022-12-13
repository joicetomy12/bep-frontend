import 'react-multi-carousel/lib/styles.css';

import * as _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import Carousel from 'react-multi-carousel';

import { Constants } from '../../config/constants';
import { sanityUrlFor } from '../../config/sanityUrlFor';
import { uriToLang } from '../../config/utils';
import { useCountry } from '../../providers/countryProvider';
import { useGlobal } from '../../providers/globalProvider';
import styles from '../../styles/home/topSelectionSection.module.css';
const CardList = ({ data, mobileItem }) => {
  const router = useRouter();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const { genUrlEu } = useCountry();
  return (
    <>
      {(!mobileItem || mobileItem === 1) &&
        data.topGuideSelections &&
        data.topGuideSelections.length > 0 && (
          <div className="col-sm-4 card_padd">
            <div className={`mb-3 ${styles.imageBox}`}>
              <a
                className="hoverImage"
                href={genUrlEu(
                  _.get(
                    data.topGuideSelections && data.topGuideSelections[0],
                    'route',
                    '/'
                  )
                )}
              >
                <img
                  alt={''}
                  src={sanityUrlFor(
                    data.topGuideSelections[0].image?.asset
                  ).auto('format')}
                />
              </a>
              <div className={styles.bottomDiv}>
                <span>
                  {_.get(
                    data.topStorySelections &&
                      data.topStorySelections[0] &&
                      data.topStorySelections[0].label,
                    lang,
                    ''
                  )}
                </span>
                <h3>{data.topGuideSelections[0].title[lang]}</h3>
                <a
                  href={genUrlEu(
                    _.get(
                      data.topGuideSelections && data.topGuideSelections[0],
                      'route',
                      '/'
                    )
                  )}
                  className="btn themeButton buttonWhite p-l12-r24 f-14p"
                >
                  {_.get(
                    data.topGuideSelections &&
                      data.topGuideSelections[0] &&
                      data.topGuideSelections[0].cta.title,
                    lang,
                    ''
                  )}
                </a>
              </div>
            </div>
          </div>
        )}

      {(!mobileItem || mobileItem === 2) &&
        data.topEventSelections &&
        data.topEventSelections.length > 0 && (
          <div className="col-sm-4 card_padd">
            <div className={`mb-3 ${styles.imageBox}`}>
              <a
                className="hoverImage"
                href={genUrlEu(
                  _.get(
                    data.topEventSelections && data.topEventSelections[0],
                    'route',
                    '/'
                  )
                )}
              >
                <img
                  alt={''}
                  src={sanityUrlFor(
                    data.topEventSelections[0].image?.asset
                  ).auto('format')}
                />
              </a>
              <div className={styles.bottomDiv}>
                <span>
                  {_.get(
                    data.topEventSelections &&
                      data.topEventSelections[0] &&
                      data.topEventSelections[0].label,
                    lang,
                    ''
                  )}
                </span>
                <h3>{data.topEventSelections[0].title[lang]}</h3>
                <a
                  href={genUrlEu(
                    _.get(
                      data.topEventSelections && data.topEventSelections[0],
                      'route',
                      '/'
                    )
                  )}
                  className="btn themeButton buttonWhite p-l12-r24 f-14p"
                >
                  {_.get(
                    data.topEventSelections &&
                      data.topEventSelections[0] &&
                      data.topEventSelections[0].cta.title,
                    lang,
                    ''
                  )}
                </a>
              </div>
            </div>
          </div>
        )}
      {(!mobileItem || mobileItem === 3) &&
        data.topStorySelections &&
        data.topStorySelections.length > 0 && (
          <div className="col-sm-4 card_padd">
            <div className={`mb-3 ${styles.imageBox}`}>
              <a
                className="hoverImage"
                href={genUrlEu(
                  _.get(
                    data.topStorySelections && data.topStorySelections[0],
                    'route',
                    '/'
                  )
                )}
              >
                <img
                  alt={''}
                  src={sanityUrlFor(
                    data.topStorySelections[0].image?.asset
                  ).auto('format')}
                />
              </a>
              <div className={styles.bottomDiv}>
                <span>
                  {_.get(
                    data.topStorySelections &&
                      data.topStorySelections[0] &&
                      data.topStorySelections[0].label,
                    lang,
                    ''
                  )}
                </span>
                <h3>{data.topStorySelections[0].title[lang]}</h3>
                <a
                  href={genUrlEu(
                    _.get(
                      data.topStorySelections && data.topStorySelections[0],
                      'route',
                      '/'
                    )
                  )}
                  className="btn themeButton buttonWhite p-l12-r24 f-14p"
                >
                  {_.get(
                    data.topStorySelections &&
                      data.topStorySelections[0] &&
                      data.topStorySelections[0].cta.title,
                    lang,
                    ''
                  )}
                </a>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

const TopSelectionSection = ({ data }) => {
  const { deviceWidth } = useGlobal();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    xdisktop: {
      breakpoint: { max: 3000, min: 2000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 2000, min: 769 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 768, min: 465 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30
    }
  };

  return (
    <>
      {data && (
        <div className={styles.communityUpdateSection}>
          <div className="container pt-0 mt-0 custom-carousel-pad">
            <div className="d-flex justify-content-center">
              <div>
                <div className="sectiontitle">{data.heading}</div>
              </div>
            </div>
            {deviceWidth > 464 && (
              <div className="row mb-3 pt-4">
                <CardList data={data} />
              </div>
            )}
            {deviceWidth <= 464 && (
              <Carousel responsive={responsive} partialVisible={true}>
                <CardList data={data} mobileItem={1} />
                <CardList data={data} mobileItem={2} />
                <CardList data={data} mobileItem={3} />
              </Carousel>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TopSelectionSection;
