import React, { useState } from 'react';
import './style.scss';

export const CardDetails = ({ description, bodystyles, emissions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (event) => {
    setIsOpen(event.currentTarget.open);
  };

  return (
    <details className="VehicleList__CardDetails" onToggle={handleToggle}>
      <summary
        aria-label={isOpen ? 'Hide additional information about this vehicle' : 'Show additional information about this vehicle'}
      >
        {isOpen ? 'Show less' : 'Show more'}
      </summary>
      <div className="VehicleList__CardDetailsContent">
        <p className="VehicleList__CardDetailsPara">{description}</p>
        <p className="VehicleList__CardDetailsPara VehicleList__CardDetailsPara--highlight">{emissions}</p>
        <ul className="VehicleList__CardDetailsList">
          {bodystyles.map((style) => <li className="VehicleList__CardDetailsListItem" key={`bodystyle-${style}`}>{style}</li>)}
        </ul>
      </div>
    </details>
  );
};
