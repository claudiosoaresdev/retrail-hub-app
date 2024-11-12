import { createTheme } from '@shopify/restyle';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import { ViewStyle } from 'react-native/types';

import { colors } from './colors';

export const $fontFamily = {
  bold: 'Poppins-Bold',
  medium: 'Poppins-Medium',
  regular: 'Poppins-Regular',
};

export const theme = createTheme({
  colors: colors.lightTheme,
  spacing: {
    s0: 0,
    s1: responsiveScreenFontSize(0.125),
    s2: responsiveScreenFontSize(0.25),
    s4: responsiveScreenFontSize(0.5),
    s8: responsiveScreenFontSize(1),
    s10: responsiveScreenFontSize(1.25),
    s12: responsiveScreenFontSize(1.5),
    s14: responsiveScreenFontSize(1.75),
    s16: responsiveScreenFontSize(2),
    s20: responsiveScreenFontSize(2.5),
    s24: responsiveScreenFontSize(3),
    s32: responsiveScreenFontSize(4),
    s40: responsiveScreenFontSize(5),
    s46: responsiveScreenFontSize(5.75),
    s48: responsiveScreenFontSize(6),
    s56: responsiveScreenFontSize(7),
    s64: responsiveScreenFontSize(8),
  },

  borderRadii: {
    s8: responsiveScreenFontSize(1),
    s10: responsiveScreenFontSize(1.5),
    s12: responsiveScreenFontSize(1.25),
    s16: responsiveScreenFontSize(2),
    full: 9999,
  },

  textVariants: {
    defaults: {
      fontFamily: $fontFamily.regular,
      color: 'text',
    },

    // Display (grandes títulos de destaque)
    displayLarge: {
      fontFamily: $fontFamily.bold,
      fontSize: responsiveScreenFontSize(5.625), // 45
      lineHeight: responsiveScreenFontSize(6.75), // 54
      color: 'text',
    },
    displayMedium: {
      fontFamily: $fontFamily.bold,
      fontSize: responsiveScreenFontSize(4.5), // 36
      lineHeight: responsiveScreenFontSize(5.4), // 43.2
      color: 'text',
    },
    displaySmall: {
      fontFamily: $fontFamily.bold,
      fontSize: responsiveScreenFontSize(3.75), // 30
      lineHeight: responsiveScreenFontSize(4.5), // 36
      color: 'text',
    },

    // Headline (subtítulos e títulos menores)
    headlineLarge: {
      fontFamily: $fontFamily.bold,
      fontSize: responsiveScreenFontSize(3.125), // 25
      lineHeight: responsiveScreenFontSize(3.75), // 30
      color: 'text',
    },
    headlineMedium: {
      fontFamily: $fontFamily.bold,
      fontSize: responsiveScreenFontSize(2.75), // 22
      lineHeight: responsiveScreenFontSize(3.3), // 26.4
      color: 'text',
    },
    headlineSmall: {
      fontFamily: $fontFamily.bold,
      fontSize: responsiveScreenFontSize(2.25), // 18
      lineHeight: responsiveScreenFontSize(2.8), // 22.4
      color: 'text',
    },

    // Title (títulos de seções ou cards)
    titleLarge: {
      fontFamily: $fontFamily.medium,
      fontSize: responsiveScreenFontSize(2.5), // 20
      lineHeight: responsiveScreenFontSize(3.2), // 25.6
      color: 'text',
    },
    titleMedium: {
      fontFamily: $fontFamily.medium,
      fontSize: responsiveScreenFontSize(2.25), // 18
      lineHeight: responsiveScreenFontSize(2.8), // 22.4
      color: 'text',
    },
    titleSmall: {
      fontFamily: $fontFamily.medium,
      fontSize: responsiveScreenFontSize(2), // 16
      lineHeight: responsiveScreenFontSize(2.4), // 19.2
      color: 'text',
    },

    // Body (textos principais dos parágrafos)
    bodyLarge: {
      fontFamily: $fontFamily.regular,
      fontSize: responsiveScreenFontSize(2.25), // 18
      lineHeight: responsiveScreenFontSize(2.8), // 22.4
      color: 'text',
    },
    bodyMedium: {
      fontFamily: $fontFamily.regular,
      fontSize: responsiveScreenFontSize(2), // 16
      lineHeight: responsiveScreenFontSize(2.4), // 19.2
      color: 'text',
    },
    bodySmall: {
      fontFamily: $fontFamily.regular,
      fontSize: responsiveScreenFontSize(1.75), // 14
      lineHeight: responsiveScreenFontSize(2.1), // 16.8
      color: 'text',
    },

    // Label (textos menores, como botões ou tags)
    labelLarge: {
      fontFamily: $fontFamily.medium,
      fontSize: responsiveScreenFontSize(1.75), // 14
      lineHeight: responsiveScreenFontSize(2.1), // 16.8
      color: 'text',
    },
    labelMedium: {
      fontFamily: $fontFamily.medium,
      fontSize: responsiveScreenFontSize(1.5), // 12
      lineHeight: responsiveScreenFontSize(1.75), // 14
      color: 'text',
    },
    labelSmall: {
      fontFamily: $fontFamily.medium,
      fontSize: responsiveScreenFontSize(1.25), // 10
      lineHeight: responsiveScreenFontSize(1.5), // 12
      color: 'text',
    },
  },

  aspectRatios: {
    square: 1,
    landscape: 16 / 9,
    portrait: 9 / 16,
  },

  imageVariants: {
    product: {
      width: '100%',
      height: 120,
      borderRadius: 's8',
    },
    smallProduct: {
      width: responsiveScreenFontSize(5),
      height: responsiveScreenFontSize(5),
      borderRadius: 's8',
    },
    largeProduct: {
      width: '100%',
      height: 120,
      borderRadius: 's8',
    },
  },

  imageBackgroundVariants: {
    cover: {
      flex: 1,
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    },
  },

  gradientVariants: {
    cover: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },
  }
});

export const darkTheme = {
  ...theme,
  colors: colors.darkTheme,
};

export const $shadowProps: ViewStyle = {
  elevation: 10,
  shadowColor: '#d1d5db',
  shadowOpacity: 0.05,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: -3 },
};

export type Theme = typeof theme;
export type ThemeColors = keyof Theme['colors'];