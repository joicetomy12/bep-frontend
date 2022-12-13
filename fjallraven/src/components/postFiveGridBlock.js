import React from 'react';

import styles from '../styles/postFiveGridBlock.module.css';

const PostFiveGridBlock = () => {
  return (
    <div className={`row mb-5 mt-5 ${styles.postBlockContainer}`}>
      <div className="col-sm-6">
        <div className="d-flex mb-3">
          <div className="w-50 mr-2">
            <a href="/" className="hoverImage">
              <img alt={''} src="/assets/images/CommunityUpdates1.png" />
            </a>
          </div>
          <div className="w-50 ml-2">
            <a href="/" className="hoverImage">
              <img alt={''} src="/assets/images/CommunityUpdates2.png" />
            </a>
          </div>
        </div>
        <div className="d-flex mt-2">
          <div className="w-50 mr-2">
            <a href="/" className="hoverImage">
              <img alt={''} src="/assets/images/CommunityUpdates3.png" />
            </a>
          </div>
          <div className="w-50 ml-2">
            <a href="/" className="hoverImage">
              <img alt={''} src="/assets/images/CommunityUpdates4.png" />
            </a>
          </div>
        </div>
      </div>
      <div className="col-sm-6 pl-0">
        <a href="/" className="hoverImage">
          <img
            src="/assets/images/CommunityUpdates5.png"
            className={styles.bigImage}
          />
        </a>
      </div>
    </div>
  );
};

export default PostFiveGridBlock;
