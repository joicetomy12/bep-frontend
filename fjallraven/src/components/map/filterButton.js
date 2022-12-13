import React from 'react';

const FilterButton = ({ label, icon, onClick }) => {
  return (
    <div className="position-absolute mapFilter m-auto map-top-filter-btn">
      <button
        onClick={() => onClick(true)}
        title=""
        className="btn themeButton p-l12-r24"
      >
        {label ? label : 'Filter Map'}{' '}
        <img
          src={`/assets/images/${icon ? icon : 'FilterIcon'}.svg`}
          alt="filter"
        />
      </button>
    </div>
  );
};

export default FilterButton;
