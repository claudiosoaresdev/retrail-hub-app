import { useCallback, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

import { Stacks } from "./navigationTypes";
import { useAuthCredentials } from "../services/authCredentials/useAuthCredentials";
import { settingsService } from "../services/settings/settingsService";

SplashScreen.preventAutoHideAsync();

export function useNavigator(): Stacks {
  const showOnboarding = false;
  const { authCredentials, isLoading } = useAuthCredentials();

  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  });

  const hideSplashScreen = useCallback(async () => {
    if (fontsLoaded && !isLoading) {
      await settingsService.hideSplashScreen();
    }
  }, [fontsLoaded, isLoading]);

  useEffect(() => {
    hideSplashScreen();
  }, [hideSplashScreen]);

  if (!fontsLoaded || isLoading) {
    return 'Loading';
  }

  if (showOnboarding) {
    return 'Onboarding';
  }

  if (authCredentials) {
    return 'App';
  }

  return 'Auth';
}
