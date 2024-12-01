import React, { useState } from 'react';
import { useData } from './useData';
import './style.scss';

import { Modal } from '../Modal/Modal';
import { Card } from '../Card/Card';

export const VehicleList = () => {
  const [loading, error, vehicles] = useData();

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleCardClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedVehicle(null);
  };

  if (loading) {
    return <div data-testid="loading">Loading</div>;
  }

  if (error) {
    return <div data-testid="error">{error}</div>;
  }

  return (
    <>
      {/* 
      NB. weird syntax to avoid the warning
      "Received `false` for a non-boolean attribute `inert`. If you want to write it to the DOM, pass a string instead"
      */}
      <section {...(isModalVisible ? { inert: '' } : {})}>
        {!!vehicles && (
          <ul data-testid="results" className="VehicleList">
            {vehicles.map((vehicle) => (
              <Card
                key={`card-${vehicle.id}`}
                vehicle={vehicle}
                onCardClick={handleCardClick}
              />
            ))}
          </ul>
        )}
      </section >
      {isModalVisible && (
        <Modal
          id="vehicle-modal"
          visible={isModalVisible}
          labelledBy="vehicle-modal-heading"
          describedBy="vehicle-modal-description"
          onCloseModal={closeModal}
          previouslyFocusedElement={document.activeElement}
        >
          <h3 id="vehicle-modal-heading">{selectedVehicle?.media[0].name}</h3>
          <p id="vehicle-modal-description">
            {selectedVehicle?.description || 'This is a default description that could work for any vehicle in the event that the description data is unavailable.'}
          </p>
        </Modal>
      )
      }
    </>
  );
};
