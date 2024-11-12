import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export interface EmptyListProps {
  isLoading?: boolean;
  isError: unknown;
  refresh: () => void;
  emptyMessage?: string;
  errorMessage?: string;
  renderContent?: React.ReactNode;
  renderActivityIndicator?: React.ReactElement;
}

export function EmptyList({
  isLoading,
  isError,
  refresh,
  emptyMessage = 'Não há publicações no seu feed',
  errorMessage = 'Não foi possível carregar o feed',
  renderContent,
  renderActivityIndicator,
}: EmptyListProps) {
  let component = <Text style={styles.emptyMessage}>{emptyMessage}</Text>;

  if (isLoading) {
    component = renderActivityIndicator ? (
      renderActivityIndicator
    ) : (
      <ActivityIndicator style={styles.activityIndicator} />
    );
  }

  if (isError) {
    component = (
      <>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TouchableOpacity style={styles.reloadButton} onPress={refresh}>
          <Text style={styles.reloadButtonText}>Recarregar</Text>
        </TouchableOpacity>
      </>
    );
  }

  return (
    <>
      {renderContent ? (
        renderContent
      ) : (
        <View style={styles.container}>{component}</View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {},
  emptyMessage: {},
  errorMessage: {},
  reloadButton: {},
  reloadButtonText: {},
});