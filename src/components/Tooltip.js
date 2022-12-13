import React, { useState } from 'react';

import Styles from '../styles/Tooltip.module.css';
const Tooltip = props => {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className={Styles.TooltipWrapper}
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {props.children}
      {active && (
        <div
          className={`${Styles.TooltipTip} ${
            Styles[props.direction] || Styles.top
          }`}
        >
          {/* Content */}
          {props.title && (
            <h2 className={Styles.TooltipTitle}>{props.title}</h2>
          )}
          {props.description && (
            <p className={Styles.TooltipDescription}>{props.description}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
