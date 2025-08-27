import type { FC } from 'react';
import { TextInput, Button, Stack, Group, Badge } from '@mantine/core';
import type { Person, LocalPersonData } from '@entities/person';
import { usePersonForm } from '../model';

type EditPersonFormProps = {
  person: Person;
  localData: Nullable<LocalPersonData>;
  onSave: (data: LocalPersonData) => void;
  onReset: () => void;
};

const formFields = [
  { key: 'name' as const, label: 'Name' },
  { key: 'height' as const, label: 'Height' },
  { key: 'mass' as const, label: 'Mass' },
  { key: 'gender' as const, label: 'Gender' },
  { key: 'birth_year' as const, label: 'Birth Year' },
];

export const EditPersonForm: FC<EditPersonFormProps> = ({
  person,
  localData,
  onSave,
  onReset,
}) => {
  const { form, handleSubmit, handleReset, hasChanges } = usePersonForm({
    person,
    localData,
    onSave,
    onReset,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        {localData && (
          <Badge color="yellow" variant="light">
            Has local edits
          </Badge>
        )}

        {formFields.map(({ key, label }) => (
          <TextInput
            key={form.key(key)}
            label={label}
            {...form.getInputProps(key)}
          />
        ))}

        <Group>
          <Button type="submit" disabled={!hasChanges}>
            Save Locally
          </Button>

          {localData && (
            <Button
              type="button"
              variant="light"
              color="red"
              onClick={handleReset}
            >
              Reset Changes
            </Button>
          )}
        </Group>
      </Stack>
    </form>
  );
};
