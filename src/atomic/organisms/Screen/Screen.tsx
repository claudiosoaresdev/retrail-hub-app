import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { Box, BoxProps } from '../../atoms/Box/Box';

import { useAppSafeArea } from '../../../hooks/useAppSafeArea';
import { useAppTheme } from '../../../hooks/useAppTheme';

import { ScrollViewContainer, ViewContainer } from './ScreenContainer';
import { IconGoBackSettings, ScreenHeader } from './ScreenHeader';
import { TextProps } from '../../atoms/Text/Text';

export interface ScreenProps extends BoxProps {
  children: React.ReactNode;
  HeaderComponent?: React.ReactNode;
  RightComponent?: React.ReactNode;
  LeftComponent?: React.ReactNode;
  canGoBack?: boolean;
  scrollable?: boolean;
  title?: string;
  noPaddingTop?: boolean;
  noPaddingHorizontal?: boolean;
  noPaddingBottom?: boolean;
  hasKeyboardDismiss?: boolean;
  iconGoBackSettings?: IconGoBackSettings;
  headerProps?: BoxProps;
  titleHeaderProps?: TextProps;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export function Screen({
  children,
  canGoBack = false,
  scrollable = false,
  noPaddingTop = false,
  noPaddingHorizontal = false,
  noPaddingBottom = false,
  hasKeyboardDismiss = false,
  style,
  title,
  HeaderComponent,
  RightComponent,
  LeftComponent,
  iconGoBackSettings,
  headerProps,
  titleHeaderProps,
  ...boxProps
}: ScreenProps) {
  const { bottom, top } = useAppSafeArea();
  const { colors } = useAppTheme();

  const handleKeyboardDismissPress = () => Keyboard.dismiss();

  const Container = scrollable ? ScrollViewContainer : ViewContainer;

  return (
    <TouchableWithoutFeedback
      onPress={handleKeyboardDismissPress}
      disabled={!hasKeyboardDismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Container backgroundColor={colors.background}>
          <Box
            paddingHorizontal={noPaddingHorizontal ? undefined : 's24'}
            style={[
              {
                paddingTop: noPaddingTop ? undefined : top,
                paddingBottom: noPaddingBottom ? undefined : bottom,
              },
              styles.container,
              style,
            ]}
            {...boxProps}>
            <ScreenHeader
              paddingHorizontal={noPaddingHorizontal ? 's24' : undefined}
              HeaderComponent={HeaderComponent}
              RightComponent={RightComponent}
              LeftComponent={LeftComponent}
              canGoBack={canGoBack}
              title={title}
              iconGoBackSettings={iconGoBackSettings}
              titleHeaderProps={titleHeaderProps}
              {...headerProps}
            />
            {children}
          </Box>
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
