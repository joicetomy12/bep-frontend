import React from 'react';

import styles from '../styles/favoritProduct.module.css';

const FavoritProduct = ({ product }) => {
  return (
    <div key={product.id} className={styles.FeatureCard}>
      <div className={styles.shopBox}>
        <div className={`d-flex ${styles.shopFlex}`}>
          <div className={`w-25 ${styles.width100}`}>
            <img alt={''} src={product.imgSrc} className={styles.shopImage} />
          </div>
          <div className={`w-75 ${styles.width100}`}>
            <div className={styles.descText}>
              <h3>{product.productTitle}</h3>
              <h4>${product.productPrice}</h4>
              <a href="/" className={`btn themeButton mt-4 ${styles.shopBtn}`}>
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritProduct;
