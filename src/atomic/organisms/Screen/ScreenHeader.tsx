import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import { useAppTheme } from '../../../hooks/useAppTheme';

import { Box, BoxProps } from '../../atoms/Box/Box';
import { Text, TextProps } from '../../atoms/Text/Text';
import { IconButton } from '../../molecules/IconButton/IconButton';
import { ScreenProps } from './Screen';

const ICON_SIZE = responsiveFontSize(3);

export type IconGoBackSettings = {
  color?: string;
  hasPadding?: boolean;
  hasBorder?: boolean;
};

type ScreenHeaderProps = Pick<
  ScreenProps,
  'title' | 'canGoBack' | 'HeaderComponent' | 'RightComponent' | 'LeftComponent'
> &
  BoxProps & {
    iconGoBackSettings?: IconGoBackSettings;
    titleHeaderProps?: TextProps;
  };

export function ScreenHeader({
  canGoBack,
  title,
  HeaderComponent,
  RightComponent,
  LeftComponent,
  iconGoBackSettings,
  titleHeaderProps,

  ...boxProps
}: ScreenHeaderProps) {
  const { colors } = useAppTheme();
  const navigation = useNavigation();

  if (!title && !canGoBack && !HeaderComponent && !RightComponent && !LeftComponent) {
    return null;
  }

  const showBackLabel = !title && !HeaderComponent;

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      minHeight={56}

      {...boxProps}>
      {canGoBack && (
        <Box
          flexDirection="row"
          alignItems="center"
          mr={showBackLabel ? 's10' : undefined}>
          <IconButton
            name="chevron-left"
            size={ICON_SIZE}
            color={iconGoBackSettings?.color || colors.gray900}
            onPress={navigation.goBack}
            hasBorder={iconGoBackSettings?.hasBorder}
            hasPadding={iconGoBackSettings?.hasPadding}
          />
          {showBackLabel && (
            <Text variant='bodyMedium' semiBold ml="s8" {...titleHeaderProps}>
              Voltar
            </Text>
          )}
        </Box>
      )}
      {LeftComponent}
      {HeaderComponent}
      {title && (
        <Box flex={1} alignItems='center'>
          <Text variant="bodyMedium" {...titleHeaderProps}>{title}</Text>
        </Box>
      )}
      {title && !RightComponent && <Box backgroundColor="background" width={ICON_SIZE} />}
      {RightComponent}
    </Box>
  );
}
