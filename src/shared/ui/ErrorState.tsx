import type { FC } from 'react';
import { Alert, Button, Stack, Text } from '@mantine/core';

type ErrorStateProps = {
  title?: string;
  message: string;
  onRetry?: () => void;
};

export const ErrorState: FC<ErrorStateProps> = ({
  title = 'Error',
  message,
  onRetry,
}) => {
  return (
    <Alert color="red" title={title}>
      <Stack gap="sm">
        <Text size="sm">{message}</Text>
        {onRetry && (
          <Button size="xs" variant="light" color="red" onClick={onRetry}>
            Try Again
          </Button>
        )}
      </Stack>
    </Alert>
  );
};
