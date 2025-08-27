import type { FC } from 'react';
import { Center, Loader as MantineLoader, Stack, Text } from '@mantine/core';

type LoaderProps = {
  /** Optional loading message to display below the spinner */
  message?: string;
  /** Whether to display the loader in fullscreen mode */
  fullscreen?: boolean;
};

/**
 * Loading indicator component with optional message
 *
 * @example
 * ```tsx
 * // Simple loader
 * <Loader />
 *
 * // With message
 * <Loader message="Loading Star Wars data..." />
 *
 * // Fullscreen loader
 * <Loader fullscreen message="Initializing..." />
 * ```
 */
export const Loader: FC<LoaderProps> = ({ message, fullscreen = false }) => {
  const content = (
    <Stack align="center" gap="md">
      <MantineLoader size="lg" />
      {message && (
        <Text size="sm" c="dimmed">
          {message}
        </Text>
      )}
    </Stack>
  );

  if (fullscreen) {
    return (
      <Center h="100vh" w="100vw">
        {content}
      </Center>
    );
  }

  return <Center py="xl">{content}</Center>;
};
