import type { FC } from 'react';
import { Card, Skeleton, Stack, Group } from '@mantine/core';

export const PersonCardSkeleton: FC = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="sm">
        <Skeleton height={28} width="70%" radius="sm" />

        <Stack gap="xs">
          <Group gap="xs">
            <Skeleton height={16} width={50} radius="sm" />
            <Skeleton height={16} width={60} radius="sm" />
          </Group>

          <Group gap="xs">
            <Skeleton height={16} width={45} radius="sm" />
            <Skeleton height={16} width={55} radius="sm" />
          </Group>

          <Group gap="xs">
            <Skeleton height={16} width={70} radius="sm" />
            <Skeleton height={16} width={50} radius="sm" />
          </Group>

          <Group gap="xs">
            <Skeleton height={24} width={60} radius="sm" />
          </Group>
        </Stack>

        <Skeleton height={36} radius="sm" mt="sm" />
      </Stack>
    </Card>
  );
};
