import React from 'react';

import styles from '../styles/eventParticipants.module.css';

const EventParticipants = ({ countryDetails, data }) => {
  return (
    <div className={styles.peopleSmallCard}>
      <img
        className={styles.defaultParticipantIcon}
        alt={''}
        src={data.imageUrl ? data.imageUrl : '/assets/svgImages/foxicon.svg'}
      />
      <div className="">
        <h2>
          {/* {participant.firstName
            ? participant.firstName
            : '' + ' ' + participant.lastName
            ? participant.lastName
            : ''} */}{' '}
          {data.name}
        </h2>
        <div className="d-flex align-items-center flex-wrap">
          <div className={'tag' + ' ' + data.category}>
            <span>{data.category} </span>
          </div>
          <div className="d-flex align-items-center mt-1">
            <img
              src={`/assets/flags/${countryDetails.countryCode.toLowerCase()}.svg`}
              className={styles.flagImg}
              width="24px"
              alt=""
            />
            <div className={styles.location}>{countryDetails.country}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventParticipants;
