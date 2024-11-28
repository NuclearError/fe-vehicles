import React, { useState } from 'react';
import './style.scss';

export const CardDetails = ({ description, bodystyles, emissions }) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (event) => {
    setIsOpen(event.currentTarget.open);
  };

  // TODO maybe make summary aria-hidden and describe in some other way?

  return (
    <details className="VehicleList__CardDetails" onToggle={handleToggle}>
      <summary>{isOpen ? 'Read less' : 'Read more'}</summary>
      <div className='VehicleList__CardDetailsContent'>
        <p className='VehicleList__CardDetailsPara'>{description}</p>
        <p className='VehicleList__CardDetailsPara--highlight'>{emissions}</p>
        <ul className='VehicleList__CardDetailsList'>
          {bodystyles.map(style =>
            <li className='VehicleList__CardDetailsListItem' key={`bodystyle-${style}`}>{style}</li>
          )}
        </ul>
      </div>
    </details>
  )
};
