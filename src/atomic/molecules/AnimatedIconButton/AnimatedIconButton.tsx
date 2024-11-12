import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import Animated, { AnimatedStyle } from 'react-native-reanimated';

import {
  TouchableOpacityBox,
  TouchableOpacityBoxProps,
  AniamtedTouchableOpacityBox,
  AniamtedTouchableOpacityBoxProps,
} from '../../atoms/Box/Box';
import { colors } from '../../../themes/colors';

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

interface AniamtedIconButtonProps extends AniamtedTouchableOpacityBoxProps {
  name: React.ComponentProps<typeof Feather>['name'];
  size?: number;
  color?: string;
  hasBorder?: boolean;
  hasPadding?: boolean;
  iconStyle?: StyleProp<AnimatedStyle<StyleProp<TextStyle>>>;
}

const AnimatedFeather = Animated.createAnimatedComponent(Feather);

export function AnimatedIconButton({
  name,
  size = responsiveScreenFontSize(3),
  color = colors.palette.gray500,
  hasBorder,
  hasPadding,
  iconStyle,
  ...animatedTouchableOpacityBoxProps
}: AniamtedIconButtonProps) {
  return (
    <AniamtedTouchableOpacityBox
      justifyContent="center"
      alignItems="center"
      borderRadius={hasBorder ? 's12' : undefined}
      borderWidth={hasBorder ? responsiveScreenFontSize(0.125) : undefined}
      borderColor={hasBorder ? 'gray300' : undefined}
      padding={hasPadding ? 's8' : undefined}
      {...animatedTouchableOpacityBoxProps}>
      <AnimatedFeather
        name={name}
        color={color}
        size={size}
        style={iconStyle}
      />
    </AniamtedTouchableOpacityBox>
  );
}
