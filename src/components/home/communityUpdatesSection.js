import { useRouter } from 'next/router';
import React from 'react';

import { Constants } from '../../config/constants';
import { uriToLang } from '../../config/utils';
import styles from '../../styles/home/communityUpdatesSection.module.css';
import FlowboxScript from '../flowboxScript';
import Tagline from '../tagline';

const CommunityUpdatesSection = ({ data }) => {
  const router = useRouter();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const tagLineDatas = data.bodySelections;
  const result = tagLineDatas.find(body => body.section === lang);
  return (
    <>
      {data && (
        <div className={styles.communityUpdateSection}>
          <div className="container">
            <div className="d-flex justify-content-center">
              <div>
                <div className="sectiontitle">{data.heading[lang]}</div>
                <p className="intro">
                  {result && result.tagline && (
                    <Tagline tagline={result.tagline} />
                  )}{' '}
                </p>
              </div>
            </div>
            {data.flowboxkey && <FlowboxScript flowBoxKey={data.flowboxkey} />}
          </div>
        </div>
      )}
    </>
  );
};

export default CommunityUpdatesSection;
