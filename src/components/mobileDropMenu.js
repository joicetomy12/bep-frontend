import React, { useEffect, useState } from 'react';

import { capitalizeFirstLetter, getLangUrl } from '../config/utils';
import { MobSubMenuGenerator } from './subMenuGenerator';

const MobileDropMenu = ({
  openRegionPicker,
  data,
  showRegionPicker,
  menuItems,
  langCode,
  countryCode,
  userId
}) => {
  const [showWelcomeNav, setShowWelcomeNav] = useState(false);
  useEffect(() => {
    if (openRegionPicker) {
      setShowWelcomeNav(openRegionPicker);
    }
  }, [openRegionPicker]);

  let svgofAll = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 247.6 86.8"
      preserveAspectRatio="xMinYMid meet"
      focusable="false"
      aria-hidden="true"
      className="logoINcountryNav"
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
        fill="#ad1d1f"
        d="M46.1,6c-0.1-1.7-0.3-3.6-0.4-5.7l-4.1,5.4h-1.2c-8-0.1-15.8,1.8-22.9,5.5l0.1,0.2c3.2-1.2,6.7-1.8,10.1-1.8 c3.3,0,6.6,0.6,9.7,1.8l-2,2.6c-2.8-1.1-5.8-1.7-8.9-1.7c-4-0.1-8,0.9-11.5,2.9L7,4.6H6.9c-0.8,9.4-1.3,19.9-1.3,25.2 c0,12.2,2.8,14.6,6.2,17.4c2.6,2.1,5.5,4.6,7.4,12.5c1.2,4.8,2,5.9,4.8,5.9c2.4,0,3.5-0.9,4.6-5c2.1-7.8,6.4-11.7,10.3-15.2 c4.5-4,8.6-7.4,8.6-15.1c0-4.5-0.7-8.9-2-13.2c3.5,3.9,5.4,9,5.4,14.3c0,6.1-2.2,10.3-9.5,16.7c-5.5,4.9-7.2,7-9.6,14.4 c-1.7,5.4-4.8,11-13.2,11c-2.7,0-5.4-0.5-7.9-1.5l-0.1,0.2c7.8,9.3,19.5,14.6,31.6,14.4c23.1,0,40.3-17.7,40.3-40.6 C82.6,25,68.1,8.5,46.1,6z M20.5,42c-2.3-0.6-4.7-0.9-7.2-0.9L13.3,41c0.3-1.2,0.8-2.4,1.7-3.3c2.3,0.7,4.3,2.2,5.6,4.1L20.5,42z"
      ></path>
    </svg>
  );
  const openOrClose = currentMenuValue => {
    let currentRightElement = document.getElementById(
      'right_' + currentMenuValue
    );
    let currentDownElement = document.getElementById(
      'down_' + currentMenuValue
    );
    let currentCollapseElement = document.getElementById(
      'collapse_' + currentMenuValue
    );
    if (currentRightElement.classList.contains('show')) {
      currentRightElement.classList.remove('show');
    } else {
      currentRightElement.classList.add('show');
    }
    if (currentDownElement.classList.contains('show')) {
      currentDownElement.classList.remove('show');
    } else {
      currentDownElement.classList.add('show');
    }
    if (currentCollapseElement.classList.contains('show')) {
      currentCollapseElement.classList.remove('show');
    } else {
      currentCollapseElement.classList.add('show');
    }
  };

  const getDefaultLangValue = languageUrlDictionary => {
    for (let key in languageUrlDictionary) {
      let url = languageUrlDictionary[key];
      if (url) {
        let path = getLangUrl(url);
        if (path && path.indexOf(langCode) > -1) {
          return path;
        }
      }
    }
    return '';
  };

  const onLangChange = event => {
    let base_url = window.location.origin;
    window.location = base_url + event.target.value;
  };

  let menuTitles = menuItems;
  let shopTitles = [];
  if (menuItems) {
    menuTitles.filter(tag => {
      if (tag.sequence === 5) {
        menuTitles.pop(tag.sequence === 5);
        shopTitles.push(tag);
      }
    });
  }

  return (
    <>
      <div className="header--drop-wrapper">
        <nav className="header--drop">
          {/* This search option not for this Jan-2022 release
          <div
            open="open"
            close="Close"
            className="input--root header--drop-input"
          >
            <input
              placeholder="Search"
              aria-label="Search text"
              className="input--input"
            />
            <button
              aria-label="Submit"
              className="input--submit js-mobile-search-button"
            />
          </div> */}
          <ul className="navbar-nav mainNav">
            {menuTitles &&
              menuTitles.map((menu, indexVal) => (
                <div
                  className="accordion"
                  id="accordionExample"
                  key={menu.title[langCode]}
                >
                  <div className="">
                    <div className="" id={`submenu_${indexVal}`}>
                      <h2 className="mb-0 liness">
                        <button
                          onClick={() => openOrClose(`submenu_${indexVal}`)}
                          className="btn text-left "
                          type="button"
                        >
                          <img
                            id={`right_submenu_${indexVal}`}
                            src="/assets/images/icons/RightArrow.svg"
                            className="arrowdrop title-right-arrow collapse show"
                            alt=""
                          />
                          <img
                            id={`down_submenu_${indexVal}`}
                            src="/assets/svgImages/vectordown.svg"
                            className="arrowdrop title-down-arrow collapse"
                            alt=""
                          />{' '}
                          <p className="munic">{menu.title[langCode]}</p>
                        </button>
                      </h2>
                    </div>

                    <div
                      id={`collapse_submenu_${indexVal}`}
                      className="collapse"
                    >
                      <div className="">
                        <MobSubMenuGenerator
                          showWelcomeNav={showWelcomeNav}
                          onClose={setShowWelcomeNav}
                          menuTitle={menu.title[langCode]}
                          sequence={menu.sequence}
                          url={
                            countryCode === 'eu'
                              ? `${menu.url['eu_gb']}`
                              : `${menu.url[langCode]}`
                          }
                          userId={userId ? userId : ''}
                          countryCode={countryCode}
                          mobileMenuTitle={menu.menutitle}
                          navigationmenus={menu.navigationmenus}
                        />
                      </div>
                    </div>
                  </div>
                </div>
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
            {shopTitles && shopTitles.length > 0 && (
              <div className="">
                <h2 className="">
                  <button className="dropdownlastshop ml-2" type="button">
                    <img
                      src="/assets/images/icons/RightArrow.svg"
                      style={{ width: '20px' }}
                      className="arrowdrop title-right-arrow collapse show"
                      alt=""
                    />
                    <a
                      className="dropdownlastshop munic"
                      href={`${shopTitles[0].url[langCode]}`}
                    >
                      {shopTitles[0].title[langCode]}
                    </a>
                  </button>
                </h2>
              </div>
            )}
          </ul>
          <br /> <br />
          {data && (
            <ul className="header--tertiary-drop-items">
              {data.topNavigationSiteLinks &&
                data.topNavigationSiteLinks.map((link, index) => (
                  <li key={index}>
                    <a className="link--root" href={link.link}>
                      {link.htmlIcon && (
                        <div
                          className="link--icon"
                          dangerouslySetInnerHTML={{ __html: link.htmlIcon }}
                        />
                      )}{' '}
                      {link.icon && (
                        <img
                          src={`https://www.fjallraven.com/${link.icon}`}
                          alt=""
                          className="link--icon"
                        />
                      )}
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              {data.currentMarket && (
                <>
                  <li className="leftinmob">
                    <a
                      href="#"
                      className="link--root header--region"
                      onClick={showRegionPicker}
                    >
                      <span
                        aria-expanded="false"
                        className="region--country top-navigation"
                      >
                        <span
                          className={`flag-icon ${
                            data.currentMarket.flag != 'flag-icon-eu' &&
                            data.currentMarket.flag
                          } region--country-flag`}
                        >
                          {data.currentMarket.flag === 'flag-icon-eu' &&
                            svgofAll}
                        </span>
                        <span>
                          <span className="region--country-title">
                            {data.currentMarket.marketName ===
                            'Other European Countries'
                              ? 'All countries '
                              : data.currentMarket.marketName}
                            <span className="region--country-currency">
                              {' | '} {data.currentMarket.currencySymbol}
                            </span>
                          </span>
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <span className="link--root arrow-link--root region--topnav-lang-area">
                      <select
                        className="region--topnav-lang-select"
                        aria-label="Select site language"
                        name="languageUrls"
                        onChange={onLangChange}
                        defaultValue={getDefaultLangValue(
                          data.currentMarket.languageUrlDictionary
                        )}
                      >
                        {data.currentMarket &&
                          Object.keys(
                            data.currentMarket.languageUrlDictionary
                          ).map(key => (
                            <option
                              key={key}
                              value={getLangUrl(
                                data.currentMarket.languageUrlDictionary[key]
                              )}
                            >
                              {capitalizeFirstLetter(key)}
                            </option>
                          ))}
                      </select>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 21.24 34"
                        focusable="false"
                        aria-hidden="true"
                        className="arrow-link--icon"
                      >
                        <path
                          d="M3,34a3,3,0,0,1-2.12-.88,3,3,0,0,1,0-4.24L12.76,17,.88,5.12A3,
                                        3,0,0,1,5.12.88L21.24,17,5.12,33.12A3,3,0,0,1,3,34Z"
                        />
                      </svg>
                    </span>
                  </li>

                  <li>
                    <a href={data.accountPageUrl} className="link--root">
                      <span>Account</span>
                    </a>
                  </li>
                </>
              )}
            </ul>
          )}
        </nav>
      </div>
    </>
  );
};

export default MobileDropMenu;
