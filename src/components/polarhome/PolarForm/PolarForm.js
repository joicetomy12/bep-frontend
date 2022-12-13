import React from 'react';

import styles from '../../../components/polarhome/PolarForm/PolarForm.module.css';

function PolarForm() {
  return (
    <div>
      <section className={'pb-5'}>
        <div className="container pt-4 pb-4">
          <div className={`d-flex  ${styles.card}`}>
            <input type="text" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default PolarForm;
