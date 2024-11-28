import { useState, useEffect } from 'react';
import { getData } from '../../api/getData';

export const useData = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    getData()
      .then((response) => {
        if (isMounted) {
          setVehicles(response);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(`Failed to fetch data: ${err.message || err}`);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return [loading, error, vehicles];
};
