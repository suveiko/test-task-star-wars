import type { FC } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Stack,
  Title,
  Paper,
  Group,
  Text,
  Button,
  Divider,
} from '@mantine/core';
import {
  usePersonQuery,
  useLocalPerson,
  type LocalPersonData,
} from '@entities/person';
import { EditPersonForm } from '@features/edit-person-local';
import { Loader, ErrorState } from '@shared/ui';
import { useLocalStorageUpdate } from '@shared/providers';

const infoFields: { key: string; label: string; suffix?: string }[] = [
  { key: 'height', label: 'Height', suffix: ' cm' },
  { key: 'mass', label: 'Mass', suffix: ' kg' },
  { key: 'hair_color', label: 'Hair Color' },
  { key: 'skin_color', label: 'Skin Color' },
  { key: 'eye_color', label: 'Eye Color' },
  { key: 'birth_year', label: 'Birth Year' },
  { key: 'gender', label: 'Gender' },
];

const PersonViewPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { triggerUpdate } = useLocalStorageUpdate();

  const { data: person, isLoading, error, refetch } = usePersonQuery(id!);
  const { localData, mergedData, save, reset } = useLocalPerson(id!, person);

  const handleBack = () => navigate(location.state?.from || '/');

  const handleSave = (data: LocalPersonData) => {
    save(data);
    triggerUpdate();
  };

  const handleReset = () => {
    reset();
    triggerUpdate();
  };

  if (isLoading) {
    return <Loader fullscreen message="Loading character details..." />;
  }

  if (error) {
    return (
      <Container size="sm" py="xl">
        <ErrorState
          title="Failed to load character"
          message="Could not fetch character details"
          onRetry={refetch}
        />
      </Container>
    );
  }

  if (!person) {
    return (
      <Container size="sm" py="xl">
        <ErrorState
          title="Character not found"
          message="The requested character does not exist"
        />
      </Container>
    );
  }

  const displayData = mergedData || person;

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Group justify="space-between">
          <Title order={1}>{displayData.name}</Title>
          <Button variant="subtle" onClick={handleBack}>
            Back to list
          </Button>
        </Group>

        <Paper shadow="xs" p="lg" withBorder>
          <Stack gap="md">
            <Title order={3}>Character Information</Title>

            <Stack gap="xs">
              {infoFields.map((field) => (
                <Group key={field.key}>
                  <Text fw={600}>{field.label}:</Text>
                  <Text>
                    {displayData[field.key as keyof typeof displayData]}
                    {field?.suffix}
                  </Text>
                </Group>
              ))}
            </Stack>
          </Stack>
        </Paper>

        <Divider />

        <Paper shadow="xs" p="lg" withBorder>
          <Stack gap="md">
            <Title order={3}>Edit Character</Title>
            <EditPersonForm
              person={person}
              localData={localData}
              onSave={handleSave}
              onReset={handleReset}
            />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export default PersonViewPage;
