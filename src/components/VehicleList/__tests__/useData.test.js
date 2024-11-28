import { renderHook } from '@testing-library/react-hooks';
import { useData } from '../useData';
import { getData } from '../../../api/getData';

jest.mock('../../../api/getData');

describe('useData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize with default states', () => {
    getData.mockImplementationOnce(() => new Promise(() => { }));
    const { result } = renderHook(() => useData());
    const [loading, error, vehicles] = result.current;

    expect(loading).toBe(true);
    expect(error).toBe(null);
    expect(vehicles).toEqual([]);
  });

  test('should set vehicles data when API call succeeds', async () => {
    const mockVehicles = [{ id: 1, name: 'Car A' }, { id: 2, name: 'Car B' }];
    getData.mockResolvedValueOnce(mockVehicles);

    const { result, waitForNextUpdate } = renderHook(() => useData());

    expect(result.current[0]).toBe(true); // loading
    await waitForNextUpdate();
    const [loading, error, vehicles] = result.current;

    expect(loading).toBe(false);
    expect(error).toBe(null);
    expect(vehicles).toEqual(mockVehicles);
    expect(getData).toHaveBeenCalledTimes(1);
  });

  test('should set error when API call fails', async () => {
    const mockErrorMessage = 'Lorem ipsum';
    const mockError = new Error(mockErrorMessage);
    getData.mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useData());

    expect(result.current[0]).toBe(true); // loading
    await waitForNextUpdate();
    const [loading, error, vehicles] = result.current;

    expect(loading).toBe(false);
    expect(error).toBe(`Failed to fetch data: ${mockErrorMessage}`);
    expect(vehicles).toEqual([]);
    expect(getData).toHaveBeenCalledTimes(1);
  });

  test('should ignore state updates if the component unmounts', async () => {
    const mockVehicles = [{ id: 1, name: 'Car A' }];
    getData.mockResolvedValueOnce(mockVehicles);

    const { result, unmount } = renderHook(() => useData());
    unmount();

    expect(getData).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe(true); // default state (loading)
  });
});
