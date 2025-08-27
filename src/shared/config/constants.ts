export const QUERY_KEYS = {
  people: 'people',
  person: 'person',
} as const;

export const QUERY_CONFIG = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 30 * 60 * 1000, // 30 minutes
  retry: 1,
} as const;

export const SEARCH_DEBOUNCE_MS = 400;
export const LOCAL_STORAGE_PREFIX = 'sw-local-person';
