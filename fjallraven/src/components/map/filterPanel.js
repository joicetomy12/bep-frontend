import React from 'react';

import styles from '../../styles/map/filterPanel.module.css';

const FilterPanel = ({ open }) => {
  return (
    <div className={`position-absolute ${styles.mapFilterPanel}`}>
      <div className={styles.header}>
        <img
          className={styles.close}
          onClick={() => open(false)}
          src={'/assets/images/icons/close.svg'}
          alt={''}
        />
        <h3>Filter Map</h3>
      </div>
      <div className={`mt-5 filterDiv ${styles.filterBody}`}>
        <div className="row">
          <div className="col-sm-3 mb-3">
            <div className={`${styles.bodyBox} ${styles.selected}`}>
              <img src="/assets/images/allEvent.svg" alt="all event" />
              <h2>Show all events</h2>
              <p>Description text describing what it’s all about.</p>
            </div>
          </div>
          <div className="col-sm-3 mb-3">
            <div className={styles.bodyBox}>
              <img src="/assets/images/Classic.svg" alt="all event" />
              <h2>Fjällräven Classic</h2>
              <p>Description text describing what it’s all about.</p>
            </div>
          </div>
          <div className="col-sm-3 mb-3">
            <div className={styles.bodyBox}>
              <img src="/assets/images/Polar.svg" alt="all event" />
              <h2>Polar</h2>
              <p>Description text describing what it’s all about.</p>
            </div>
          </div>
          <div className="col-sm-3 mb-3">
            <div className={styles.bodyBox}>
              <img src="/assets/images/classicEvents.svg" alt="all event" />
              <h2>Classic events (27)</h2>
              <p>Description text describing what it’s all about.</p>
            </div>
          </div>
          <div className="col-sm-3 mb-3">
            <div className={styles.bodyBox}>
              <img src="/assets/images/campfireEvents.svg" alt="all event" />
              <h2>Campfire events (172)</h2>
              <p>Description text describing what it’s all about.</p>
            </div>
          </div>
          <div className="col-sm-3 mb-3">
            <div className={styles.bodyBox}>
              <img src="/assets/images/storeEvents.svg" alt="all event" />
              <h2>Store events (23)</h2>
              <p>Description text describing what it’s all about.</p>
            </div>
          </div>
          <div className="col-sm-3 mb-3">
            <div className={styles.bodyBox}>
              <img src="/assets/images/brandStores.svg" alt="all event" />
              <h2>Brand stores (7)</h2>
              <p>Description text describing what it’s all about.</p>
            </div>
          </div>
          <div className="col-sm-3 mb-3">
            <div className={styles.bodyBox}>
              <img src="/assets/images/classicEvents.svg" alt="all event" />
              <h2>People (34)</h2>
              <p>Description text describing what it’s all about.</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <button title="" className="btn themeButton">
          Confirm <img src="/assets/images/checkedWhite.svg" alt="filter" />
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
