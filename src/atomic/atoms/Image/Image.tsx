import { Image as RNImage, ImageProps as RNImageProps } from 'react-native';
import {
  createVariant,
  VariantProps,
  createRestyleComponent,
  createRestyleFunction,
  AllProps,
  RestyleFunctionContainer,
} from '@shopify/restyle';

import { Theme } from '../../../themes/theme';

const imageVariants = createVariant<Theme, 'imageVariants'>({
  themeKey: 'imageVariants',
});

const aspectRatio = createRestyleFunction({
  property: 'aspectRatio',
  themeKey: 'aspectRatios',
});

export type ImageProps = VariantProps<Theme, 'imageVariants'> &
  RNImageProps &
  AllProps<Theme>;

const restyleFunctions: RestyleFunctionContainer<ImageProps, Theme>[] = [
  imageVariants,
  aspectRatio,
];

export const Image = createRestyleComponent<ImageProps, Theme>(
  restyleFunctions,
  RNImage,
);
