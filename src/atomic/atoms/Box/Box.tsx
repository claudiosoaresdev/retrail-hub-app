import {
  TouchableOpacity,
  TouchableOpacityProps as RNTouchableOpacityProps,
  Pressable,
  PressableProps as RNPressableProps,
} from 'react-native';
import Animated from 'react-native-reanimated';

import {
  createBox,
  createRestyleComponent,
  backgroundColor,
  BackgroundColorProps,
  spacing,
  SpacingProps,
  layout,
  LayoutProps,
  border,
  BorderProps,
  spacingShorthand,
  SpacingShorthandProps,
} from '@shopify/restyle';

import { Theme } from '../../../themes/theme';

export const Box = createBox<Theme>();
export type BoxProps = React.ComponentProps<typeof Box>;

type RestyleTypes = BackgroundColorProps<Theme> &
  SpacingProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme> &
  SpacingShorthandProps<Theme>;

export type TouchableOpacityBoxProps = RNTouchableOpacityProps & RestyleTypes;
export const TouchableOpacityBox = createRestyleComponent<
  TouchableOpacityBoxProps,
  Theme
>(
  [backgroundColor, spacing, spacingShorthand, layout, border],
  TouchableOpacity,
);

export type PressableBoxProps = RNPressableProps & RestyleTypes &
  RestyleTypes & {
    rippleColor?: string;
  };;
export const PressableBox = createRestyleComponent<PressableBoxProps, Theme>(
  [backgroundColor, spacing, spacingShorthand, layout, border],
  ({ rippleColor = 'rgba(0, 0, 0, 0.1)', ...props }) => (
    <Pressable
      {...props}
      android_ripple={{ color: rippleColor }}
      style={({ pressed }) => [
        props.style,
        pressed && { opacity: 0.75 },
      ]}
    />
  )
);

export const AnimatedBoxComponent = Animated.createAnimatedComponent(Box);
export type AnimatedBoxProps = Omit<
  React.ComponentProps<typeof AnimatedBoxComponent>,
  'key' | 'ref'
> &
  BackgroundColorProps<Theme> &
  SpacingProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme>;
export const AnimatedBox = createRestyleComponent<AnimatedBoxProps, Theme>(
  [backgroundColor, spacing, spacingShorthand, layout, border],
  AnimatedBoxComponent,
);

export const AnimatedTouchableOpacityBoxComponent =
  Animated.createAnimatedComponent(TouchableOpacityBox);
export type AniamtedTouchableOpacityBoxProps = Omit<
  React.ComponentProps<typeof AnimatedTouchableOpacityBoxComponent>,
  'key' | 'ref' | 'id'
> &
  BackgroundColorProps<Theme> &
  SpacingProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme>;
export const AniamtedTouchableOpacityBox = createRestyleComponent<
  AniamtedTouchableOpacityBoxProps,
  Theme
>(
  [backgroundColor, spacing, spacingShorthand, layout, border],
  AnimatedTouchableOpacityBoxComponent,
);
