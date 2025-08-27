import { describe, it, expect } from 'vitest';
import { extractIdFromUrl } from '../extractId';

describe('extractIdFromUrl', () => {
  it('should extract ID from full URL', () => {
    expect(extractIdFromUrl('https://example.com/api/people/1/')).toBe('1');
    expect(extractIdFromUrl('https://example.com/api/planets/3/')).toBe('3');
  });

  it('should extract ID from relative URL', () => {
    expect(extractIdFromUrl('/api/people/42/')).toBe('42');
    expect(extractIdFromUrl('/api/vehicles/7/')).toBe('7');
  });

  it('should handle URLs without trailing slash', () => {
    expect(extractIdFromUrl('/api/people/5')).toBe('5');
    expect(extractIdFromUrl('https://example.com/api/items/99')).toBe('99');
  });

  it('should return empty string for invalid URLs', () => {
    expect(extractIdFromUrl('')).toBe('');
    expect(extractIdFromUrl('/')).toBe('');
    expect(extractIdFromUrl('invalid-url')).toBe('invalid-url');
  });

  it('should handle URLs with query parameters', () => {
    expect(extractIdFromUrl('/api/people/1/?format=json')).toBe('?format=json');
    expect(extractIdFromUrl('/api/people/1?format=json')).toBe('1?format=json');
  });
});
