import React from 'react';
import { ImageBackground as RNImageBackground } from 'react-native';
import {
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle';

import { Theme } from '../../../themes/theme';

const imageBackgroundVariants = createVariant<Theme, 'imageBackgroundVariants'>(
  {
    themeKey: 'imageBackgroundVariants',
  },
);

export type ImageBackgroundProps = VariantProps<
  Theme,
  'imageBackgroundVariants'
> &
  React.ComponentProps<typeof RNImageBackground>;

export const ImageBackground = createRestyleComponent<
  ImageBackgroundProps,
  Theme
>([imageBackgroundVariants], RNImageBackground);

export const ImageBackgroundCover = (props: ImageBackgroundProps) => (
  <ImageBackground {...props} style={[props.style]} resizeMode="cover" />
);
