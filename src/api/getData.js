// eslint-disable-next-line no-unused-vars
import { request, isVehicleDataValid, mergeVehicleData } from './helpers';

/**
 * Pull vehicles information
 *
 * @return {Promise<Array.<vehicleSummaryPayload>}
 */
export const getData = async () => {
  try {
    const vehicles = await request('/api/vehicles.json');

    // TODO double check if this is overkill
    if (!Array.isArray(vehicles)) {
      throw new Error('Invalid data response, expected array');
    }

    const vehicleDetails = await Promise.all(
      vehicles.map(async (vehicle) => {
        if (!isVehicleDataValid(vehicle)) {
          return null;
        }
        try {
          const details = await request(vehicle.apiUrl);
          return mergeVehicleData(vehicle, details);
        } catch {
          return null;
        }
      })
    );
    return vehicleDetails.filter(Boolean);
  } catch (error) {
    throw new Error(`Error fetching vehicle data: ${error}`);
  }
};
