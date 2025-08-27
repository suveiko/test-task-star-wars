import type { FC } from 'react';
import { TextInput } from '@mantine/core';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search characters...',
}) => {
  return (
    <TextInput
      size="md"
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      styles={{
        input: {
          fontSize: '16px',
        },
      }}
    />
  );
};
