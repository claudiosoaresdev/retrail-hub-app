import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle';

import { Theme } from '../../../themes/theme';

const gradientVariants = createVariant<Theme, 'gradientVariants'>({
  themeKey: 'gradientVariants',
});

export type ImageOverlayProps = VariantProps<Theme, 'gradientVariants'> &
  React.ComponentProps<typeof LinearGradient>;

export const ImageOverlay = createRestyleComponent<ImageOverlayProps, Theme>(
  [gradientVariants],
  LinearGradient,
);
