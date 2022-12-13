import * as _ from 'lodash';
import React, { useState } from 'react';

import { Constants } from '../config/constants';
import { CountryProvider } from '../providers/countryProvider';
import { GlobalProvider } from '../providers/globalProvider';
import Footer from './footer';
import GetUpdateModal from './getUpdateModal';
import GetUpdateModalPopup from './getUpdateModelPolar';
import Header from './header';
const Layout = ({
  children,
  siteSettings,
  pageTypeInfo,
  countries,
  menuItems,
  content,
  userId
}) => {
  const [containerClass, setContainerClass] = useState('');
  const modelData = _.find(content, {
    _type: Constants.homepageSectionTypes.GET_UPDATE_SECTION
  });
  const modelDataPolar = _.find(content, {
    _type: 'newsLetterPolar'
  });
  return (
    <GlobalProvider
      siteSettingInit={siteSettings}
      userId={userId}
      updateContainerClass={setContainerClass}
    >
      <CountryProvider countriesInit={countries}>
        <div className={`page-container ${containerClass}`}>
          <Header menuItems={menuItems} />
          <div className={'page-body'}>{children}</div>
          <Footer />
          {!_.isEmpty(modelData) && pageTypeInfo === 'mainHome' && (
            <GetUpdateModal content={modelData} />
          )}
          {!_.isEmpty(modelDataPolar) && pageTypeInfo === 'polarHome' && (
            <GetUpdateModalPopup content={modelDataPolar} />
          )}
        </div>
      </CountryProvider>
    </GlobalProvider>
  );
};
export default Layout;
