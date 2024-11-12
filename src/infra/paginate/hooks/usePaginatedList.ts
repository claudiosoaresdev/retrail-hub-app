import { useEffect, useState } from 'react';
import {
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';

import { Page } from '../paginateTypes';

interface UsePaginatedListResult<TData> {
  list: TData[];
  isError: boolean | null;
  isLoading: boolean;
  refresh: () => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

interface PaginatedListOptions {
  enabled?: boolean;
  staleTime?: number;
}

interface GetListProps {
  page: number;
  params?: Record<string, any>;
}

export function usePaginatedList<Data>(
  queryKey: readonly unknown[],
  getList: ({ page, params }: GetListProps) => Promise<Page<Data>>,
  params?: Record<string, any>,
  options?: PaginatedListOptions,
): UsePaginatedListResult<Data> {
  const [list, setList] = useState<Data[]>([]);

  const query = useInfiniteQuery<
    Page<Data>,
    Error,
    {
      pages: Page<Data>[];
    },
    QueryKey
  >({
    queryKey: [...queryKey, params],
    queryFn: async ({
      pageParam = 1,
    }: QueryFunctionContext<QueryKey, unknown>) => {
      const page = typeof pageParam === 'number' ? pageParam : 1;

      return getList({ page, params });
    },
    getNextPageParam: ({ meta }) =>
      meta.hasNextPage ? meta.currentPage + 1 : undefined,
    initialPageParam: 1,
    enabled: options?.enabled,
    staleTime: options?.staleTime,
  });

  useEffect(() => {
    if (query.data) {
      const newList = query.data.pages.reduce<Data[]>((prev, curr) => {
        return [...prev, ...curr.data];
      }, []);

      setList(newList);
    }
  }, [query.data, query.isFetching]);

  const refresh = () => {
    setList([]);
    query.refetch();
  };

  return {
    list,
    isError: query.isError,
    isLoading: query.isLoading,
    refresh,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: !!query.hasNextPage,
  };
}