import React from 'react';
import { Feather } from '@expo/vector-icons';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';

import { colors } from '../../../themes/colors';

import {
  TouchableOpacityBox,
  TouchableOpacityBoxProps,
} from '../../atoms/Box/Box';

interface IconButtonProps extends TouchableOpacityBoxProps {
  name: React.ComponentProps<typeof Feather>['name'];
  size?: number;
  color?: string;
  hasBorder?: boolean;
  hasPadding?: boolean;
}

export function IconButton({
  name,
  size = responsiveScreenFontSize(3),
  color = colors.palette.gray500,
  hasBorder,
  hasPadding,
  ...touchableOpacityBoxProps
}: IconButtonProps) {
  return (
    <TouchableOpacityBox
      justifyContent="center"
      alignItems="center"
      borderRadius={hasBorder ? 's12' : undefined}
      borderWidth={hasBorder ? responsiveScreenFontSize(0.125) : undefined}
      borderColor={hasBorder ? 'gray300' : undefined}
      padding={hasPadding ? 's8' : undefined}
      {...touchableOpacityBoxProps}>
      <Feather name={name} color={color} size={size} />
    </TouchableOpacityBox>
  );
}
