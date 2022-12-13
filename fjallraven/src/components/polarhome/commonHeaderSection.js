import * as _ from 'lodash';
import React from 'react';

import Styles from '../../styles/home/commonSectionHeaderStyle.module.css';
function CommonHeaderSection({ data }) {
  return (
    <>
      {data && (
        <section className="container pl-0">
          <div className="d-flex justify-content-center">
            <div className={Styles.title}>{_.get(data, 'heading', '')}</div>
          </div>

          <div className="d-flex justify-content-center">
            <div className={Styles.subTitle}>{_.get(data, 'tagline', '')}</div>
          </div>
        </section>
      )}
    </>
  );
}

export default CommonHeaderSection;
