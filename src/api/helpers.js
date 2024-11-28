/**
 * A utility function to make a network api call
 *
 * @param {string} apiUrl
 * @return {Promise<Object>}
 */
export const request = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`${apiUrl} request failed:`, error);
    throw error;
  }
};

/**
 * Validate vehicle object
 *
 * @param {Object} vehicle
 * @return {boolean}
 */
export const isVehicleDataValid = (vehicle) => {
  return !!(vehicle.id && vehicle.modelYear && vehicle.media && vehicle.apiUrl);
};

/**
 * Merge general vehicle data with detailed data
 *
 * @param {Object} vehicle
 * @param {Object} details
 * @return {Object|null}
 */
export const mergeVehicleData = (vehicle, details) => {
  if (!details.price) {
    return null;
  }

  const { id, modelYear, media } = vehicle;

  return {
    id,
    modelYear,
    media,
    description: details.description,
    price: details.price,
    passengers: details.meta?.passengers,
    drivetrain: details.meta?.drivetrain,
    bodystyles: details.meta?.bodystyles,
    emissions: details.meta?.emissions?.template?.replace('$value', details.meta?.emissions?.value),
  };
};
