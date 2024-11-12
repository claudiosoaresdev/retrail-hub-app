import React from 'react';
import { Feather } from '@expo/vector-icons';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';

import { colors } from '../../../themes/colors';

import { PressableBox, PressableBoxProps } from '../Box/Box';

interface IconProps extends PressableBoxProps {
  name: React.ComponentProps<typeof Feather>['name'];
  size?: number;
  color?: string;
}

export function Icon({
  name,
  size = responsiveScreenFontSize(3),
  color = colors.palette.gray400,
  ...pressableProps
}: IconProps) {
  return (
    <PressableBox p="s8" {...pressableProps}>
      <Feather name={name} size={size} color={color} />
    </PressableBox>
  );
}