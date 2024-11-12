import React from 'react';
import {
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';

import { useAppTheme } from '../../../hooks/useAppTheme';
import { AnimatedBox, AnimatedBoxProps, Box } from '../../atoms/Box/Box';
import { ImageBackground } from '../../atoms/ImageBackground/ImageBackground';
import { ImageOverlay } from '../../atoms/ImageOverlay/ImageOverlay';

type AnimatedHeaderProps = AnimatedBoxProps & {
  scrollY: SharedValue<number>;
  headerHeight: number;
  collapsedHeight: number;
  imageUrl?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  children?: React.ReactNode;
  title?: React.ReactNode;
};

const minWidth = responsiveScreenFontSize(3);

export function AnimatedHeader({
  imageUrl,
  headerHeight,
  collapsedHeight,
  scrollY,
  leftComponent,
  rightComponent,
  children,
  title,
  ...rest
}: AnimatedHeaderProps) {
  const { colors } = useAppTheme();

  const source = imageUrl ? { uri: imageUrl } : require('../../../../assets/images/default.jpg');

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, headerHeight - collapsedHeight],
      [headerHeight, collapsedHeight],
      'clamp',
    );

    const backgroundColor = interpolateColor(
      scrollY.value,
      [0, headerHeight - collapsedHeight],
      [colors.background, colors.primary]
    );

    return {
      height,
      backgroundColor,
    };
  });

  const animatedImageStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, headerHeight - collapsedHeight / 2],
      [1, 0],
      'clamp',
    );

    return {
      opacity,
    };
  });

  const animatedHeaderTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, headerHeight - collapsedHeight],
      [0, 1],
      'clamp',
    );

    return {
      opacity,
    };
  });

  const animatedTitleContainerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, headerHeight - collapsedHeight / 2],
      [1, 0],
      'clamp',
    );

    return {
      opacity,
    };
  });

  const paddingLeft = leftComponent ? 's20' : 's46';
  const paddingRight = rightComponent ? 's20' : 's46';

  return (
    <AnimatedBox
      position="absolute"
      top={0}
      left={0}
      right={0}
      zIndex={1}
      {...rest}
      style={animatedHeaderStyle}>
      <AnimatedBox
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        style={animatedImageStyle}>
        <ImageBackground variant="cover" source={source}>
          <ImageOverlay
            variant="cover"
            colors={['transparent', colors.background || 'transparent']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 0, y: 0.85 }}
          />
          <AnimatedBox style={animatedTitleContainerStyle}>
            {children}
          </AnimatedBox>
        </ImageBackground>
      </AnimatedBox>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        position="absolute"
        top={0}
        zIndex={2}
        paddingTop="s32"
        paddingLeft={paddingLeft}
        paddingRight={paddingRight}
      >
        {leftComponent && (
          <Box
            flexWrap="nowrap"
            minWidth={minWidth}
            justifyContent="center"
            alignItems="center">
            {leftComponent}
          </Box>
        )}
        <AnimatedBox
          flex={1}
          justifyContent="center"
          alignItems="center"
          style={animatedHeaderTextStyle}>
          {title}
        </AnimatedBox>
        {rightComponent && (
          <Box
            flexWrap="nowrap"
            minWidth={minWidth}
            justifyContent="center"
            alignItems="center">
            {rightComponent}
          </Box>
        )}
      </Box>
    </AnimatedBox>
  );
}
