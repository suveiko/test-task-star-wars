import type { FC } from 'react';
import { SimpleGrid } from '@mantine/core';
import type { Person } from '@entities/person';
import { PersonCard } from './PersonCard';
import { PersonCardSkeleton } from './PersonCardSkeleton';

type PeopleGridProps = {
  people: Person[];
  loading?: boolean;
};

export const PeopleGrid: FC<PeopleGridProps> = ({ people, loading }) => {
  if (loading) {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
        {Array.from({ length: 8 }).map((_, index) => (
          <PersonCardSkeleton key={index} />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
      {people.map((person) => (
        <PersonCard key={person.url} person={person} />
      ))}
    </SimpleGrid>
  );
};
