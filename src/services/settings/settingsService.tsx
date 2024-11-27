import {
  Appearance,
  ColorSchemeName,
  Platform,
  StatusBar,
  StatusBarProps,
} from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

import { colors } from '../../themes/colors';

import { AppColorScheme, ThemePreference } from './settingsTypes';

function onChangeThemePreference(
  themePreference: ThemePreference,
): AppColorScheme {
  if (themePreference === 'system') {
    const colorScheme = Appearance.getColorScheme();
    return colorScheme ? colorScheme : 'light';
  }

  return themePreference;
}

function onSystemChange(
  color: ColorSchemeName,
  themePreference: ThemePreference,
): AppColorScheme | null {
  if (themePreference === 'system') {
    return color ? color : 'light';
  }
  return null;
}

// function handleStatusBar({
//   appColor,
//   backgroundColor,
//   translucent,
// }: { appColor: AppColorScheme; backgroundColor?: string; translucent?: boolean }) {
//   return (
//     <StatusBar
//       style={appColor === 'dark' ? 'light' : 'dark'}
//       backgroundColor={
//         Platform.OS === 'android'
//           ? backgroundColor || (appColor === 'dark' ? colors.darkTheme.background : colors.lightTheme.background)
//           : undefined
//       }
//       translucent={translucent}
//     />
//   );
// }

function handleStatusBar({
  appColor,
  backgroundColor,
  translucent,
}: StatusBarProps & { appColor: AppColorScheme }) {
  StatusBar.setBarStyle(
    appColor === 'dark' ? 'light-content' : 'dark-content',
    true,
  );

  if (Platform.OS === 'android') {

    if (translucent) {
      StatusBar.setTranslucent(translucent);
    }

    if (Platform.OS === 'android') {
      if (backgroundColor) {
        StatusBar.setBackgroundColor(backgroundColor);

        return;
      }

      StatusBar.setBackgroundColor(
        appColor === 'dark'
          ? colors.darkTheme.background
          : colors.lightTheme.background,
      );
    }
  }
}

async function hideSplashScreen() {
  await SplashScreen.hideAsync();
}

export const settingsService = {
  onChangeThemePreference,
  onSystemChange,
  handleStatusBar,
  hideSplashScreen,
};
