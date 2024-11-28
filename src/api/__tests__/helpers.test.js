import { request } from '../helpers';

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
});

