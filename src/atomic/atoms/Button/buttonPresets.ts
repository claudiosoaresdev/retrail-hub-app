import { ThemeColors } from "../../../themes/theme";

import { TouchableOpacityBoxProps } from "../Box/Box";
import { TextProps } from "../Text/Text";

import { ButtonPreset } from "./Button";

interface ButtonUI {
  container: TouchableOpacityBoxProps;
  content: { color: ThemeColors; textProps?: TextProps };
}

export const buttonPresets: Record<
  ButtonPreset,
  {
    default: ButtonUI;
    disabled: ButtonUI;
  }
> = {
  primary: {
    default: {
      container: {
        backgroundColor: 'primary',
      },
      content: { color: 'onPrimary' },
    },
    disabled: {
      container: {
        backgroundColor: 'gray400',
      },
      content: { color: 'onPrimary' },
    },
  },
  outline: {
    default: {
      container: {
        borderWidth: 1,
        borderColor: 'primary',
      },
      content: { color: 'primary' },
    },
    disabled: {
      container: {
        borderWidth: 1,
        borderColor: 'gray400',
      },
      content: { color: 'gray400' },
    },
  },
  ghost: {
    default: {
      container: {
        backgroundColor: 'transparent',
        height: 40,
      },
      content: {
        color: 'primary',
        textProps: {
          variant: 'bodyMedium',
          bold: false,
        },
      },
    },
    disabled: {
      container: {
        backgroundColor: 'gray400',
        height: 40,
      },
      content: { color: 'gray400' },
    },
  },
};
