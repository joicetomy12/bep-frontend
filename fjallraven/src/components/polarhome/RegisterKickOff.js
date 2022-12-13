import { sanityUrlFor } from '../../config/sanityUrlFor';
import styles from '../../styles/polar/register.module.css';

function RegisterKickOff({ data }) {
  return (
    <>
      {data && (
        <section className={'pb-5'}>
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
                className={`text-left  d-flex align-items-center position-relative justify-content-center ${styles.cardBody}`}
              >
                <div className={` ${styles.formBox}`}>
                  <span className={styles.cardTitle}>{data.heading}</span>
                  <p className={styles.cardText}>{data.subtitle}</p>
                  <div className={styles.buttun}>
                    <div className={styles.blackbuttun}>
                      <a href={data.polarcta.path}>{data.polarcta.title}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default RegisterKickOff;
