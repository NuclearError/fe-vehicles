import React from 'react';
import './style.scss';

/* 
  NB. Text content *must* be a template literal string in order to 
  avoid being rendered as separate nodes in the DOM.
  Visually it doesn't matter but screen readers will read separate 
  nodes as if they are separate 'sentences'. 
  The template literal string means the DOM will always interpret
  the text as a single node.
*/

export const Price = ({ price }) => <h3 className='VehicleList__CardTextPrice'>{`From ${price}`}</h3>;
