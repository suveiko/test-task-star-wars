import type { components } from '@shared/api/generated/schema';

export type Person = components['schemas']['Person'];

export type LocalPersonData = {
  name?: string;
  height?: string;
  mass?: string;
  gender?: string;
  birth_year?: string;
};
