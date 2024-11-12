import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { settingsService } from './settingsService';

import {
  AppColorScheme,
  SettingsStore,
  ThemePreference,
} from './settingsTypes';
import { storageService } from '../storage/storageService';

const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      showOnboarding: true,
      appColor: 'light',
      themePreference: 'system',
      onSystemChange: color => {
        const updatedAppTheme = settingsService.onSystemChange(
          color,
          get().themePreference,
        );
        if (updatedAppTheme) {
          set({ appColor: updatedAppTheme });
        }
      },
      setThemePreference: newThemePreference => {
        const updatedAppTheme =
          settingsService.onChangeThemePreference(newThemePreference);
        set({ appColor: updatedAppTheme, themePreference: newThemePreference });
      },
      finishOnboarding: () => {
        set({ showOnboarding: false });
      },
    }),
    {
      name: '@Settings',
      storage: storageService,
    },
  ),
);

export function useAppColor(): AppColorScheme {
  const appTheme = useSettingsStore(state => state.appColor);
  return appTheme;
}

export function useThemePreference(): ThemePreference {
  const themePreference = useSettingsStore(state => state.themePreference);
  return themePreference;
}

export function useShowOnboarding(): boolean {
  const showOnboarding = useSettingsStore(state => state.showOnboarding);
  return showOnboarding;
}

export function useSettingsService(): Pick<
  SettingsStore,
  'setThemePreference' | 'onSystemChange' | 'finishOnboarding'
> {
  const setThemePreference = useSettingsStore(
    state => state.setThemePreference,
  );
  const onSystemChange = useSettingsStore(state => state.onSystemChange);

  const finishOnboarding = useSettingsStore(state => state.finishOnboarding);

  return {
    setThemePreference,
    onSystemChange,
    finishOnboarding,
  };
}
