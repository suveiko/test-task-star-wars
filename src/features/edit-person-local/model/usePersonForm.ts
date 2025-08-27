import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import type { Person, LocalPersonData } from '@entities/person';
import { getFormValidation } from './validation';

type UsePersonFormProps = {
  person: Person;
  localData: Nullable<LocalPersonData>;
  onSave: (data: LocalPersonData) => void;
  onReset: () => void;
};

export const usePersonForm = ({
  person,
  localData,
  onSave,
  onReset,
}: UsePersonFormProps) => {
  const form = useForm<LocalPersonData>({
    mode: 'controlled',
    initialValues: {
      name: person.name,
      height: person.height,
      mass: person.mass,
      gender: person.gender,
      birth_year: person.birth_year,
    },
    validate: getFormValidation(),
    validateInputOnBlur: true,
  });

  const handleSubmit = (values: LocalPersonData) => {
    const changes: LocalPersonData = {};

    for (const [key, value] of Object.entries(values)) {
      const personKey = key as keyof LocalPersonData;
      if (value !== person[personKey]) {
        changes[personKey] = value;
      }
    }

    if (Object.keys(changes).length > 0) {
      onSave(changes);
      form.resetDirty();
    }
  };

  const handleReset = () => {
    form.setValues({
      name: person.name,
      height: person.height,
      mass: person.mass,
      gender: person.gender,
      birth_year: person.birth_year,
    });
    form.resetDirty();
    onReset();
  };

  const values = form.getValues();
  const hasChanges = Object.entries(values).some(
    ([key, value]) => value !== person[key as keyof LocalPersonData],
  );

  useEffect(() => {
    form.setValues({
      name: localData?.name ?? person.name,
      height: localData?.height ?? person.height,
      mass: localData?.mass ?? person.mass,
      gender: localData?.gender ?? person.gender,
      birth_year: localData?.birth_year ?? person.birth_year,
    });
    form.resetDirty();
  }, [localData, person.url]);

  return {
    form,
    handleSubmit: form.onSubmit(handleSubmit),
    handleReset,
    hasChanges,
    isDirty: form.isDirty(),
  };
};
