/**
 * Extract ID from resource URL
 *
 * @param url - Resource URL ending with ID (e.g., "/api/people/1/" or "https://example.com/api/people/1/")
 * @returns Extracted ID or empty string if not found
 *
 * @example
 * ```ts
 * extractIdFromUrl("/api/people/1/") // "1"
 * extractIdFromUrl("https://example.com/api/planets/3/") // "3"
 * extractIdFromUrl("invalid-url") // ""
 * ```
 */
export const extractIdFromUrl = (url: string): string => {
  const segments = url.split('/').filter(Boolean);

  return segments.at(-1) ?? '';
};
