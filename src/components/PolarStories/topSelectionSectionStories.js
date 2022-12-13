import 'react-multi-carousel/lib/styles.css';

import * as _ from 'lodash';
import React from 'react';
import Carousel from 'react-multi-carousel';

import { sanityUrlFor } from '../../config/sanityUrlFor';
import { useGlobal } from '../../providers/globalProvider';
import styles from '../../styles/polar/topSelectionSection.module.css';

const CardList = ({ data, mobileItem }) => {
  return (
    <>
      {(!mobileItem || mobileItem === 1) &&
        data.articlefirst &&
        data.articlefirst.length > 0 && (
          <div className="col-sm-4 card_padd">
            <div className={`mb-3 ${styles.imageBox}`}>
              <a
                className="hoverImage"
                href={_.get(
                  data.articlefirst && data.articlefirst[0],
                  'cta.path',
                  ''
                )}
              >
                <img
                  alt={''}
                  src={sanityUrlFor(data.articlefirst[0].image?.asset).auto(
                    'format'
                  )}
                />
              </a>
              <div className={styles.bottomDiv}>
                <span>
                  {_.get(
                    data.articlefirst && data.articlefirst[0],
                    'label',
                    ''
                  )}
                </span>
                <h3>{data.articlefirst[0].title}</h3>
                <a
                  href={_.get(
                    data.articlefirst && data.articlefirst[0],
                    'cta.path',
                    ''
                  )}
                  className="btn themeButton buttonWhite p-l12-r24 f-14p"
                >
                  {_.get(
                    data.articlefirst && data.articlefirst[0],
                    'cta.title',
                    ''
                  )}
                </a>
              </div>
            </div>
          </div>
        )}

      {(!mobileItem || mobileItem === 2) &&
        data.articlesecond &&
        data.articlesecond.length > 0 && (
          <div className="col-sm-4 card_padd">
            <div className={`mb-3 ${styles.imageBox}`}>
              <a
                className="hoverImage"
                href={_.get(
                  data.articlesecond && data.articlesecond[0],
                  'cta.path',
                  ''
                )}
              >
                <img
                  alt={''}
                  src={sanityUrlFor(data.articlesecond[0].image?.asset).auto(
                    'format'
                  )}
                />
              </a>
              <div className={styles.bottomDiv}>
                <span>
                  {_.get(
                    data.articlesecond && data.articlesecond[0],
                    'label',
                    ''
                  )}
                </span>
                <h3>
                  {_.get(
                    data.articlesecond && data.articlesecond[0],
                    'title',
                    ''
                  )}
                </h3>
                <a
                  href={_.get(
                    data.articlesecond && data.articlesecond[0],
                    'cta.path',
                    ''
                  )}
                  className="btn themeButton buttonWhite p-l12-r24 f-14p"
                >
                  {_.get(
                    data.articlesecond && data.articlesecond[0],
                    'cta.title',
                    ''
                  )}
                </a>
              </div>
            </div>
          </div>
        )}
      {(!mobileItem || mobileItem === 3) &&
        data.articlethird &&
        data.articlethird.length > 0 && (
          <div className="col-sm-4 card_padd">
            <div className={`mb-3 ${styles.imageBox}`}>
              <a
                className="hoverImage"
                href={_.get(
                  data.articlethird && data.articlethird[0],
                  'cta.path',
                  ''
                )}
              >
                <img
                  alt={''}
                  src={sanityUrlFor(data.articlethird[0].image?.asset).auto(
                    'format'
                  )}
                />
              </a>
              <div className={styles.bottomDiv}>
                <span>
                  {_.get(
                    data.articlethird && data.articlethird[0],
                    'label',
                    ''
                  )}
                </span>
                <h3>
                  {_.get(
                    data.articlethird && data.articlethird[0],
                    'title',
                    ''
                  )}
                </h3>
                <a
                  href={_.get(
                    data.articlethird && data.articlethird[0],
                    'cta.path',
                    ''
                  )}
                  className="btn themeButton buttonWhite p-l12-r24 f-14p"
                >
                  {_.get(
                    data.articlethird && data.articlethird[0],
                    'cta.title',
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
            {/* <div className="d-flex justify-content-center">
              <div>
                <div className="sectiontitle">{_.get(data, 'heading', '')}</div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className={styles.subTitle}>{_.get(data, 'title', '')}</div>
            </div> */}
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
