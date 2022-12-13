import { useContext, useEffect, useState } from 'react';
import React from 'react';
const GlobalContext = React.createContext(null);
export const useGlobal = () => {
  const state = useContext(GlobalContext);
  if (!state) {
    throw new Error('Error using call in context!');
  }
  return state;
};

export const GlobalProvider = ({
  children,
  siteSettingInit,
  updateContainerClass
}) => {
  const [shownGetUpdateModal, setShownGetUpdateModal] = useState(false);
  const [showGetUpdateModal, setShowGetUpdateModal] = useState(false);
  const [shownGetUpdateModalPolar, setShownGetUpdateModalPolar] =
    useState(false);
  const [showGetUpdateModalPolar, setShowGetUpdateModalPolar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [deviceWidth, setDeviceWidth] = useState(768);
  const [mobileFullscreen, setMobileFullscreen] = useState(false);
  const [offMobileMapSidePanel, setOffMobileMapSidePanel] = useState(false);
  const [containerClass, setContainerClass] = useState('');
  const [siteSettings, setSiteSettings] = useState(siteSettingInit);
  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth <= 768);
    setDeviceWidth(window.innerWidth);
  };

  useEffect(() => {
    updateContainerClass(containerClass);
  }, [containerClass]);

  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);
  useEffect(() => {
    if (shownGetUpdateModal && !showGetUpdateModal) {
      window.sessionStorage.setItem('showGetUpdateModal', 'off');
    }
  }, [showGetUpdateModal]);

  useEffect(() => {
    const shown = window.sessionStorage.getItem('showGetUpdateModal');

    if (!shown) {
      setTimeout(() => {
        setShownGetUpdateModal(true);
        setShowGetUpdateModal(true);
      }, 10000);
    }
  }, [setShowGetUpdateModal]);
  useEffect(() => {
    if (shownGetUpdateModalPolar && !showGetUpdateModalPolar) {
      window.sessionStorage.setItem('showGetUpdateModal', 'off');
    }
  }, [showGetUpdateModalPolar]);

  useEffect(() => {
    const shown = window.sessionStorage.getItem('showGetUpdateModal');

    if (!shown) {
      setTimeout(() => {
        setShownGetUpdateModalPolar(true);
        setShowGetUpdateModalPolar(true);
      }, 10000);
    }
  }, [setShowGetUpdateModalPolar]);

  const providerValue = {
    showGetUpdateModal,
    setShowGetUpdateModal,
    showGetUpdateModalPolar,
    setShowGetUpdateModalPolar,
    isMobile,
    deviceWidth,
    siteSettings,
    setSiteSettings,
    mobileFullscreen,
    setMobileFullscreen,
    offMobileMapSidePanel,
    setOffMobileMapSidePanel,
    containerClass,
    setContainerClass
  };
  return (
    <GlobalContext.Provider value={providerValue}>
      {children}
    </GlobalContext.Provider>
  );
};
