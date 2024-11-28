import React from 'react';
import './style.scss';

export const CardImage = ({ id, modelYear }) => {

  // TODO consider accessibility (alt tag is not necessarily the way to go, 
  // depends if this is going to be an interactive element or not)
  // - if image is going to be clickable, aria-label would be more appropriate 
  // to describe what the click would achieve (similarly to labelling an anchor or button)
  // TODO: if not makign this interactive, put aria-hidden on the parent div

  // TODO import breakpoints from somewhere centralised rather than hard coding

  return <div data-testid={`cardImage-${id}`} className="VehicleList__CardImage">
    <picture>
      {/*
        In real circumstances we would likely use many source elements, 
        mapping over a range of images coming from a CDN
      */}
      <source srcset={`/images/16x9/${id}_${modelYear}.jpg`} media="(min-width: 768px)" />
      <img src={`/images/1x1/${id}_${modelYear}.jpg`} />
    </picture>
  </div>
}
