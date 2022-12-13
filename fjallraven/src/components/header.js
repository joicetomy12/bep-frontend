import axios from 'axios';
import { setCookies } from 'cookies-next';
import * as _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import styles from '../../src/styles/header.module.css';
import { Constants } from '../config/constants';
import { uriToLang } from '../config/utils';
import { useGlobal } from '../providers/globalProvider';
import Cart from './cart';
import MobileDropMenu from './mobileDropMenu';
import SubMenuGenerator from './subMenuGenerator';
import TopNavigation from './topNavigation';
const getStorageValue = key => {
  if (typeof window !== 'undefined') {
    const item = window.localStorage.getItem(key);
    return item;
  }
};
const setStorageValue = (key, id) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, id);
    setCookies(key, id);
  }
};
const Header = ({ menuItems }) => {
  const router = useRouter();
  const [data, setData] = useState();
  const [cartData, setCartData] = useState([]);
  const userId = router.query.id || '';
  useEffect(() => {
    if (userId && userId !== 'null') {
      setStorageValue(Constants.activeUserIdKey, userId);
    }
  }, [userId]);
  let lang = router.query.lang || Constants.defaultCountry.lang;
  let countryCode = router.query.code || Constants.defaultCountry.code;
  //creating function to load ip address from the API
  // const getData = async () => {
  //   const res = await axios.get('https://geolocation-db.com/json/');
  //   const recieveCountryCode =
  //     res && res.data && res.data.country_code.toLowerCase();
  //   if (!router.query.code) {
  //     countryCode =
  //       recieveCountryCode && Constants.countries[recieveCountryCode]
  //         ? recieveCountryCode
  //         : Constants.defaultCountry.code;
  //     const recieveCountryLang = Constants.countries[countryCode]
  //       ? Constants.countries[countryCode][0]
  //       : Constants.defaultCountry.lang;
  //     lang = recieveCountryLang
  //       ? recieveCountryLang
  //       : Constants.defaultCountry.lang;
  //     if (typeof window != 'undefined' && window) {
  //       if (window.location.pathname !== `/${countryCode}/${lang}`) {
  //         window.location.pathname = `${countryCode}/${lang}`;
  //       }
  //     }
  //   }
  // };
  // useEffect(() => {
  //   //passing getData method to the lifecycle method
  //   getData();
  // }, []);

  const langCode = uriToLang(lang);
  const { mobileFullscreen, setContainerClass } = useGlobal();
  const [openCart, setOpenCart] = useState();
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openSearch] = useState(false);
  const [openRegionPicker, setOpenRegionPicker] = useState(false);
  menuItems = _.orderBy(menuItems, ['sequence'], ['asc']);
  const showRegionPicker = () => {
    setSticky(true);
    setMobileMenu(false);
    setOpenRegionPicker(true);
    if (openRegionPicker === true) {
      setOpenRegionPicker(false);
    }

    // setOpenRegionPicker(false);
    // setTimeout(() => {
    //   setOpenRegionPicker(false);
    // }, 3000);
  };
  const currePageName =
    router.asPath &&
    router.asPath.split('/')[3] &&
    router.asPath.split('/')[3].toLowerCase();
  useEffect(() => {
    if (!_.isEmpty(userId)) {
      fetchUserStatus().then();
    }
  }, [userId]);
  const fetchUserStatus = async () => {
    let dataCountryCode = countryCode;
    if (dataCountryCode === 'se') {
      dataCountryCode = 'sw';
    }

    let dataSend = {
      brand: 'fjallraven',
      marketId: _.upperCase(countryCode),
      userId: getStorageValue(Constants.activeUserIdKey)
    };

    let config = {
      method: 'post',
      url: Constants.basePath.ORCHESTRATION_API_URL,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        request_type: 'POST',
        epi_request_endpoint: `/${lang}/api/bependpoints/userstatus`,
        epi_request_params: dataSend
      }
    };

    const apiRes = await axios(config);
    if (apiRes && apiRes.data && apiRes.data.userStatus) {
      setCartData(apiRes.data.userStatus);
    }
  };

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 100) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
  }, []);

  useEffect(() => {
    fetchHeaderData().then();
  }, []);
  const toggleCart = (e, open) => {
    if (e) {
      e.preventDefault();
    }
    if (open) {
      setSticky(true);
      setMobileMenu(false);
    }
    setOpenCart(open);
  };

  const fetchHeaderData = async () => {
    let dataCountryCode = countryCode;
    if (dataCountryCode === 'se') {
      dataCountryCode = 'sw';
    }
    // const apiRes = await axios.get(
    //   `${Constants.basePath.EPI_SERVER_FOOTER}fjallraven-${dataCountryCode}-${lang}.json`
    // );
    const apiRes = await axios.get(
      `${Constants.basePath.EPI_LOCAL_FILE}Fjallraven-${dataCountryCode}-${lang}.json`
    );
    if (apiRes && apiRes.data && apiRes.data) {
      setData(apiRes.data);
    }
  };
  let cartPricewithSymbol = data?.currentMarket?.currencySymbol;
  const updateCartItem = async (item, qty) => {
    let dataSend = {
      brand: 'fjallraven',
      marketId: _.upperCase(countryCode),
      userId: getStorageValue(Constants.activeUserIdKey),
      lineItemId: item.id,
      quantity: parseInt(qty)
    };

    let config = {
      method: 'post',
      url: Constants.basePath.ORCHESTRATION_API_URL,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        request_type: 'POST',
        epi_request_endpoint: '/en-gb/api/bependpoints/updatecart',
        epi_request_params: dataSend
      }
    };

    const apiRes = await axios(config);
    if (apiRes && apiRes.data && apiRes.data.userStatus) {
      setCartData(apiRes.data.userStatus);
    }
  };

  useEffect(() => {
    if (
      !data ||
      !data.topNavigationMessage ||
      data.topNavigationMessage === '\n'
    ) {
      setContainerClass('tn-message-no-exists-top');
    } else {
      setContainerClass('tn-message-exists-top');
    }
  }, [data]);

  useEffect(() => {
    if (router.query.location)
      window.location.hash = '#' + router.query.location;
  }, []);

  return (
    <>
      {!mobileFullscreen && (
        <header
          className={
            styles.mainHeaderContainer +
            (openCart ? ' cart--cartOpen' : '') +
            (openSearch ? ' search--searchOpen' : '') +
            ((sticky || mobileMenu) && !showRegionPicker
              ? ' header--stickyHeader'
              : '') +
            (mobileMenu ? ' header--menuOpen' : '') +
            (!data ||
            !data.topNavigationMessage ||
            data.topNavigationMessage === '\n'
              ? ' tn-message-no-exists'
              : ' tn-message-exists')
          }
        >
          <TopNavigation
            data={data}
            setOpenRegionPicker={setOpenRegionPicker}
            openRegionPicker={openRegionPicker}
          />
          <div className="container header-root">
            <nav
              className={`navbar navbar-expand-md px-3 fadeIn mobile-nav ${styles.navstyle}`}
            >
              <a
                className="header--logo"
                href={
                  countryCode === 'eu'
                    ? '/'
                    : `/${countryCode}/${langCode.replace(/_/g, '-')}`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 247.6 86.8"
                  preserveAspectRatio="xMinYMid meet"
                  focusable="false"
                  aria-hidden="true"
                >
                  <g className="letters" fill="#ad1d1f">
                    <path d="M111.9,69.8c4-1.8,6.5-5.8,6.4-10.2c0-7.9-6.4-12.4-14-12.4H93.9c0,0,0,0-0.1,0c-3.1,0-5.6,2.5-5.6,5.6V79 c0,3.1,2.5,5.7,5.7,5.7c3.1,0,5.7-2.5,5.7-5.7v-7.3l7.4,10.5c1.1,1.6,2.8,2.5,4.7,2.5c1.3,0,2.5-0.4,3.5-1.1c2.4-1.9,2.9-5.4,1-7.8 L111.9,69.8z M107,60.5c-0.2,1.5-1.6,2.5-3.1,2.3h-4.4v-5.4h4.4c0.2,0,0.5,0,0.7,0C106.2,57.6,107.2,59,107,60.5z"></path>
                    <path d="M142.2,51.7c-1-2.8-3.6-4.6-6.5-4.6c-2.9-0.1-5.6,1.8-6.5,4.6l-10.7,24.8c-0.4,0.8-0.6,1.7-0.6,2.6 c0.1,3.1,2.6,5.6,5.8,5.6c2.3,0,4.4-1.4,5.2-3.7l0.7-2.1h12.1l0.8,2.2c0.8,2.2,2.9,3.6,5.3,3.6c0.8,0,1.6-0.2,2.3-0.5 c2.8-1.3,4.1-4.6,2.8-7.5L142.2,51.7z M132.9,69.8l2.7-7.9l3,7.9H132.9z"></path>
                    <path d="M176.2,47c-2.4-0.1-4.6,1.4-5.4,3.7l-6.3,16.7l-6.4-16.7c-0.8-2.3-3-3.8-5.4-3.7c-4.1,0-6.7,4.2-5,8.3l10,24.6 c0.7,1.9,2.3,3.4,4.2,4.2c3.7,1.4,7.9-0.4,9.3-4.2l10-24.6l-0.1,0.1c0.4-0.8,0.7-1.7,0.7-2.6C181.8,49.6,179.4,47,176.2,47z"></path>
                    <path d="M203.6,73.8H194v-3.5h7.8c0,0,0,0,0,0c2.6,0,4.7-2.1,4.7-4.7c0-2.6-2.1-4.7-4.7-4.7H194v-3.1l9.6,0 c2.7-0.2,4.9-2.3,5.1-5.1c0.2-3-2.1-5.5-5.1-5.7h-15.3c0,0,0,0,0,0c-3.1,0-5.6,2.5-5.6,5.6v26.2c0,0,0,0,0,0.1 c0,3.1,2.5,5.6,5.6,5.6h15.3c3,0,5.4-2.4,5.4-5.4C208.9,76.3,206.5,73.8,203.6,73.8z"></path>
                    <path d="M93.9,45.2c3.1,0,5.7-2.5,5.7-5.7v-7.8h8.1c2.7,0,4.9-2.2,4.9-4.9c0-2.7-2.2-4.9-4.9-4.9h-8.1v-3.5h9.6 c0.2,0,0.4,0,0.6,0c3-0.2,5.2-2.7,5.1-5.7c-0.2-3-2.7-5.2-5.7-5.1H93.9c0,0,0,0-0.1,0c-3.1,0-5.6,2.5-5.6,5.6v26.2l0,0 C88.2,42.6,90.8,45.2,93.9,45.2z"></path>
                    <path d="M111.7,33.7c-0.9-0.6-2-0.9-3.1-0.9c-2.9,0-5.3,2.4-5.3,5.4c0,1.5,0.6,2.9,1.7,3.9c2,2.1,5.5,3.5,10.7,3.5 c8.8,0,13.6-6.1,13.6-13.2V13.3c0,0,0,0,0-0.1c0-3.1-2.5-5.6-5.6-5.6c0,0,0,0,0,0c-3.1,0-5.7,2.5-5.7,5.6v19c0,0.1,0,0.3,0,0.4 c-0.1,1.3-1.2,2.4-2.5,2.3C114.1,34.9,112.8,34.5,111.7,33.7L111.7,33.7z"></path>
                    <path d="M135.2,45.2c2.3,0,4.4-1.4,5.2-3.7l0.7-2.1h12l0.8,2.2c0.8,2.2,2.9,3.6,5.3,3.6c0.8,0,1.6-0.2,2.3-0.5 c2.8-1.3,4.1-4.6,2.8-7.5l-10.6-25c-1-2.8-3.6-4.6-6.5-4.6c-2.9-0.1-5.6,1.8-6.5,4.6L130,37h-0.1c-0.4,0.8-0.6,1.8-0.6,2.7 C129.4,42.8,132.1,45.3,135.2,45.2z M147.1,22.4l2.8,7.9l-5.7,0L147.1,22.4z"></path>
                    <path d="M171.3,45.2h14.5c0.2,0,0.4,0,0.6,0c3-0.2,5.2-2.7,5.1-5.7c-0.2-3-2.7-5.2-5.7-5.1H177V13.3 c0-3.1-2.5-5.7-5.7-5.7c-3.1,0-5.7,2.5-5.7,5.7v26.2c0,0,0,0,0,0.1C165.7,42.7,168.2,45.2,171.3,45.2z"></path>
                    <path d="M192.1,39.5c0,3.1,2.5,5.6,5.6,5.6h14.5c0.2,0,0.4,0,0.6,0c3-0.2,5.2-2.7,5.1-5.7c-0.2-3-2.7-5.2-5.7-5.1h-8.8 V13.3c0-3.1-2.5-5.7-5.7-5.7s-5.7,2.5-5.7,5.7L192.1,39.5L192.1,39.5C192.1,39.5,192.1,39.5,192.1,39.5z"></path>
                    <path d="M235.6,46.8c-3.1,0.2-5.5,2.8-5.3,5.9v11.5L220.7,50c-1-1.8-2.9-2.9-5-2.9c0,0,0,0-0.1,0 c-3.1,0-5.6,2.5-5.6,5.6v26.1c0.2,2.9,2.5,5.2,5.3,5.3c3.1,0.2,5.8-2.2,5.9-5.3V67.3l9.6,14.5c1.1,1.7,3,2.8,5,2.8c0,0,0.1,0,0.1,0 c3.1-0.1,5.5-2.6,5.4-5.6V52.8l0.1-0.1c0-0.2,0-0.4,0-0.6C241.4,49,238.7,46.7,235.6,46.8z"></path>
                    <path d="M129.6,47.7c0,1.3-1,2.4-2.3,2.4c-1.3,0-2.4-1-2.4-2.3c0-1.3,1-2.4,2.3-2.4c0,0,0.1,0,0.1,0 c1.2,0.1,2.2,1.1,2.2,2.3L129.6,47.7z"></path>
                    <path d="M136.2,8.1c0-1.3,1-2.4,2.3-2.4c1.3,0,2.4,1,2.4,2.3c0,1.3-1,2.4-2.3,2.4c0,0,0,0,0,0 c-1.3,0.1-2.5-0.9-2.5-2.3c0,0,0,0,0,0L136.2,8.1z"></path>
                    <path d="M144.3,45.3c1.3,0,2.3,1,2.3,2.3c0,1.3-1,2.3-2.3,2.3s-2.3-1-2.3-2.3c0-1.2,1-2.2,2.2-2.3L144.3,45.3z"></path>
                    <path d="M153.2,8.2c0-1.3,1-2.3,2.3-2.3c1.3,0,2.3,1,2.3,2.3s-1,2.3-2.3,2.3c0,0,0,0,0,0 C154.3,10.5,153.3,9.5,153.2,8.2z"></path>
                  </g>
                  <path
                    className="logo"
                    fill="#ad1d1f"
                    d="M46.1,6c-0.1-1.7-0.3-3.6-0.4-5.7l-4.1,5.4h-1.2c-8-0.1-15.8,1.8-22.9,5.5l0.1,0.2c3.2-1.2,6.7-1.8,10.1-1.8 c3.3,0,6.6,0.6,9.7,1.8l-2,2.6c-2.8-1.1-5.8-1.7-8.9-1.7c-4-0.1-8,0.9-11.5,2.9L7,4.6H6.9c-0.8,9.4-1.3,19.9-1.3,25.2 c0,12.2,2.8,14.6,6.2,17.4c2.6,2.1,5.5,4.6,7.4,12.5c1.2,4.8,2,5.9,4.8,5.9c2.4,0,3.5-0.9,4.6-5c2.1-7.8,6.4-11.7,10.3-15.2 c4.5-4,8.6-7.4,8.6-15.1c0-4.5-0.7-8.9-2-13.2c3.5,3.9,5.4,9,5.4,14.3c0,6.1-2.2,10.3-9.5,16.7c-5.5,4.9-7.2,7-9.6,14.4 c-1.7,5.4-4.8,11-13.2,11c-2.7,0-5.4-0.5-7.9-1.5l-0.1,0.2c7.8,9.3,19.5,14.6,31.6,14.4c23.1,0,40.3-17.7,40.3-40.6 C82.6,25,68.1,8.5,46.1,6z M20.5,42c-2.3-0.6-4.7-0.9-7.2-0.9L13.3,41c0.3-1.2,0.8-2.4,1.7-3.3c2.3,0.7,4.3,2.2,5.6,4.1L20.5,42z"
                  ></path>
                </svg>
              </a>
              <div
                className="collapse navbar-collapse justify-content-center"
                id="collapsibleNavbar"
              >
                <ul className="navbar-nav mainNav">
                  {menuItems &&
                    menuItems.map(menu => (
                      <li className="nav-item" key={menu.title[langCode]}>
                        {menu.title['en_gb'].includes('Shop') ? (
                          <a
                            className={`nav-link ${
                              currePageName == 'shop' &&
                              menu.title['en_gb'].toLowerCase().includes('shop')
                                ? 'selecedItem'
                                : ''
                            }`}
                            target="_blank"
                            // href={`${menu.url[langCode]}`}
                            href={
                              countryCode === 'eu'
                                ? `${menu.url['eu_gb']}`
                                : `${menu.url[langCode]}`
                            }
                            rel="noreferrer"
                          >
                            {menu.title[langCode]}
                          </a>
                        ) : (
                          <a
                            className={`nav-link ${
                              menu.title['en_gb']
                                .toLowerCase()
                                .includes(currePageName)
                                ? 'selecedItem'
                                : ''
                            }`}
                            href={
                              countryCode === 'eu'
                                ? `${menu.url['eu_gb']}`
                                : `${menu.url[langCode]}`
                            }
                          >
                            {menu.title[langCode]}
                          </a>
                        )}
                        {/* <a className="nav-link" href={`${menu.url[langCode]}`}>
                          {menu.title[langCode]}
                        </a> */}

                        <SubMenuGenerator
                          menuTitle={menu.title[langCode]}
                          sequence={menu.sequence}
                          url={
                            countryCode === 'eu'
                              ? `${menu.url['eu_gb']}`
                              : `${menu.url[langCode]}`
                          }
                          countryCode={countryCode}
                          navigationmenus={menu.navigationmenus}
                        />
                      </li>
                    ))}
                  {/* This search option not for this Jan-2022 release
                  <li className="nav-item">
                    <hr className="header--divider" />
                    <a
                      href="#"
                      className="header--search"
                      onClick={() => setOpenSearch(!openSearch)}
                    >
                      <span>
                        <span className="header--search-open">Search</span>
                        <span className="header--search-close">Close</span>
                      </span>
                    </a>
                  </li> */}
                </ul>
              </div>
              <ul className="navbar-nav ml-auto iconLink">
                {/* This search option not for this Jan-2022 release
                <li className="nav-item mobile-header-item">
                  <span
                    className="header--toggle search-mobile"
                    onClick={() => setMobileMenu(true)}
                  />
                </li> */}
                <li className="nav-item">
                  <span tabIndex="0" className="header--cart">
                    {!openCart && (
                      <span
                        className="header--cart-icon"
                        onClick={e => toggleCart(e, true)}
                      />
                    )}
                    {openCart && (
                      <span
                        className="header--cart-icon"
                        onClick={e => toggleCart(e, false)}
                      />
                    )}
                    <span
                      className="header--cart-amount"
                      onClick={e => toggleCart(e, true)}
                    >
                      {cartData && cartData.cart && cartData.cart.totalCount
                        ? cartData.cart.totalCount
                        : 0}
                    </span>{' '}
                    <span className="header--cart-text">
                      <span
                        className="header--cart-text-close"
                        onClick={e => toggleCart(e, true)}
                      >
                        {cartData &&
                        cartData.cart &&
                        cartData.cart.subTotalFormatted
                          ? cartData.cart.subTotalFormatted
                          : '0.00 ' + cartPricewithSymbol}
                      </span>
                      <span
                        className="header--cart-text-open"
                        onClick={e => toggleCart(e, false)}
                      >
                        Hide cart
                      </span>{' '}
                    </span>
                  </span>
                </li>
              </ul>
              <button
                className="navbar-toggler navbar-hamburger-menu"
                type="button"
                data-toggle="collapse"
                data-target="#collapsibleNavbar"
                onClick={() => setMobileMenu(!mobileMenu)}
              >
                <span className="navbar-toggler-icon" />
              </button>
            </nav>
          </div>

          <MobileDropMenu
            showRegionPicker={showRegionPicker}
            menuItems={menuItems}
            langCode={langCode}
            countryCode={countryCode}
            data={data}
            openRegionPicker={openRegionPicker}
          />
          {/* <TopNavigation data={data} setOpenRegionPicker={setOpenRegionPicker} openRegionPicker={openRegionPicker} /> */}
          <div id="header-search">
            <div className="search--root">
              <form className="search--search">
                <input
                  type="search"
                  autoComplete="off"
                  placeholder="Search products..."
                  aria-label="Search text"
                  className="search--input"
                />
              </form>
            </div>
          </div>

          <Cart
            cartPricewithSymbol={cartPricewithSymbol}
            cartData={cartData}
            labelData={data ? data.miniCart : null}
            updateCartItem={updateCartItem}
          />
        </header>
      )}
    </>
  );
};

export default Header;
