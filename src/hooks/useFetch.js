import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (dataUrl) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, { cancelToken: source.token });
        if (isMounted) {
            setData(response.data);
            setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setData([]);
          setError(err.message);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    fetchData(dataUrl);

    return () => {
      isMounted = false;
      source.cancel();
    };
  }, [dataUrl]);

  return { data, isLoading, error };
};

export default useFetch;
