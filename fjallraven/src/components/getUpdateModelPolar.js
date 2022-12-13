import axios from 'axios';
import * as _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

import { Constants } from '../../src/config/constants';
import { sanityUrlFor } from '../../src/config/sanityUrlFor';
import { useGlobal } from '../providers/globalProvider';
const BlockContent = require('@sanity/block-content-to-react');
import styles from '../styles/home/getUpdateSectionStyle.module.css';

const GetUpdateModalPopup = ({ content }) => {
  const router = useRouter();

  const languageCode = router.query.lang || Constants.defaultCountry.lang;
  const countryCode = router.query.code || Constants.defaultCountry.code;
  let dataCountrycode = countryCode;
  if (languageCode === 'sv-se') {
    dataCountrycode = 'SW';
  }
  const { showGetUpdateModalPolar, setShowGetUpdateModalPolar } = useGlobal();
  const handleClose = () => setShowGetUpdateModalPolar(false);
  const modelData = content;

  const backgroundImageUrl = _.get(modelData, 'backgroundImage.asset', '');
  const heading = _.get(modelData, 'heading', '');
  const subtitle = _.get(modelData, 'subtitle', '');
  const termText = _.get(modelData, 'body', '');
  const placeholderText = _.get(modelData, 'inputPlaceholder', '');
  const [mailHandler, setMailHandler] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptTermsError, setAcceptTermsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccessTerms, setIsSuccessTerms] = useState(false);
  const validateEmail = emailAdress => {
    // eslint-disable-next-line no-useless-escape
    let regexEmail =
      // eslint-disable-next-line no-useless-escape
      /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (emailAdress.match(regexEmail)) {
      return true;
    } else {
      return false;
    }
  };
  const mailGrasper = event => {
    setAcceptTermsError(false);
    setMailHandler(event.target.value);
  };

  const emailSubmission = event => {
    event.preventDefault();

    if (_.isEmpty(mailHandler)) {
      setErrorMessage('Pleaes enter a valid email');
      setAcceptTermsError(true);
      return;
    }

    if (!validateEmail(mailHandler)) {
      setErrorMessage('Pleaes enter a valid email');
      setAcceptTermsError(true);
      return;
    }

    if (!acceptTerms) {
      setErrorMessage('Please accept Privacy Policy to continue');
      setAcceptTermsError(true);
      return;
    }
    subScripeUser();
  };

  const subScripeUser = async () => {
    let dataSend = {
      brand: 'fjallraven',
      marketId: _.upperCase(dataCountrycode),
      email: mailHandler,
      registrationSouce: 'BEP'
    };

    let config = {
      method: 'post',
      url: Constants.basePath.ORCHESTRATION_API_URL,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        request_type: 'POST',
        epi_request_endpoint: `/${languageCode}/api/bependpoints/subscribeuser`,
        epi_request_params: dataSend
      }
    };

    const response = await axios(config);
    if (response && response.status === 200) {
      setIsSuccessTerms(true);
      setMailHandler('');
      setAcceptTermsError(false);
      setAcceptTerms(false);
      setTimeout(() => {
        setIsSuccessTerms(false);
      }, 6000);
    } else {
      setErrorMessage('Failed to subscribe to the newsletter');
      setAcceptTermsError(true);
    }
  };

  return (
    <Modal
      show={showGetUpdateModalPolar}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <a
        href="/"
        className="popClose"
        onClick={e => {
          e.preventDefault();
          handleClose();
        }}
      >
        <img src="/assets/images/close.svg" data-dismiss="modal" alt={''} />
      </a>
      <section className={'pop-section-container backgroudTransparent'}>
        <div className="container p-0">
          <div className={`d-flex  ${styles.card}`}>
            <div
              className={styles.cardImgTop}
              style={{
                backgroundImage: `url(${sanityUrlFor(backgroundImageUrl).auto(
                  'format'
                )})`
              }}
            />
            <div
              className={`text-left pl-3 py-5 d-flex align-items-center justify-content-center pop-left-container ${styles.cardBody}`}
            >
              <div className={`py-5 ${styles.formBox}`}>
                <span className={styles.cardTitle}>{heading}</span>
                <p className={styles.cardText}>{subtitle}</p>
                <div className={styles.emailInput}>
                  <input
                    value={mailHandler}
                    onChange={mailGrasper}
                    type="email"
                    className={styles.emailSection}
                    placeholder={placeholderText}
                  />
                  <img
                    src="/assets/images/sectionThree/RightArrow.svg"
                    alt=""
                    onClick={emailSubmission}
                    width="8px"
                    height="18px"
                    type="submit"
                    className={styles.modal_Arrow}
                  />
                </div>
                {acceptTermsError && (
                  <p className="error-text">{errorMessage}</p>
                )}
                {isSuccessTerms && (
                  <p className="success-text">
                    Successfully subscribe to the newsletter!
                  </p>
                )}
                <div className={styles.terms}>
                  <label className={styles.checkboxDiv}>
                    <BlockContent blocks={termText} />

                    <input
                      type="checkbox"
                      name="tag"
                      onChange={() =>
                        acceptTerms === true
                          ? setAcceptTerms(false)
                          : setAcceptTerms(true)
                      }
                    />
                    <span className={styles.checkMark} />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default GetUpdateModalPopup;
