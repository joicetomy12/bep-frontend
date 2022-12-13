import axios from 'axios';
import * as _ from 'lodash';
import React, { useState } from 'react';

import { event } from '../../../lib/gtag';
import { Constants } from '../../config/polarConstants';
import { polarFormcountryLists } from '../../config/polarFormCountriesList';
import { sanityUrlFor } from '../../config/sanityUrlFor';
import styles from '../../styles/polar/polarform.module.css';
import FormCountryDropdown from './FormCountryDropdown';
function PolarForm({ data, polarFormData }) {
  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    instagramID: '',
    countryDetails: {},
    dob: '',
    polarRecipient: false,
    newsletterRecipient: false
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const [confirm, setConfirm] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [instagramWarning, setInstagramWarning] = useState(false);

  // const formDetails = {
  //   firstName
  // };
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
  const validateDOB = dob => {
    // eslint-disable-next-line no-useless-escape
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (dob.match(regex) === null) {
      return false;
    }

    const date = new Date(dob);

    const timestamp = date.getTime();

    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
      return false;
    }

    return date.toISOString().startsWith(dob);
  };
  // const validateInstagram = async instaUrl => {
  //   // eslint-disable-next-line no-useless-escape
  //   // let regexDOB = await fetch(`https://instagram.com/" + ${instaUrl} + "/`, {
  //   //   mode: 'no-cors'
  //   // });
  //   let regexDOB = await axios.get(
  //     `https://instagram-username.firebaseapp.com/check?username=akashkaranamkote`

  //   );
  //   console.log('regex', regexDOB);
  //   if (regexDOB.status == 404) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setFormErrors(validate(formValues));

      if (
        !_.isEmpty(formValues.firstname) &&
        !_.isEmpty(formValues.lastname) &&
        !_.isEmpty(formValues.email) &&
        !_.isEmpty(formValues.instagramID) &&
        !_.isEmpty(formValues.countryDetails) &&
        !_.isEmpty(formValues.dob) &&
        formValues.polarRecipient === true &&
        validateEmail(formValues.email) !== false &&
        validateDOB(formValues.dob) !== false
      ) {
        let bodyDetails = {};
        if (formValues.newsletterRecipient === false) {
          bodyDetails = {
            siteID: formValues.countryDetails.siteID,
            email: formValues.email,
            eventID: formValues.countryDetails.eventID,
            optIn: true,
            emailTemplateData: {
              firstname: formValues.firstname,
              lastname: formValues.lastname,
              dob: formValues.dob,
              instagramID: formValues.instagramID
            },
            contactAdditionalData: {
              firstname: formValues.firstname,
              lastname: formValues.lastname,
              dob: formValues.dob,
              instagramID: formValues.instagramID,
              country: formValues.countryDetails.country,
              languageCode: formValues.countryDetails.languageCode,
              registrationSource: 'Polar Application (BEP)',
              polarRecipient: formValues.polarRecipient
            }
          };
        } else {
          bodyDetails = {
            siteID: formValues.countryDetails.siteID,
            email: formValues.email,
            eventID: formValues.countryDetails.eventID,
            optIn: true,
            emailTemplateData: {
              firstname: formValues.firstname,
              lastname: formValues.lastname,
              dob: formValues.dob,
              instagramID: formValues.instagramID
            },
            contactAdditionalData: {
              firstname: formValues.firstname,
              lastname: formValues.lastname,
              dob: formValues.dob,
              instagramID: formValues.instagramID,
              country: formValues.countryDetails.country,
              languageCode: formValues.countryDetails.languageCode,
              registrationSource: 'Polar Application (BEP)',
              polarRecipient: formValues.polarRecipient,
              newsletterRecipient: false
            }
          };
        }

        let config = {
          method: 'post',
          url: Constants.basePath.POLARSIGNUP,
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': Constants.basePath.POLARSUBSCRIPTIONKEY
          },
          data: bodyDetails
        };
        setApiLoading(true);
        const response = await axios(config);
        if (response && response.data && response.data.success === true) {
          if (formValues.newsletterRecipient === false) {
            event({
              event: 'click',
              eventValue: {
                category: 'bep_interaction',
                action: 'register',
                label: `polar_application`
              }
            });
          } else {
            event({
              event: 'click',
              eventValue: {
                category: 'bep_interaction',
                action: 'register',
                label: `polar_application`
              }
            });
            event({
              event: 'click',
              eventValue: {
                category: 'newsletter',
                action: 'register',
                label: `newsletter`
              }
            });
          }

          setApiLoading(false);
          setConfirm(true);
        } else if (
          response &&
          response.data &&
          response.data.success === false &&
          !_.isEmpty(response.data.messages[0])
        ) {
          event({
            event: 'click',
            eventValue: {
              category: 'bep_interaction',
              action: 'error',
              label: response.data.errorCode
            }
          });
          setApiLoading(false);

          setApiError(
            'Something went wrong, please try again later, if this still doesn’t work please contact:'
          );
        } else {
          setApiLoading(false);
          setApiError(
            'Something went wrong, please try again later, if this still doesn’t work please contact:'
          );
        }
      }
    } catch (error) {
      setApiLoading(false);
      setApiError(
        'Something went wrong, please try again later, if this still doesn’t work please contact:'
      );
    }
  };

  const validate = values => {
    const errors = {};
    if (_.isEmpty(values.firstname)) {
      errors.firstname = _.get(data, 'firstNamePlaceHolderError', '');
      event({
        event: 'click',
        eventValue: {
          category: 'bep_interaction',
          action: 'error',
          label: _.get(data, 'firstNamePlaceHolderError', '')
        }
      });
    }
    if (_.isEmpty(values.lastname)) {
      errors.lastname = _.get(data, 'lastNamePlaceHolderError', '');
      event({
        event: 'click',
        eventValue: {
          category: 'bep_interaction',
          action: 'error',
          label: _.get(data, 'lastNamePlaceHolderError', '')
        }
      });
    }

    if (_.isEmpty(values.email)) {
      errors.email = _.get(data, 'emailPlaceHolderError', '');
      event({
        event: 'click',
        eventValue: {
          category: 'bep_interaction',
          action: 'error',
          label: _.get(data, 'emailPlaceHolderError', '')
        }
      });
    } else if (!validateEmail(values.email)) {
      errors.email = _.get(data, 'emailPlaceHolderError', '');
      event({
        event: 'click',
        eventValue: {
          category: 'bep_interaction',
          action: 'error',
          label: _.get(data, 'emailPlaceHolderError', '')
        }
      });
    }
    if (_.isEmpty(values.dob)) {
      errors.dob = _.get(data, 'birthdatePlaceHolderError', '');
      event({
        event: 'click',
        eventValue: {
          category: 'bep_interaction',
          action: 'error',
          label: _.get(data, 'birthdatePlaceHolderError', '')
        }
      });
    } else if (!validateDOB(values.dob)) {
      errors.dob = _.get(data, 'birthdatePlaceHolderError', '');
      event({
        event: 'click',
        eventValue: {
          category: 'bep_interaction',
          action: 'error',
          label: _.get(data, 'birthdatePlaceHolderError', '')
        }
      });
    }
    if (_.isEmpty(values.instagramID)) {
      errors.instagramID = _.get(data, 'instagramUrlPlaceHolderError', '');
      event({
        event: 'click',
        eventValue: {
          category: 'bep_interaction',
          action: 'error',
          label: _.get(data, 'instagramUrlPlaceHolderError', '')
        }
      });
    }
    if (_.isEmpty(values.countryDetails)) {
      errors.countryDetails = _.get(data, 'countrySelectionError', '');
      event({
        event: 'click',
        eventValue: {
          category: 'bep_interaction',
          action: 'error',
          label: _.get(data, 'countrySelectionError', '')
        }
      });
    }
    if (values.polarRecipient === false) {
      errors.polarRecipient = _.get(data, 'termsandconditionsError', '');
      event({
        event: 'click',
        eventValue: {
          category: 'bep_interaction',
          action: 'error',
          label: _.get(data, 'termsandconditionsError', '')
        }
      });
    }
    return errors;
  };
  return (
    <div>
      {Object.keys(formErrors).length === 0 && confirm ? (
        <section className={'pb-5'}>
          <div className={` pt-4 pb-4`}>
            <div className=" container d-flex justify-content-center">
              <div>
                <div className={styles.title}>{_.get(data, 'heading', '')}</div>
                <p className="intro">{_.get(data, 'subtitle', '')}</p>
              </div>
            </div>

            <div className={` ${styles.container} container-md pt-4 pb-4`}>
              <div
                className={`d-flex  justify-content-center ${styles.cardConfirm}`}
              >
                <div className=" d-flex justify-content-center align-items-center flex-column">
                  <img src={sanityUrlFor(polarFormData.logoImage?.asset)} />
                  <div className={styles.confirmationTitle}>
                    {_.get(polarFormData, 'heading', '')}
                  </div>
                  <p className={styles.confirmationSubTitle}>
                    {_.get(polarFormData, 'subtitle', '')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className={'pb-5'}>
          <div className={` pt-4 pb-4`}>
            <div className=" container d-flex justify-content-center">
              <div>
                <div className={styles.title}>{_.get(data, 'heading', '')}</div>
                <p className="intro">{_.get(data, 'subtitle', '')}</p>
              </div>
            </div>

            <div className={` ${styles.container} container-md`}>
              <div className={`  d-flex  ${styles.card}`}>
                <form>
                  <div className={styles.formParent}>
                    <div className={styles.firstName}>
                      <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        autoComplete="off"
                        value={formValues.firstname}
                        onChange={e =>
                          setFormValues({
                            ...formValues,
                            firstname: e.target.value
                          })
                        }
                        placeholder={_.get(data, 'firstNamePlaceHolder', '')}
                        className={`${styles.inputTextField} ${
                          formErrors.firstname && styles.errorInInput
                        }`}
                      ></input>

                      <span className={styles.error}>
                        {formErrors.firstname}
                      </span>
                    </div>
                    <div className={styles.lastName}>
                      <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        autoComplete="off"
                        value={formValues.lastname}
                        onChange={e =>
                          setFormValues({
                            ...formValues,
                            lastname: e.target.value
                          })
                        }
                        placeholder={_.get(data, 'lastNamePlaceHolder', '')}
                        className={`${styles.inputTextField} ${
                          formErrors.lastname && styles.errorInInput
                        }`}
                      ></input>

                      <span className={styles.error}>
                        {formErrors.lastname}
                      </span>
                    </div>
                    <div className={styles.email}>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        autoComplete="off"
                        value={formValues.email}
                        onChange={e =>
                          setFormValues({
                            ...formValues,
                            email: e.target.value
                          })
                        }
                        placeholder={_.get(data, 'emailPlaceHolder', '')}
                        className={`${styles.inputTextField} ${
                          formErrors.email && styles.errorInInput
                        }`}
                      ></input>
                      {/* <img
                          src="/assets/svgImages/formValidIndication.svg"
                          // className={styles.indication}
                          className={`${styles.indication} ${validateEmail(email) && styles.indicationSvg
                            }`}
                        />
                        <img
                          src="/assets/svgImages/formValidationError.svg"
                          className={`${styles.Errorindication} ${!_.isEmpty(emailError) && styles.ErrorindicationSvg
                            }`}
                        /> */}
                      <span className={styles.error}>{formErrors.email}</span>
                    </div>
                    <div className={styles.instagram}>
                      <input
                        type="text"
                        id="instagram"
                        name="instagram"
                        autoComplete="off"
                        value={formValues.instagramID}
                        onChange={e =>
                          setFormValues({
                            ...formValues,
                            instagramID: e.target.value
                          })
                        }
                        onFocus={() => setInstagramWarning(true)}
                        onBlur={() => setInstagramWarning(false)}
                        placeholder={_.get(data, 'instagramUrlPlaceHolder', '')}
                        className={`${styles.inputTextField} ${
                          formErrors.instagramID && styles.errorInInput
                        }`}
                      ></input>
                      {/* <img
                          src="/assets/svgImages/formValidIndication.svg"
                          className={`${styles.indication} `}
                        // className={`${styles.indication} ${(_.isEmpty(instagramIDError) && styles.indicationSvg)}`}
                        />
                        <img
                          src="/assets/svgImages/formValidationError.svg"
                          className={`${styles.Errorindication} ${!_.isEmpty(instagramIDError) &&
                            styles.ErrorindicationSvg
                            }`}
                        /> */}
                      {instagramWarning && (
                        <span className={styles.InstagramError}>
                          {_.get(data, 'instagramUrlIndication', '')}
                        </span>
                      )}
                      <span className={styles.error}>
                        {formErrors.instagramID}
                      </span>
                    </div>
                    <div className={styles.country}>
                      <FormCountryDropdown
                        placeholderText={_.get(data, 'countryPlaceHolder', '')}
                        options={polarFormcountryLists}
                        label="name"
                        id="id"
                        selectedVal={formValues.countryDetails}
                        handleChange={val =>
                          setFormValues({ ...formValues, countryDetails: val })
                        }
                        countryError={formErrors.countryDetails}
                      />
                      <span className={styles.error}>
                        {formErrors.countryDetails}
                      </span>
                    </div>
                    <div className={styles.birthday}>
                      <input
                        type="text"
                        id="birthday"
                        name="birthday"
                        autoComplete="off"
                        value={formValues.dob}
                        onChange={e =>
                          setFormValues({ ...formValues, dob: e.target.value })
                        }
                        placeholder={_.get(data, 'birthdatePlaceHolder', '')}
                        className={`${styles.inputTextField} ${
                          formErrors.dob && styles.errorInInput
                        }`}
                      ></input>
                      <span className={styles.error}>{formErrors.dob}</span>
                    </div>
                    <div className={styles.tAndC}>
                      <div className="d-flex ">
                        <label
                          htmlFor="tAndC"
                          className={`checklistContainer ${styles.checklistContainerLocal}`}
                        >
                          <input
                            type="checkbox"
                            id="tAndC"
                            name="tAndC"
                            onChange={() =>
                              formValues.polarRecipient === true
                                ? setFormValues({
                                    ...formValues,
                                    polarRecipient: false
                                  })
                                : setFormValues({
                                    ...formValues,
                                    polarRecipient: true
                                  })
                            }
                            className={styles.inputCheckbox}
                          ></input>
                          <span className="checkmark"></span>
                        </label>
                        <a
                          href={_.get(data, 'termsandconditionsPath', '')}
                          target="_blank"
                          className={`${styles.checkboxText} ${styles.termsUnderline}`}
                          rel="noreferrer"
                        >
                          {_.get(data, 'termsandconditions', '')}
                        </a>
                      </div>
                      <span className={styles.error}>
                        {formErrors.polarRecipient}
                      </span>
                    </div>
                    <div className={styles.newsSletter}>
                      <label
                        htmlFor="newsSletter"
                        className={`checklistContainer ${styles.checklistContainerLocal}`}
                      >
                        <input
                          type="checkbox"
                          id="newsSletter"
                          name="newsSletter"
                          onChange={() =>
                            formValues.newsletterRecipient === true
                              ? setFormValues({
                                  ...formValues,
                                  newsletterRecipient: false
                                })
                              : setFormValues({
                                  ...formValues,
                                  newsletterRecipient: true
                                })
                          }
                          className={styles.inputCheckbox}
                        ></input>
                        <span className="checkmark"></span>
                        <span className={`${styles.checkboxText}`}>
                          {_.get(data, 'newsletterCondition', '')}
                        </span>
                      </label>
                    </div>
                    <div className={styles.buttonParent}>
                      {!_.isEmpty(apiError) && (
                        <span
                          className={`${styles.applyError} ${styles.apiError}`}
                        >
                          {apiError}{' '}
                          <a href="mailto:polar.fjallraven@fjallraven.com">
                            polar.fjallraven@fjallraven.com
                          </a>
                        </span>
                      )}
                      {apiLoading ? (
                        <button className={styles.button}>
                          <span> {_.get(data, 'applyButtonLoading', '')}</span>
                        </button>
                      ) : (
                        <button
                          className={styles.button}
                          onClick={handleSubmit}
                        >
                          <span> {_.get(data, 'applyButton', '')}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className={` ${styles.container} container-md pt-4 pb-4`}>
            {Object.keys(formErrors).length === 0 && confirm && (
              <div
                className={`d-flex  justify-content-center ${styles.cardConfirm}`}
              >
                <div className=" d-flex justify-content-center align-items-center flex-column">
                  <img src={sanityUrlFor(polarFormData.logoImage?.asset)} />
                  <div className={styles.confirmationTitle}>
                    {_.get(polarFormData, 'heading', '')}
                  </div>
                  <p className={styles.confirmationSubTitle}>
                    {_.get(polarFormData, 'subtitle', '')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default PolarForm;
