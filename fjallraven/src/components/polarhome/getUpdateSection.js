import axios from 'axios';
import * as _ from 'lodash';
import React, { useState } from 'react';
const BlockContent = require('@sanity/block-content-to-react');
import { event } from '../../../lib/gtag';
import { Constants } from '../../config/constants';
import { sanityUrlFor } from '../../config/sanityUrlFor';
import styles from '../../styles/home/getUpdateSectionStyle.module.css';

const GetUpdateSection = ({ data, countryCode, languageCode }) => {
  let dataCountrycode = countryCode;
  if (languageCode === 'sv-se') {
    dataCountrycode = 'SW';
  }

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
  const checkBoxOnChange = event => {
    setAcceptTermsError(false);
    setAcceptTerms(event.target.value);
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
      event({
        event: 'click',
        eventValue: {
          category: 'newsletter',
          action: 'register',
          label: 'BEP newsletter'
        }
      });
      setIsSuccessTerms(true);
      setMailHandler('');
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
    <>
      {data && (
        <section className={'mb-5'}>
          <div className="container pt-4 pb-4">
            <div className={`d-flex  ${styles.card}`}>
              <div
                className={styles.cardImgTop}
                style={{
                  backgroundImage: `url(${sanityUrlFor(
                    data.backgroundImage?.asset
                  )
                    .auto('format')
                    .url()})`
                }}
              />
              <div
                className={`text-left pl-3 py-5 d-flex align-items-center position-relative justify-content-center ${styles.cardBody}`}
              >
                <div className={`py-5 ${styles.formBox}`}>
                  <span className={styles.cardTitle}>
                    {_.get(data, 'heading', '')}
                  </span>
                  <p className={styles.cardText}>
                    {_.get(data, 'subtitle', '')}
                  </p>
                  <div className={styles.emailInput}>
                    <input
                      value={mailHandler}
                      onChange={mailGrasper}
                      type="email"
                      className={styles.emailSection}
                      placeholder={_.get(data, 'inputPlaceholder', '')}
                    />
                    <img
                      src="/assets/images/sectionThree/RightArrow.svg"
                      alt=""
                      width="8px"
                      onClick={emailSubmission}
                      type="submit"
                      className={styles.modalArrow}
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
                  {!_.isEmpty(_.get(data, 'body', '')) && (
                    <div className={styles.terms}>
                      <label className={styles.checkboxDiv}>
                        <BlockContent blocks={_.get(data, 'body', '')} />
                        <input
                          type="checkbox"
                          checked={acceptTerms}
                          name="tag"
                          onChange={checkBoxOnChange}
                        />
                        <span className={styles.checkMark} />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default GetUpdateSection;
