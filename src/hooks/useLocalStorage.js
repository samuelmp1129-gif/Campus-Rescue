import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook para sincronizar estado con localStorage.
 * Si localStorage está vacío o contiene un arreglo vacío en el primer montaje,
 * inicializa automáticamente con `initialValue` (4 reportes de ejemplo).
 */
export function useLocalStorage(key, initialValue) {
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const rawItem = window.localStorage.getItem(key);
      if (!rawItem) {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }

      const parsed = JSON.parse(rawItem);
      if (Array.isArray(parsed) && parsed.length === 0 && Array.isArray(initialValue) && initialValue.length > 0) {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }

      return parsed;
    } catch (error) {
      console.warn(`Error leyendo la clave "${key}" en localStorage:`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState(readValue);

  const setValue = useCallback(
    (value) => {
      try {
        setStoredValue((prevValue) => {
          const newValue = value instanceof Function ? value(prevValue) : value;
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(newValue));
          }
          return newValue;
        });
      } catch (error) {
        console.warn(`Error guardando la clave "${key}" en localStorage:`, error);
      }
    },
    [key]
  );

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key && event.newValue) {
        try {
          setStoredValue(JSON.parse(event.newValue));
        } catch (error) {
          console.warn('Error sincronizando cambios de localStorage:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;
