import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import FjiravenUsEn from '../../public/epi/Fjallraven-UK-en-GB.json';
import styles from '../../src/styles/footer.module.css';
import { Constants } from '../config/constants';

const Footer = () => {
  const router = useRouter();
  const lang = router.query.lang || Constants.defaultCountry.lang;
  const countryCode = router.query.code || Constants.defaultCountry.code;

  useEffect(() => {
    fetchFooterData().then();
  }, []);
  const [footerData, setFooterData] = useState(FjiravenUsEn);

  const fetchFooterData = async () => {
    let dataCountryCode = countryCode;
    if (dataCountryCode === 'se') {
      dataCountryCode = 'sw';
    }
    // const apiRes = await axios
    //   .get(
    //     `${Constants.basePath.EPI_SERVER_FOOTER}fjallraven-${dataCountryCode}-${lang}.json`
    //   )
    const apiRes = await axios
      .get(
        `${Constants.basePath.EPI_LOCAL_FILE}Fjallraven-${dataCountryCode}-${lang}.json`
      )
      .catch(err => err);
    if (apiRes && apiRes.data) {
      setFooterData(apiRes.data);
    }
  };
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileTwo, setIsMobileTwo] = useState(false);
  const [isMobileThree, setIsMobileThree] = useState(false);
  const [isMobileFour, setIsMobileFour] = useState(false);
  const openDropdownOneSet = () => {
    isMobile ? setIsMobile(false) : setIsMobile(true);
  };

  const openDropdownTwo = () => {
    isMobileTwo ? setIsMobileTwo(false) : setIsMobileTwo(true);
  };

  const openDropdownThirdSet = () => {
    isMobileThree ? setIsMobileThree(false) : setIsMobileThree(true);
  };

  const openDropdownForth = () => {
    isMobileFour ? setIsMobileFour(false) : setIsMobileFour(true);
  };

  return (
    <div className={styles.pageFooter}>
      <footer className="container">
        <div className="row">
          <div className="col-sm-4">
            <a className={`navbar-brand ${styles.logofooterx}`} href="/">
              <img src="/assets/svgImages/logo.svg" alt="Fjällräven" />
            </a>
          </div>
          <div className="col-sm-8 ">
            <div className="row">
              <div className={`col-sm-4 ${styles.dontDisplay}`}>
                <h2>{footerData.footer.firstColumn.label}</h2>
                {footerData.footer.firstColumn.footerItems.map((obj, key) => {
                  return (
                    <div className={`links ${obj.desktopHeight}`} key={key}>
                      <a href={obj.linkUrl} target="_blank" rel="noreferrer">
                        {obj.htmlIcon && (
                          <div
                            className={styles.locator_icon}
                            dangerouslySetInnerHTML={{ __html: obj.htmlIcon }}
                          />
                        )}
                        {obj.label}
                      </a>
                    </div>
                  );
                })}
              </div>

              <div className={`col-sm-4 ${styles.dontDisplay}`}>
                <h2>{footerData.footer.secondColumn.label}</h2>
                {footerData.footer.secondColumn.footerItems.map((obj, key) => {
                  return (
                    <div className={styles.links} key={key}>
                      <a href={obj.linkUrl} target="_blank" rel="noreferrer">
                        {obj.label}
                      </a>
                    </div>
                  );
                })}
                <h2>{footerData.footer.thirdColumn.label}</h2>
                {footerData.footer.thirdColumn.footerItems.map((obj, key) => {
                  return (
                    <div className={styles.links} key={key}>
                      <a href={obj.linkUrl} target="_blank" rel="noreferrer">
                        {obj.label}
                      </a>
                    </div>
                  );
                })}
              </div>
              <div className={`col-sm-4 ${styles.dontDisplay}`}>
                <h2>{footerData.footer.fourthColumn.label}</h2>
                {footerData.footer.fourthColumn.footerItems.map((obj, key) => {
                  return (
                    <div className={styles.links} key={key}>
                      <a href={obj.linkUrl} target="_blank" rel="noreferrer">
                        {obj.label}
                      </a>
                    </div>
                  );
                })}
                <div className={styles.sepretion_block}></div>
                <a href="/" className={styles.track}>
                  {footerData.footer.gaOptInText}
                </a>
                <div className="">
                  {footerData.footer.socialLinksColumn.footerItems.map(
                    (obj, key) => {
                      return (
                        <div
                          className={`linksocial ${obj.desktopHeight}`}
                          key={key}
                        >
                          <a
                            href={obj.linkUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {obj.htmlIcon && (
                              <div
                                className={styles.locator_icon_social}
                                dangerouslySetInnerHTML={{
                                  __html: obj.htmlIcon
                                }}
                              />
                            )}
                            {obj.label}
                          </a>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              {/* phoneDisplay */}
              <ul className={`forLine ${styles.noneDisplay}`}>
                <div className="footer_coloumn">
                  <div className="colosions">
                    <div className="">
                      <div
                        onClick={openDropdownOneSet}
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <h2 className={styles.marginremover}>
                          {' '}
                          <img
                            src={
                              isMobile
                                ? '/assets/svgImages/vectordown.svg'
                                : '/assets/images/icons/RightArrow.svg'
                            }
                            alt=""
                            className={styles.arrowdrop}
                          />
                          {footerData.footer.firstColumn.label}
                        </h2>
                      </div>
                      {isMobile ? (
                        <div>
                          {footerData.footer.firstColumn.footerItems.map(
                            (obj, key) => {
                              if (obj.label) {
                                return (
                                  <div className={styles.links} key={key}>
                                    <a
                                      className={styles.sceneline}
                                      href={obj.linkUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {obj.label}
                                      {obj.htmlIcon && (
                                        <div
                                          className={styles.locator_icon}
                                          dangerouslySetInnerHTML={{
                                            __html: obj.htmlIcon
                                          }}
                                        />
                                      )}
                                    </a>
                                  </div>
                                );
                              }
                            }
                          )}
                        </div>
                      ) : (
                        ' '
                      )}
                    </div>
                  </div>
                </div>

                <div className="footer_coloumn">
                  <div className="colosions">
                    <div>
                      <div
                        className=""
                        onClick={openDropdownTwo}
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <h2 className={styles.marginremover}>
                          <img
                            src={
                              isMobileTwo
                                ? '/assets/svgImages/vectordown.svg'
                                : '/assets/images/icons/RightArrow.svg'
                            }
                            alt=""
                            className={styles.arrowdrop}
                          />{' '}
                          {footerData.footer.secondColumn.label}
                        </h2>
                      </div>
                      {isMobileTwo ? (
                        <div>
                          {footerData.footer.secondColumn.footerItems.map(
                            (obj, key) => {
                              if (obj.label) {
                                return (
                                  <div className={styles.links} key={key}>
                                    <a
                                      className={styles.sceneline}
                                      href={obj.linkUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {obj.label}
                                      {obj.htmlIcon && (
                                        <div
                                          className={styles.locator_icon}
                                          dangerouslySetInnerHTML={{
                                            __html: obj.htmlIcon
                                          }}
                                        />
                                      )}
                                    </a>
                                  </div>
                                );
                              }
                            }
                          )}
                        </div>
                      ) : (
                        ' '
                      )}
                    </div>
                  </div>
                </div>
                <div className="footer_coloumn">
                  <div className="colosions">
                    <div>
                      <div
                        onClick={openDropdownThirdSet}
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <h2 className={styles.marginremover}>
                          <img
                            src={
                              isMobileThree
                                ? '/assets/svgImages/vectordown.svg'
                                : '/assets/images/icons/RightArrow.svg'
                            }
                            alt=""
                            className={styles.arrowdrop}
                          />{' '}
                          {footerData.footer.thirdColumn.label}
                        </h2>
                      </div>

                      {isMobileThree ? (
                        <div>
                          {footerData.footer.thirdColumn.footerItems.map(
                            (obj, key) => {
                              if (obj.label) {
                                return (
                                  <div className={styles.links} key={key}>
                                    <a
                                      className={styles.sceneline}
                                      href={obj.linkUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {obj.label}
                                      {obj.htmlIcon && (
                                        <div
                                          className={styles.locator_icon}
                                          dangerouslySetInnerHTML={{
                                            __html: obj.htmlIcon
                                          }}
                                        />
                                      )}
                                    </a>
                                  </div>
                                );
                              }
                            }
                          )}
                        </div>
                      ) : (
                        ' '
                      )}
                    </div>
                  </div>
                </div>
                <div className="footer_coloumn">
                  <div className="colosions">
                    <div>
                      <div
                        onClick={openDropdownForth}
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <h2 className={styles.marginremover}>
                          <img
                            src={
                              isMobileFour
                                ? '/assets/svgImages/vectordown.svg'
                                : '/assets/images/icons/RightArrow.svg'
                            }
                            alt=""
                            className={styles.arrowdrop}
                          />{' '}
                          {footerData.footer.fourthColumn.label}
                        </h2>
                      </div>
                      {isMobileFour ? (
                        <div>
                          {footerData.footer.fourthColumn.footerItems.map(
                            (obj, key) => {
                              if (obj.label) {
                                return (
                                  <div className={styles.links} key={key}>
                                    <a
                                      className={styles.sceneline}
                                      href={obj.linkUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {obj.label}
                                      {obj.htmlIcon && (
                                        <div
                                          className={styles.locator_icon}
                                          dangerouslySetInnerHTML={{
                                            __html: obj.htmlIcon
                                          }}
                                        />
                                      )}
                                    </a>
                                  </div>
                                );
                              }
                            }
                          )}
                        </div>
                      ) : (
                        ' '
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.foterex}>
                  <ul className={styles.foter}>
                    {footerData.footer.socialLinksColumn.footerItems.map(
                      (obj, key) => {
                        if (obj.label) {
                          return (
                            <li
                              className={`linksocial ${styles.fortyy} `}
                              key={key}
                            >
                              <a
                                href={obj.linkUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {obj.htmlIcon && (
                                  <div
                                    className={styles.locator_icon_social}
                                    dangerouslySetInnerHTML={{
                                      __html: obj.htmlIcon
                                    }}
                                  />
                                )}
                                {obj.label}
                              </a>
                            </li>
                          );
                        }
                      }
                    )}
                  </ul>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
