import type { components } from '@shared/api/generated/schema';

export type PeopleResponse = components['schemas']['PeopleResponse'];

export type PeopleQueryParams = {
  page?: number;
  search?: string;
};
