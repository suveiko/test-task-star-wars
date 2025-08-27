import type { FC } from 'react';
import { Center, Stack, Text, Title } from '@mantine/core';

type EmptyStateProps = {
  title?: string;
  message: string;
};

export const EmptyState: FC<EmptyStateProps> = ({
  title = 'No data found',
  message,
}) => {
  return (
    <Center py="xl">
      <Stack align="center" gap="xs">
        <Title order={3} c="dimmed">
          {title}
        </Title>
        <Text size="sm" c="dimmed">
          {message}
        </Text>
      </Stack>
    </Center>
  );
};
