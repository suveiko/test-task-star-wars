import { useState, useEffect } from 'react';
import { LOCAL_STORAGE_PREFIX } from '@shared/config';
import { useLocalStorageUpdate } from '@shared/providers';

/**
 * Check if person has local edits in localStorage
 *
 * @param id - Person ID to check
 * @returns Whether person has local edits
 */
export const useLocalPersonCheck = (id: string): boolean => {
  const [hasLocalEdits, setHasLocalEdits] = useState(false);
  const { updateKey } = useLocalStorageUpdate();

  useEffect(() => {
    const storageKey = `${LOCAL_STORAGE_PREFIX}:${id}`;
    const stored = localStorage.getItem(storageKey);
    setHasLocalEdits(!!stored);
  }, [id, updateKey]);

  return hasLocalEdits;
};
