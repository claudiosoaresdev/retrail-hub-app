import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

interface Props {
  children: React.ReactNode;
  backgroundColor: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export function ScrollViewContainer({ children, backgroundColor }: Props) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={[styles.container, { backgroundColor }]}>
      {children}
    </ScrollView>
  );
}

export function ViewContainer({ children, backgroundColor }: Props) {
  return (
    <View style={[styles.container, { backgroundColor }]}>{children}</View>
  );
}
