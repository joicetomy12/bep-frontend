import * as _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

import styles from '../../src/styles/listLocationTag.module.css';
import { Constants } from '../config/constants';
import { uriToLang } from '../config/utils';
import { useGlobal } from '../providers/globalProvider';

const ListLocationTag = ({
  peoplecountriesLists,
  peopleStatesList,
  all,
  onStateChange,
  onCountryChange,
  selectedCountries
  // selectedStates
}) => {
  const router = useRouter();
  const { siteSettings } = useGlobal();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const getPeopleCountryImg = peopleid => {
    const item = _.find(peoplecountriesLists, { _id: peopleid });
    const code = _.get(item, 'code', '');
    return code;
  };
  return (
    <>
      <Accordion className={`${styles.cardBody}`}>
        <Card className={`${styles.accordionCard}`}>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="0"
            className={`dropdown ${styles.whiteDropdown}`}
          >
            <img
              src="/assets/images/icons/location.svg"
              alt="flag"
              className={`${styles.locImg}`}
            />
            {selectedCountries.length == 0 && (
              <span className={`${styles.munic}`}>
                {siteSettings?.terms?.location[lang]}
              </span>
            )}
            {selectedCountries && selectedCountries.length > 0 && (
              <img
                src={`/assets/flags/${getPeopleCountryImg(
                  selectedCountries[0]
                )}.svg`}
                className={styles.flagImg}
                // width="24px"
                // alt=""
                width="30px"
              />
            )}

            {selectedCountries && selectedCountries.length > 1 && (
              <img
                src={`/assets/flags/${getPeopleCountryImg(
                  selectedCountries[1]
                )}.svg`}
                className={styles.flagImg}
                width="30px"
              />
            )}

            {selectedCountries && selectedCountries.length > 2 && (
              <img
                src={`/assets/flags/${getPeopleCountryImg(
                  selectedCountries[2]
                )}.svg`}
                className={styles.flagImg}
                width="30px"
              />
            )}
            {selectedCountries.length > 3 && (
              <span className={styles.flagCount}>
                + {Math.abs(selectedCountries.length - 3)}
              </span>
            )}
            <img
              src="/assets/images/icons/Vector.svg"
              alt="flag"
              className={`${styles.downVectorImg}`}
            />
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body className={`${styles.cardBody}`}>
              <Accordion>
                {/* all section  */}
                <Accordion.Toggle
                  as={Card.Header}
                  // eventKey={loc._id}
                  className={`dropdown ${styles.whiteDropdowninner}`}
                >
                  <label
                    className="checklistContainer"
                    //  key={loc._id}
                  >
                    <span className={`${styles.checkboxes}`}>ALL</span>
                    <input
                      type="checkbox"
                      id="all"
                      onChange={e => {
                        all(e.target.checked);
                      }}
                      checked={
                        selectedCountries && selectedCountries.length >= 11
                          ? true
                          : false
                      }
                    />
                    <span className="checkmark"></span>
                  </label>
                </Accordion.Toggle>

                {peoplecountriesLists &&
                  peoplecountriesLists.map((loc, indexVal) => (
                    <Card className={`${styles.accordionCard}`} key={loc._id}>
                      <Accordion.Toggle
                        as={Card.Header}
                        eventKey={loc._id}
                        className={`dropdown ${styles.whiteDropdowninner}`}
                      >
                        <label className="checklistContainer" key={loc._id}>
                          <span className={`${styles.checkboxes}`}>
                            {loc.title}
                          </span>
                          <input
                            id={loc._id}
                            type="checkbox"
                            onChange={e => {
                              onCountryChange(e.target.checked, loc._id);
                            }}
                            checked={
                              selectedCountries.includes(loc._id) ? true : false
                            }
                          />
                          <span className="checkmark"></span>
                        </label>
                        {loc.code === 'CA' || loc.code === 'US' ? (
                          <span className={`${styles.imgContainer}`}>
                            <img
                              id={`down_submenu_${indexVal}`}
                              src="/assets/images/icons/Vector.svg"
                              alt="flag"
                              className={`${styles.downVectorImg1inner}`}
                            />
                          </span>
                        ) : (
                          ''
                        )}
                      </Accordion.Toggle>

                      {loc.code === 'US' ? (
                        <Accordion.Collapse eventKey={loc._id}>
                          <Card.Body className={` ${styles.subMenuinner}`}>
                            {peopleStatesList &&
                              peopleStatesList.map(
                                state =>
                                  state &&
                                  state.country._ref ===
                                    '3d5ca45f-e63e-4639-8ecc-6961e8fc1ee6' && (
                                    <label
                                      className="checklistContainer"
                                      key={state._id}
                                    >
                                      <span
                                        className={`${styles.checkboxesinner}`}
                                      >
                                        {_.get(state, 'regions', '')}
                                      </span>
                                      <input
                                        type="checkbox"
                                        defaultChecked={
                                          selectedCountries.includes(
                                            '3d5ca45f-e63e-4639-8ecc-6961e8fc1ee6'
                                          )
                                            ? true
                                            : false
                                        }
                                        onChange={e => {
                                          onStateChange(
                                            e.target.checked,
                                            state._id
                                          );
                                        }}
                                      />
                                      <span className="checkmark"></span>
                                    </label>
                                  )
                              )}
                          </Card.Body>
                        </Accordion.Collapse>
                      ) : (
                        ''
                      )}

                      {loc.code === 'CA' ? (
                        <Accordion.Collapse eventKey={loc._id}>
                          <Card.Body className={` ${styles.subMenuinner}`}>
                            {peopleStatesList &&
                              peopleStatesList.map(
                                state =>
                                  state &&
                                  state.country._ref ===
                                    '197df784-1086-4d2a-88f3-d0e32c9af1f5' && (
                                    <label
                                      className="checklistContainer"
                                      key={state._id}
                                    >
                                      <span
                                        className={`${styles.checkboxesinner}`}
                                      >
                                        {_.get(state, 'regions', '')}
                                      </span>
                                      <input
                                        type="checkbox"
                                        onChange={e => {
                                          onStateChange(
                                            e.target.checked,
                                            state._id
                                          );
                                        }}
                                        defaultChecked={
                                          selectedCountries.includes(
                                            '197df784-1086-4d2a-88f3-d0e32c9af1f5'
                                          )
                                            ? true
                                            : false
                                        }
                                      />
                                      <span className="checkmark"></span>
                                    </label>
                                  )
                              )}
                          </Card.Body>
                        </Accordion.Collapse>
                      ) : (
                        ''
                      )}
                    </Card>
                  ))}
              </Accordion>
              {/* ))} */}
            </Card.Body>
            {/* </div> */}
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
};

export default ListLocationTag;
