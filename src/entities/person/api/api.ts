import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { apiClient } from '@shared/api';
import { QUERY_KEYS, QUERY_CONFIG } from '@shared/config';
import type { PeopleQueryParams } from './types';

/**
 * Fetch paginated list of people from Star Wars API
 */
export const usePeopleQuery = ({ page = 1, search }: PeopleQueryParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.people, { page, search }],
    queryFn: async () => {
      const { data, error } = await apiClient.GET('/api/people', {
        params: {
          query: {
            page,
            ...(search && { search }),
          },
        },
      });

      if (error) {
        throw new Error('Failed to fetch persons');
      }

      return data;
    },
    staleTime: QUERY_CONFIG.staleTime,
    gcTime: QUERY_CONFIG.gcTime,
    retry: QUERY_CONFIG.retry,
    placeholderData: keepPreviousData,
  });
};

/**
 * Fetch single person details from Star Wars API
 */
export const usePersonQuery = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.person, id],
    queryFn: async () => {
      const { data, error } = await apiClient.GET('/api/people/{id}', {
        params: {
          path: { id },
        },
      });

      if (error) {
        throw new Error('Failed to fetch person');
      }

      return data;
    },
    staleTime: QUERY_CONFIG.staleTime,
    gcTime: QUERY_CONFIG.gcTime,
    retry: QUERY_CONFIG.retry,
    enabled: !!id,
  });
};
