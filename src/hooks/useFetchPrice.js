import { useState, useEffect, useCallback } from 'react';
import { fetchPrice } from '../utils/fetchPrice';


export const useFetchPrice = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const fetchDataWithState = async (items) => {
      setLoading(true);
      try {
        const data = await fetchPrice(items);
        setError(null);
        return data;
      } catch (error) {
        setError(error);
        return null;
      } finally {
        setLoading(false);
      }
    };
  
    return { loading, error, fetchData: fetchDataWithState };
  };
