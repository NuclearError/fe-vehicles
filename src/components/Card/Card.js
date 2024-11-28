import React from 'react';
import './style.scss';

import { CardImage } from './CardImage';
import { Heading } from './Heading';
import { Price } from './Price';

export const Card = ({ vehicle }) => {

  const { id, modelYear, media, price } = vehicle;

  return (
    <li data-testid={`card-${id}`} className='VehicleList__Card'>
      <CardImage id={id} modelYear={modelYear} />
      <div className='VehicleList__CardText'>
        <Heading>{media[0].name}</Heading>
        <Price price={price} />
        <p className='VehicleList__CardTextPara'>The pinnacle of refined capability</p>
      </div>
    </li>
  );
}
