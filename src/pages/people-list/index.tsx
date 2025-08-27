import { type FC, useState, useEffect, useRef } from 'react';
import {
  Container,
  Stack,
  Title,
  Pagination,
  Group,
  Text,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { usePeopleQuery } from '@entities/person';
import { PeopleGrid } from '@widgets/people-grid';
import { SearchInput } from '@features/search-person';
import { ErrorState, EmptyState } from '@shared/ui';
import { useUrlParams } from '@shared/lib';
import { SEARCH_DEBOUNCE_MS } from '@shared/config';

const PeopleListPage: FC = () => {
  const { params, setParams } = useUrlParams<{
    page: string;
    search: string;
  }>();

  const [searchValue, setSearchValue] = useState(params.search || '');
  const [debouncedSearch] = useDebouncedValue(searchValue, SEARCH_DEBOUNCE_MS);
  const isFirstRender = useRef(true);

  const currentPage = Number(params.page) || 1;

  const { data, isLoading, error, refetch } = usePeopleQuery({
    page: currentPage,
    search: debouncedSearch,
  });

  const handlePageChange = (page: number) => {
    setParams({ page: String(page), search: params.search });
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const totalPages = data ? Math.ceil(data.count / 10) : 0;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (debouncedSearch !== params.search) {
      setParams({
        page: debouncedSearch ? '1' : params.page || '1',
        search: debouncedSearch || undefined,
      });
    }
  }, [debouncedSearch]);

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Title order={1}>Star Wars Characters</Title>

        <SearchInput
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search characters..."
        />

        {error && (
          <ErrorState message="Failed to load characters" onRetry={refetch} />
        )}

        {data && data.results.length === 0 && (
          <EmptyState
            title="No characters found"
            message={
              debouncedSearch
                ? `No results for "${debouncedSearch}"`
                : 'No characters available'
            }
          />
        )}

        {isLoading && !data && <PeopleGrid people={[]} loading={true} />}

        {data && data.results.length > 0 && (
          <>
            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                Found {data.count} characters
              </Text>
            </Group>

            <PeopleGrid people={data.results} loading={false} />

            {totalPages > 1 && (
              <Group justify="center">
                <Pagination
                  total={totalPages}
                  value={currentPage}
                  onChange={handlePageChange}
                />
              </Group>
            )}
          </>
        )}
      </Stack>
    </Container>
  );
};

export default PeopleListPage;
