import React from 'react';

const MapZoomButton = ({ label, onClick }) => {
  return (
    <button className={'btn btn-light zoomBtn1'} onClick={onClick}>
      {label}
    </button>
  );
};

export default MapZoomButton;
