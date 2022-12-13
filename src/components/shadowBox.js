import React from 'react';
import Carousel from 'react-multi-carousel';

import FavoritProduct from '../../src/components/favoritProduct';
import { FPData } from '../../src/staticData/alsoLikeProductData';
import styles from '../styles/shadowBox.module.css';
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  xdisktop: {
    breakpoint: { max: 3000, min: 2000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 2000, min: 1250 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1250, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 786, min: 0 },
    items: 1
  }
};
const ShadowBox = () => {
  return (
    <div className={styles.shadowBox}>
      <h2>Gear List</h2>
      <p>
        The key to staying comfortable while on an active trip is layering. To
        get maximum comfort with minimum weight, you need versatile layers that
        mix and match to create the right amount of insulation, ventilation and
        weather protection. Try to bring only what is necessary-this will help
        you and the field staff.
      </p>
      <hr />
      <div className="row">
        <div className="col-sm-7">
          <h2>What to pack</h2>
          <h4>Packed by REI</h4>
          <ul className={`${styles.ulCheck} ${styles.ulList}`}>
            <li>All Group Cooking Gear</li>
            <li>Dry Bags</li>
            <li>Group First Aid Kit</li>
            <li>Paddles</li>
            <li>Group First Aid Kit</li>
            <li>PFD and Spray Skirt</li>
            <li>Tandem Kayaks</li>
            <li>Tent(s)</li>
          </ul>
          <h4>What by you (Required)</h4>
          <ul className={styles.ulList}>
            <li className={styles.requiredItem}>Face Mask</li>
            <li className={styles.requiredItem}>
              Flashlight or Headlamp with Fresh Batteries
            </li>
            <li className={styles.requiredItem}>
              Fleece/Whool Jacket or Sweater
            </li>
            <li>Hand Sanitizer</li>
          </ul>
        </div>
        <div className="col-sm-5 pt-5 rightSlides carouselTwo">
          <h4>Travel documents</h4>
          <ul className={styles.ulList}>
            <li>Arilne Tickets (confirmatio and Itinerary</li>
            <li>Final Bulletin (Email Prior to Departure Date)</li>
            <li>Photo Identification</li>
          </ul>
          <h4 className="marginBottomNeg">You may also consider</h4>
          <Carousel responsive={responsive}>
            {FPData.map(product => {
              return <FavoritProduct key={product.id} product={product} />;
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ShadowBox;
