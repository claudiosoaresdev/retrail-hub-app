import React from 'react';
import { FlatList, FlatListProps, RefreshControl } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

import { usePaginatedList } from '../../hooks/usePaginatedList';

import { EmptyList, EmptyListProps } from '../EmptyList/EmptyList';
import { FooterList } from '../FooterList/FooterList';

type ItemTConstraints = { id: number | string };

type Props<ItemT extends ItemTConstraints, QueryT> = {
  queryKey: QueryT[];
  getList: Parameters<typeof usePaginatedList<ItemT>>[1];
  params?: Parameters<typeof usePaginatedList<ItemT>>[2];
  options?: Parameters<typeof usePaginatedList<ItemT>>[3];
  renderItem: FlatListProps<ItemT>['renderItem'];
  flatListProps?: Omit<Partial<FlatListProps<ItemT>>, 'renderItem'> & {
    numColumns?: number;
    columnWrapperStyle?: FlatListProps<ItemT>['columnWrapperStyle'];
  };
  emptyListProps?: Pick<EmptyListProps, 'emptyMessage' | 'errorMessage'>;
  renderRefreshControl?: React.ReactElement;
  renderEmptyContent?: React.ReactNode;
  renderActivityIndicator?: React.ReactElement;
  emptyMessage?: string;
  errorMessage?: string;
};

export function InfiniteScrollList<ItemT extends ItemTConstraints, QueryT>({
  emptyListProps,
  flatListProps,
  queryKey,
  getList,
  params,
  options,
  renderItem,
  renderRefreshControl,
  renderEmptyContent,
  renderActivityIndicator,
  emptyMessage,
  errorMessage,
}: Props<ItemT, QueryT>) {
  const flatListRef = React.useRef<FlatList<ItemT>>(null);

  const { list, isError, isLoading, refresh, fetchNextPage, hasNextPage } = usePaginatedList(
    [...queryKey],
    getList,
    params,
    options,
  );
  const keyExtractor = (item: ItemT): string => {
    return String(item.id);
  };

  useScrollToTop(flatListRef);

  const styles = {
    flex: list.length === 0 ? 1 : undefined,
  };

  const renderFooter = () => {
    if (!hasNextPage) return null;

    return <FooterList />;
  };

  return (
    <FlatList
      ref={flatListRef}
      keyExtractor={keyExtractor}
      data={list}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.1}
      refreshing={isLoading}
      refreshControl={
        renderRefreshControl ? (
          renderRefreshControl
        ) : (
          <RefreshControl refreshing={isLoading} onRefresh={refresh} />
        )
      }
      ListEmptyComponent={
        <EmptyList
          refresh={refresh}
          isLoading={isLoading}
          isError={isError}
          renderContent={renderEmptyContent}
          renderActivityIndicator={renderActivityIndicator}
          emptyMessage={emptyMessage}
          errorMessage={errorMessage}
          {...emptyListProps}
        />
      }
      ListFooterComponent={renderFooter}
      numColumns={flatListProps?.numColumns || 1}
      columnWrapperStyle={flatListProps?.columnWrapperStyle}
      {...flatListProps}
      contentContainerStyle={[styles, flatListProps?.contentContainerStyle]}
    />
  );
}