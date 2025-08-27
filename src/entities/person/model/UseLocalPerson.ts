import { useState, useEffect, useCallback } from 'react';
import { LOCAL_STORAGE_PREFIX } from '@shared/config';
import type { Person, LocalPersonData } from './types';

type UseLocalPersonReturn = {
  localData: Nullable<LocalPersonData>;
  mergedData: Nullable<Person>;
  isEdited: boolean;
  save: (updates: LocalPersonData) => void;
  reset: () => void;
};

/**
 * Hook for managing local person data with localStorage persistence
 *
 * @param id - Person ID for storage key
 * @param serverData - Server data to merge with local changes
 * @returns Object with local data management functions
 */
export const useLocalPerson = (
  id: string,
  serverData: Optional<Person>,
): UseLocalPersonReturn => {
  const [localData, setLocalData] = useState<Nullable<LocalPersonData>>(null);
  const storageKey = `${LOCAL_STORAGE_PREFIX}:${id}`;

  /**
   * Save updates to localStorage and state
   */
  const save = useCallback(
    (updates: LocalPersonData) => {
      try {
        const newData = { ...localData, ...updates };
        localStorage.setItem(storageKey, JSON.stringify(newData));
        setLocalData(newData);
      } catch (error) {
        console.error('Failed to save local data:', error);
      }
    },
    [localData, storageKey],
  );

  /**
   * Clear all local changes
   */
  const reset = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
      setLocalData(null);
    } catch (error) {
      console.error('Failed to reset local data:', error);
    }
  }, [storageKey]);

  // Merge server and local data
  const mergedData: Nullable<Person> = serverData
    ? {
        ...serverData,
        ...localData,
      }
    : null;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setLocalData(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load local data:', error);
    }
  }, [storageKey]);

  return {
    localData,
    mergedData,
    isEdited: !!localData && Object.keys(localData).length > 0,
    save,
    reset,
  };
};
