/* eslint-disable jsx-a11y/alt-text */

/*
  This element is aria-hidden (with no alt tag on the image)
  because the image itself is not interactive and can be
  considered a 'decorative' element (within the limited context of this technical test!).
  Alt tags are best reserved for images which convey meaningful information
  that would otherwise not be present in the rest of the DOM.
*/

import React from 'react';
import './style.scss';

export const CardImage = ({
  id, modelYear, onClick, ariaLabel, ariaHaspopup
}) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onClick();
    }
  };

  return (
    <button
      data-testid={`cardImage-${id}`}
      className="VehicleList__CardImage"
      onClick={onClick}
      type="button"
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      aria-haspopup={ariaHaspopup}
    >
      <picture>
        {/*
        In real circumstances we would likely use many source elements,
        mapping over a range of images coming from a CDN
      */}
        <source srcSet={`/images/16x9/${id}_${modelYear}.jpg`} media="(min-width: 768px)" />
        <img src={`/images/1x1/${id}_${modelYear}.jpg`} aria-hidden />
      </picture>
    </button>
  );
};
