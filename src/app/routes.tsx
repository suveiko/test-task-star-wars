import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { ROUTES } from '@shared/routing';

const PeopleListPage = lazy(() => import('@pages/people-list'));
const PersonViewPage = lazy(() => import('@pages/person-view'));

export const routeConfig: RouteObject[] = [
  {
    path: ROUTES.home,
    element: <PeopleListPage />,
  },
  {
    path: ROUTES.person,
    element: <PersonViewPage />,
  },
];
