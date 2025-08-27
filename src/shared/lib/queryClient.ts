import { QueryClient } from '@tanstack/react-query';

/**
 * Create and configure QueryClient instance for React Query
 *
 * @returns Configured QueryClient instance
 */
export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
      },
    },
  });
};
