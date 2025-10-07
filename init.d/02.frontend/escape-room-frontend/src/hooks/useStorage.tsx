import { useState, useEffect, useCallback } from 'react';
import type { Highscore } from '../components/GameStateContextTypes';

function useStorage(key: string, initialValue: boolean | string | Date | Highscore[]) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(error);
    }
  }, [key, storedValue]);

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(error);
    }
  }, [key, initialValue]);

  return [storedValue, setStoredValue, remove];
}

export default useStorage;