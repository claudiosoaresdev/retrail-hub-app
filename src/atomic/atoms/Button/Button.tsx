import React from 'react';

import { TouchableOpacityBox, TouchableOpacityBoxProps } from '../Box/Box';
import { Text } from '../Text/Text';

import { buttonPresets } from './buttonPresets';
import { ActivityIndicator } from '../ActivityIndicator/ActivityIndicator';

export type ButtonPreset = 'primary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends TouchableOpacityBoxProps {
  title: string;
  loading?: boolean;
  preset?: ButtonPreset;
  size?: ButtonSize;
  disabled?: boolean;
}

const buttonSizes: Record<ButtonSize, TouchableOpacityBoxProps> = {
  sm: {
    paddingVertical: 's8',
    paddingHorizontal: 's16',
  },
  md: {
    paddingVertical: 's12',
    paddingHorizontal: 's20',
  },
  lg: {
    paddingVertical: 's16',
    paddingHorizontal: 's24',
  },
};

export function Button({
  title,
  loading,
  preset = 'primary',
  size = 'md',
  disabled,
  ...touchableOpacityBoxProps
}: ButtonProps) {
  const buttonPreset = buttonPresets[preset][disabled ? 'disabled' : 'default'];
  const buttonSize = buttonSizes[size];

  return (
    <TouchableOpacityBox
      testID="button"
      disabled={disabled || loading}
      alignItems="center"
      justifyContent="center"
      borderRadius="full"
      {...buttonPreset.container}
      {...buttonSize}
      {...touchableOpacityBoxProps}>
      {loading ? (
        <ActivityIndicator color={buttonPreset.content.color} />
      ) : (
        <Text
          variant="bodyMedium"
          semiBold
          color={buttonPreset.content.color}
          {...buttonPreset.content.textProps}>
          {title}
        </Text>
      )}
    </TouchableOpacityBox>
  );
}
