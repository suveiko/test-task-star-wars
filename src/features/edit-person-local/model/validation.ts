import type { LocalPersonData } from '@entities/person';

export const personFormValidation = {
  name: (value: Optional<string>) => {
    if (!value?.trim()) {
      return 'Name is required';
    }
    if (value.length > 100) {
      return 'Name is too long';
    }
    return null;
  },

  height: (value: Optional<string>) => {
    if (!value?.trim()) {
      return null;
    }

    const validSpecialValues = ['unknown', 'n/a', 'none'];
    if (validSpecialValues.includes(value.toLowerCase())) {
      return null;
    }

    const numValue = Number(value);
    if (Number.isNaN(numValue)) {
      return 'Height must be a number or "unknown", "n/a", "none"';
    }

    if (numValue < 0 || numValue > 500) {
      return 'Height must be between 0 and 500';
    }

    return null;
  },

  mass: (value: Optional<string>) => {
    if (!value?.trim()) {
      return null;
    }

    const validSpecialValues = ['unknown', 'n/a', 'none'];
    if (validSpecialValues.includes(value.toLowerCase())) {
      return null;
    }

    const cleanValue = value.replaceAll(',', '');
    const numValue = Number(cleanValue);

    if (Number.isNaN(numValue)) {
      return 'Mass must be a number or "unknown", "n/a", "none"';
    }

    if (numValue < 0 || numValue > 10_000) {
      return 'Mass must be between 0 and 10000';
    }

    return null;
  },

  gender: (value: Optional<string>) => {
    if (!value?.trim()) {
      return null;
    }

    const validGenders = ['male', 'female', 'n/a'];
    if (!validGenders.includes(value.toLowerCase())) {
      return 'Gender must be "male", "female", or "n/a"';
    }

    return null;
  },

  birth_year: (value: Optional<string>) => {
    if (!value?.trim()) {
      return null;
    }

    if (value === 'unknown') {
      return null;
    }

    const pattern = /^\d+(\.\d+)?(bby|aby)$/i;

    if (!pattern.test(value)) {
      return 'Birth year must be in format like "19BBY" or "41.9BBY"';
    }

    return null;
  },
} as const;

type ValidationRules = typeof personFormValidation;

export const getFormValidation = (): Partial<
  Record<keyof LocalPersonData, ValidationRules[keyof ValidationRules]>
> => {
  return personFormValidation;
};
