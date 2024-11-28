import React from 'react';
import { useData } from './useData';
import './style.scss';

import { Card } from "../Card/Card";

export const VehicleList = () => {
  const [loading, error, vehicles] = useData();

  if (loading) {
    return <div data-testid="loading">Loading</div>;
  }

  if (error) {
    return <div data-testid="error">{error}</div>;
  }

  console.log('vehicles = ', vehicles);

  return !!vehicles &&
    <ul data-testid="results" className='VehicleList'>
      {vehicles.map(vehicle =>
        <Card key={`card-${vehicle.id}`} vehicle={vehicle} />
      )}
    </ul>
    ;
}
