import axios from 'axios';
import { useEffect, useState } from 'react';

export const useLoadPrices = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadStripe() {
      let response;
      try {
        response = await axios.get('/load-prices', {
          signal: controller.signal,
        });

        if (response.statusText === 'OK') {
          setData(response.data.prices);
        }
      } catch (error) {
        if (error.message === 'canceled') return;
        setError(error);
        console.log('response', response);
        console.log('Load Prices: Error happend while fetch data');
      } finally {
        setIsLoading(false);
      }
    }

    loadStripe();

    return () => {
      controller.abort();
    };
  }, []);

  return { data, isLoading, error };
};
