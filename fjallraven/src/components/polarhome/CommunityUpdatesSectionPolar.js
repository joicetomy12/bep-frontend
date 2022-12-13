import * as _ from 'lodash';
import React from 'react';

import styles from '../../styles/home/communityUpdatesSection.module.css';
import FlowboxScript from '../flowboxScript';
import Tagline from '../tagline';

const CommunityUpdatesSectionPolar = ({ data }) => {
  const tagLineDatas = _.get(data, 'body', '');
  return (
    <>
      {data && (
        <div className={styles.communityUpdateSection}>
          <div className="container">
            <div className="d-flex justify-content-center">
              <div>
                {data.heading && (
                  <div className={`sectiontitle ${styles.title}`}>
                    {data.heading}
                  </div>
                )}

                <p className="intro">
                  {tagLineDatas && <Tagline tagline={tagLineDatas} />}{' '}
                </p>
              </div>
            </div>
            {data.flowboxkey && <FlowboxScript flowBoxKey={data.flowboxkey} />}
            {data.polarcta && data.polarcta.title && (
              <div className={`mt-4 mb-5 ${styles.footerButton}`}>
                <a
                  href={_.get(data && data.polarcta, 'path', '')}
                  title=""
                  className="btn themeButton"
                >
                  {_.capitalize(data.polarcta.title)}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CommunityUpdatesSectionPolar;
