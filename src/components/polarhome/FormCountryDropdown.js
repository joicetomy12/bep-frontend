import * as _ from 'lodash';
import { useEffect, useRef, useState } from 'react';

import styles from '../../styles/polar/polarform.module.css';

const FormCountryDropdown = ({
  options,
  placeholderText,
  label,
  id,
  selectedVal,
  handleChange,
  countryError
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', toggle);
    return () => document.removeEventListener('click', toggle);
  }, []);

  const selectOption = option => {
    setQuery(() => '');
    handleChange(option);
    setIsOpen(isOpen => !isOpen);
  };

  function toggle(e) {
    if (e.target.id == 'country') {
      setIsOpen(true);
    } else if (e.target.id == 'arrow') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal[label];

    return '';
  };

  const filter = options => {
    return options.filter(
      option => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  return (
    <div className="dropdown">
      <div className={styles.countryDropdown}>
        <div className="">
          <input
            ref={inputRef}
            type="text"
            value={getDisplayValue()}
            name="searchTerm"
            onChange={e => {
              setQuery(e.target.value);
              handleChange(null);
            }}
            className={`${styles.inputTextField} ${
              !_.isEmpty(countryError) && styles.errorInInput
            }`}
            onClick={toggle}
            placeholder={placeholderText}
            autoComplete="whatever "
            id="country"
          />
        </div>
        <img
          src="/assets/svgImages/formDropdownArrow.svg"
          className={`${styles.dropDownArrow} ${
            isOpen ? styles.arrowOpen : ''
          }`}
          ref={arrowRef}
          id="arrow"
        />
        {/* <div className={`arrow ${isOpen ? "open" : ""}`}></div> */}
      </div>
      <div
        // className={styles.optionsParent}
        className={`${styles.optionsParent} ${isOpen ? styles.open : ''}`}
      >
        <div className={`${styles.options} `}>
          {filter(options).map((option, index) => {
            return (
              <div
                onClick={() => selectOption(option)}
                className={`${styles.option} ${
                  option[label] === selectedVal ? 'selected' : ''
                }`}
                key={`${id}-${index}`}
              >
                {option[label]}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FormCountryDropdown;
