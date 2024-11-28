import React from 'react';
import './style.scss';

export const Card = ({ vehicle }) => {

  const { id } = vehicle;

  return (
    <li className='VehicleList__card'>
      {id}
    </li>
  );
}
