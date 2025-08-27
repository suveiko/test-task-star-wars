import type { FC } from 'react';
import {
  Card,
  Text,
  Button,
  Stack,
  Group,
  Badge,
  Indicator,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import type { Person } from '@entities/person';
import { useLocalPersonCheck, useMergedPersonData } from '@entities/person';
import { createPersonRoute } from '@shared/routing';
import { extractIdFromUrl } from '@shared/lib';

type PersonCardProps = {
  person: Person;
};

export const PersonCard: FC<PersonCardProps> = ({ person }) => {
  const navigate = useNavigate();
  const personId = extractIdFromUrl(person.url);
  const hasLocalEdits = useLocalPersonCheck(personId);
  const displayData = useMergedPersonData(personId, person);

  const handleViewDetails = () => {
    navigate(createPersonRoute(personId));
  };

  return (
    <Indicator
      disabled={!hasLocalEdits}
      label="Edited"
      color="yellow"
      size={16}
      position="top-end"
      offset={7}
    >
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="sm">
          <Text size="lg" fw={600} truncate="end">
            {displayData.name}
          </Text>

          <Stack gap="xs">
            <Group gap="xs">
              <Text size="sm" c="dimmed">
                Height:
              </Text>
              <Text size="sm">{displayData.height} cm</Text>
            </Group>

            <Group gap="xs">
              <Text size="sm" c="dimmed">
                Mass:
              </Text>
              <Text size="sm">{displayData.mass} kg</Text>
            </Group>

            <Group gap="xs">
              <Text size="sm" c="dimmed">
                Birth Year:
              </Text>
              <Text size="sm">{displayData.birth_year}</Text>
            </Group>

            <Group gap="xs">
              <Badge variant="light" color="blue">
                {displayData.gender}
              </Badge>
            </Group>
          </Stack>

          <Button fullWidth variant="light" onClick={handleViewDetails}>
            View Details
          </Button>
        </Stack>
      </Card>
    </Indicator>
  );
};
