import { type FC, Suspense } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary, Loader } from '@shared/ui';
import { createQueryClient } from '@shared/lib';
import { LocalStorageProvider } from '@shared/providers';
import { routeConfig } from './routes';
import { theme } from './theme';
import '@mantine/core/styles.css';

const queryClient = createQueryClient();

const AppRoutes: FC = () => {
  const routes = useRoutes(routeConfig);
  return (
    <Suspense fallback={<Loader fullscreen message="Loading application..." />}>
      {routes}
    </Suspense>
  );
};

export const App: FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <LocalStorageProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </LocalStorageProvider>
        </MantineProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
