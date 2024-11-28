// eslint-disable-next-line no-unused-vars
import { request } from './helpers';

/**
 * Pull vehicles information
 *
 * @return {Promise<Array.<vehicleSummaryPayload>}
 */
export const getData = async () => {
  try {
    const vehicles = await request('/api/vehicles.json');

    if (!Array.isArray(vehicles)) {
      throw new Error('Invalid data response, expected array');
    }

    const vehicleDetails = await Promise.all(
      vehicles.map(async (vehicle) => {
        if (!vehicle.apiUrl) return null;
        try {
          const details = await request(vehicle.apiUrl);

          if (details.price) {
            return {
              id: vehicle.id,
              modelYear: vehicle.modelYear,
              media: vehicle.media,
              description: details.description,
              price: details.price,
              passengers: details.meta?.passengers,
              drivetrain: details.meta?.drivetrain,
              bodystyles: details.meta?.bodystyles,
              emissions: details.meta?.emissions?.template?.replace('$value', details.meta?.emissions?.value),
            };
          }
          return null;

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
