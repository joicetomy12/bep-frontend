import 'react-multi-carousel/lib/styles.css';

import _ from 'lodash';
import React from 'react';

const PeopleTags = ({ peopleTags, peopleCategoryTags, lang }) => {
  const getPeopleCategoryTags = peopleid => {
    const item = _.find(peopleCategoryTags, { _id: peopleid });
    const category = item && item.name ? _.get(item.name, lang, '') : '';
    return category;
  };

  return (
    peopleTags && (
      <div>
        <div
          className="sustainability_taglist"
          style={{
            // backgroundColor: people.tagColorCodeList[index].color
            backgroundColor: '#303030'
          }}
          // key={index}
        >
          <span>{getPeopleCategoryTags(_.get(peopleTags, '_ref', ''))}</span>
        </div>
      </div>
    )
  );
};

export default PeopleTags;
