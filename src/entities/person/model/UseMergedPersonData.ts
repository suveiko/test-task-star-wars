import { useState, useEffect } from 'react';
import { LOCAL_STORAGE_PREFIX } from '@shared/config';
import { useLocalStorageUpdate } from '@shared/providers';
import type { Person, LocalPersonData } from './types';

/**
 * Get merged person data with local edits
 *
 * @param id - Person ID
 * @param person - Server person data
 * @returns Merged person data
 */
export const useMergedPersonData = (id: string, person: Person): Person => {
  const [localData, setLocalData] = useState<Nullable<LocalPersonData>>(null);
  const { updateKey } = useLocalStorageUpdate();

  useEffect(() => {
    const storageKey = `${LOCAL_STORAGE_PREFIX}:${id}`;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setLocalData(JSON.parse(stored));
      } else {
        setLocalData(null);
      }
    } catch (error) {
      console.error('Failed to load local data:', error);
      setLocalData(null);
    }
  }, [id, updateKey]);

  return localData ? { ...person, ...localData } : person;
};
