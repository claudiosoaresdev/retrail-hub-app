import React from 'react';
import { createText } from '@shopify/restyle';

import { Theme } from '../../../themes/theme';
import Animated from 'react-native-reanimated';

const SRText = createText<Theme>();
const AnimatedSRText = Animated.createAnimatedComponent(SRText);

type SRTextProps = React.ComponentProps<typeof SRText>;

type TextVariants =
  | 'displayLarge'
  | 'displayMedium'
  | 'displaySmall'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall';

export const $fontFamily = {
  bold: 'Poppins-Bold',
  medium: 'Poppins-Medium',
  regular: 'Poppins-Regular',
};

function getFontFamily(
  variant: TextVariants,
  bold?: boolean,
  semiBold?: boolean,
) {
  if (variant.startsWith('display') || variant.startsWith('headline')) {
    return $fontFamily.bold;
  }

  if (bold) return $fontFamily.bold;
  if (semiBold) return $fontFamily.medium;
  return $fontFamily.regular;
}

export interface TextProps extends SRTextProps {
  variant?: TextVariants;
  bold?: boolean;
  semiBold?: boolean;
}

export function Text({
  children,
  variant = 'bodyMedium',
  bold,
  semiBold,
  style,
  ...sRTextProps
}: TextProps) {
  const fontFamily = getFontFamily(variant, bold, semiBold);

  return (
    <SRText
      color="onBackground"
      variant={variant}
      style={[{ fontFamily }, style]}
      {...sRTextProps}>
      {children}
    </SRText>
  );
}

export function AnimatedText({
  children,
  variant = 'bodyMedium',
  bold,
  semiBold,
  style,
  ...animatedTextProps
}: TextProps) {
  const fontFamily = getFontFamily(variant, bold, semiBold);

  return (
    <AnimatedSRText
      color="onBackground"
      variant={variant}
      style={[{ fontFamily }, style]}
      {...animatedTextProps}>
      {children}
    </AnimatedSRText>
  );
}