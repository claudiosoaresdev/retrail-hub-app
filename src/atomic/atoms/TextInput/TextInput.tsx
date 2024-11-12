import React, { useEffect, useState } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
} from 'react-native';

import { useAppTheme } from '../../../hooks/useAppTheme';
import { colors } from '../../../themes/colors';

import { Box, BoxProps } from '../Box/Box';
import { $fontFamily, Text } from '../Text/Text';

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  errorMessage?: string;
  RightComponent?: React.ReactElement;
  LeftComponent?: React.ReactElement;
  boxProps?: BoxProps;
  containerProps?: BoxProps;
  hasBorder?: boolean;
}

const TextInputBase: React.ForwardRefRenderFunction<
  RNTextInput,
  TextInputProps
> = (
  {
    label,
    errorMessage,
    RightComponent,
    LeftComponent,
    boxProps,
    containerProps,
    value,
    hasBorder = false,
    ...rnTextInputProps
  },
  ref,
) => {
    const theme = useAppTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const $textInputContainer: BoxProps = {
      flexDirection: 'row',
      borderWidth: hasBorder ? (errorMessage ? 2 : 1) : 0,
      borderColor: hasBorder
        ? errorMessage
          ? 'error'
          : isFocused
            ? 'primary'
            : 'gray300'
        : 'transparent',

      padding: 's12',
      borderRadius: 's10',
    };

    const handleInputFocus = () => {
      setIsFocused(true);
    };

    const handleInputBlur = () => {
      setIsFocused(false);

      setIsFilled(!!value);
    };

    useEffect(() => {
      setIsFilled(!!value);
    }, [value]);

    return (
      <Box {...boxProps}>
        {label && (
          <Text variant="labelMedium" color="primary" semiBold marginBottom="s4">
            {label}
          </Text>
        )}
        <Box
          {...$textInputContainer}
          {...containerProps}
          backgroundColor="gray50"
          borderBottomColor={
            isFocused || isFilled
              ? 'primary'
              : $textInputContainer.borderBottomColor
          }>
          {LeftComponent && (
            <Box justifyContent="center" mr="s16">
              {LeftComponent}
            </Box>
          )}
          <RNTextInput
            autoCapitalize="none"
            placeholderTextColor={theme.colors.gray200}
            ref={ref}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            value={value}
            style={$textInputStyle}
            {...rnTextInputProps}
          />
          {RightComponent && (
            <Box justifyContent="center" ml="s16">
              {RightComponent}
            </Box>
          )}
        </Box>
        {errorMessage && (
          <Text color="error" variant="bodySmall" bold>
            {errorMessage}
          </Text>
        )}
      </Box>
    );
  };

export const $textInputStyle: TextStyle = {
  padding: 0,
  flexGrow: 1,
  flexShrink: 1,
  color: colors.palette.gray900,
  fontFamily: $fontFamily.regular,
};

export const TextInput = React.forwardRef(TextInputBase);
