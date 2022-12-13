import React from 'react';

import styles from '../../src/styles/listTag.module.css';

const ListTag = ({ tag, onChange, selectedFilterTags }) => {
  // const router = useRouter();
  // const getqueryStringValue = router.query.category
  //   ? router.query.category.trim().replace('', '') + '_tag'
  //   : '';
  const getqueryStringValue = '';
  const catArryValue = selectedFilterTags.includes(tag.id);

  const ifCheckedDefault =
    getqueryStringValue == `${tag.attrid}_tag`
      ? true
      : catArryValue
      ? true
      : false;
  return (
    <div className={styles.tagLabel}>
      <input
        type="checkbox"
        id={`${tag.attrid}_tag`}
        name="tag"
        checked={ifCheckedDefault}
        onChange={e => onChange(tag, e.target.checked)}
      />
      {window.location.pathname.split('/')[1] === 'polar' ? (
        ''
      ) : (
        <label>
          {tag.title}{' '}
          <span>
            {' '}
            <img src="/assets/images/close.svg" alt="" />
          </span>
        </label>
      )}
    </div>
  );
};

export default ListTag;
