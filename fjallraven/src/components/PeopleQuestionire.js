import _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

import { Constants } from '../config/constants';
import { uriToLang } from '../config/utils';
import { useGlobal } from '../providers/globalProvider';
import styles from '../styles/PeopleQuestionire.module.css';
function PeopleQuestionire({ question, people }) {
  const router = useRouter();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const { siteSettings } = useGlobal();

  const getPeopleFirstName = people => {
    const fname = people.split(' ');
    const firstName = fname[0];
    return firstName;
  };
  return (
    <div>
      {question && (
        <p className={styles.getoknw}>
          {siteSettings?.terms?.getToKnow[lang]}{' '}
          {getPeopleFirstName(_.get(people, 'Name', ''))}
        </p>
      )}
      {/* <p className={styles.getoknw}>
        {siteSettings?.terms?.getToKnow[lang]} {people}
      </p> */}
      <div className={styles.questbox}>
        {question &&
          question.map((qus, index) => {
            return (
              <div key={index}>
                <b>{index + 1}</b>{' '}
                <b className="pl-2"> {_.get(qus && qus.questions, lang, '')}</b>
                <p className={styles.answer}>
                  {_.get(qus && qus.answers, lang, '')}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PeopleQuestionire;
