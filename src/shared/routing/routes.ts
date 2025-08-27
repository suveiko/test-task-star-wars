export const ROUTES = {
  home: '/',
  person: '/people/:id',
} as const;

export const createPersonRoute = (id: string) => `/people/${id}`;
