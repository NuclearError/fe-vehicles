import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchVehicles } from '../../store/';

export const useData = () => {
  const dispatch = useDispatch();
  const { vehicles, status, error } = useSelector((state) => state);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchVehicles());
    }
  }, [status, dispatch]);

  const loading = status === 'loading';

  return [loading, error, vehicles];
};
