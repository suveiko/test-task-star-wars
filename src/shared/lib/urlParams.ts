import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

/**
 * Hook for managing URL search parameters with type safety
 *
 * @template T - The shape of expected URL parameters
 * @returns Object with current params and a setter function
 *
 * @example
 * ```tsx
 * const { params, setParams } = useUrlParams<{ page: string; search: string }>();
 *
 * // Read params
 * console.log(params.page); // "1"
 * console.log(params.search); // "luke"
 *
 * // Update params
 * setParams({ page: "2" }); // Updates only page
 * setParams({ search: undefined }); // Removes search param
 * ```
 */
export const useUrlParams = <
  T extends Record<string, string | number | undefined>,
>() => {
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Get all URL parameters as a typed object
   */
  const getParams = useCallback((): T => {
    const params = {} as T;

    for (const [key, value] of searchParams.entries()) {
      (params as any)[key] = value;
    }

    return params;
  }, [searchParams]);

  /**
   * Update URL parameters
   * - Setting a value to undefined, null, or empty string removes it from URL
   * - Other values are converted to strings and added to URL
   */
  const setParams = useCallback(
    (newParams: Partial<T>) => {
      setSearchParams((previousParams) => {
        const updatedParams = new URLSearchParams(previousParams);

        for (const [key, value] of Object.entries(newParams)) {
          if (value === undefined || value === null || value === '') {
            updatedParams.delete(key);
          } else {
            updatedParams.set(key, String(value));
          }
        }

        return updatedParams;
      });
    },
    [setSearchParams],
  );

  return {
    params: getParams(),
    setParams,
  };
};
