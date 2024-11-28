import { request, isVehicleDataValid, mergeVehicleData } from '../helpers';

global.fetch = jest.fn();

describe('Helpers', () => {
  describe('request', () => {

    beforeEach(() => {
      jest.spyOn(console, 'error');
      console.error.mockImplementation(() => null);
    });

    afterEach(() => {
      jest.clearAllMocks();
      console.error.mockRestore();
    });

    it('should return JSON data when successful', async () => {
      const mockResponse = { data: 'lorem ipsum' };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });
      const result = await request('/api/test');

      expect(fetch).toHaveBeenCalledWith('/api/test');
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error for failed HTTP requests', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(request('/api/404')).rejects.toThrow('HTTP 404');
      expect(fetch).toHaveBeenCalledWith('/api/404');
    });

    it('should throw an error for network errors', async () => {
      const networkErrorMessage = 'Network error lorem ipsum';
      fetch.mockRejectedValueOnce(new Error(networkErrorMessage));

      await expect(request('/api/error')).rejects.toThrow(networkErrorMessage);
      expect(fetch).toHaveBeenCalledWith('/api/error');
    });
  });

  describe('isVehicleDataValid', () => {
    it('should return true for vehicles with valid data', () => {
      const vehicle = { id: 1, modelYear: 2020, media: {}, apiUrl: '/carA' };
      expect(isVehicleDataValid(vehicle)).toBe(true);
    })
    test.each([
      { id: 1, modelYear: 2020, media: {}, apiUrl: undefined },
      { id: 2, modelYear: 2020, apiUrl: '/carA', media: undefined },
      { id: 3, media: {}, apiUrl: '/carB', modelYear: undefined },
      { modelyear: 2020, media: {}, apiUrl: '/carC', id: undefined },
      {},
    ])('should return false for vehicles with missing id, modelYear, media, or apiUrl', (vehicle) => {
      expect(isVehicleDataValid(vehicle)).toBe(false);
    });
  });

  describe('mergeVehicleData', () => {
    const mockVehicle = { id: 1, modelYear: 2020, media: {} };
    const mockDetails = {
      description: 'Lorem ipsum',
      price: "£65,100",
      meta: {
        passengers: 4,
        drivetrain: ["A", "B"],
        "bodystyles": ["lorem", "ipsum"],
        emissions: {
          template: '$value g/km',
          value: 120,
        },
      },
    };
    it('should return null if details object has no price', () => {
      const details = { description: 'Lorem ipsum', meta: {} };
      const result = mergeVehicleData(mockVehicle, details);

      expect(result).toBeNull();
    });

    it('should merge vehicle data with details, including processed emissions info', () => {
      const { description, price } = mockDetails;
      const { passengers, drivetrain, bodystyles } = mockDetails.meta;
      const result = mergeVehicleData(mockVehicle, mockDetails);

      expect(result).toEqual({
        ...mockVehicle,
        description,
        price,
        passengers,
        drivetrain,
        bodystyles,
        emissions: "120 g/km"
      });
    });
    it('should handle missing optional data gracefully', () => {
      const mockDetailsWithMissingInfo = {
        ...mockDetails,
        meta: {
          ...mockDetails.meta,
          bodystyles: undefined,
          emissions: undefined,
        },
      }
      const { description, price } = mockDetails;
      const result = mergeVehicleData(mockVehicle, mockDetailsWithMissingInfo);

      expect(result).toEqual({
        ...mockVehicle,
        description,
        price,
        passengers: mockDetails.meta.passengers,
        drivetrain: mockDetails.meta.drivetrain,
        bodystyles: undefined,
        emissions: undefined,
      });
    });
  });
});

