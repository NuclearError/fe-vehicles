import React from 'react';
import './style.scss';

export const CardImage = ({ id, modelYear }) => {

  /*
    This element is aria-hidden (with no alt tag on the image)
    because the image itself is not interactive and can be 
    considered a 'decorative' element. Alt tags are best reserved 
    for images which convey meaningful information that would otherwise
    not be present in the rest of the DOM.
  */

  return <div data-testid={`cardImage-${id}`} className="VehicleList__CardImage" aria-hidden>
    <picture>
      {/*
        In real circumstances we would likely use many source elements, 
        mapping over a range of images coming from a CDN
      */}
      <source srcSet={`/images/16x9/${id}_${modelYear}.jpg`} media="(min-width: 768px)" />
      <img src={`/images/1x1/${id}_${modelYear}.jpg`} />
    </picture>
  </div>
}
