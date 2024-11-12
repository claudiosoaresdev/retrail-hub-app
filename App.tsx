import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@shopify/restyle';
import { Server } from 'miragejs';

import { Navigator } from './src/navigation/Navigator';
import { initializeStorage } from './src/services/storage/storageService';
import { asyncStorage } from './src/services/storage/implementations/asyncStorage';
import { makeServer } from './src/services/mirage/mirage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthCredentialsProvider } from './src/services/authCredentials/providers/AuthCredentialsProvider';
import { useAppColor } from './src/services/settings/useSettings';
import { theme, darkTheme } from './src/themes/theme';
import { settingsService } from './src/services/settings/settingsService';
import { colors } from './src/themes/colors';

let server: Server | undefined;

if (__DEV__ && !server) {
  server = makeServer();
}

initializeStorage(asyncStorage);

const queryClient = new QueryClient();

export default function App() {
  const appColor = useAppColor();

  useEffect(() => {
    settingsService.handleStatusBar({
      appColor,
      backgroundColor: colors.palette.transparent,
      translucent: true,
    });
  }, [appColor]);

  return (
    <AuthCredentialsProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <ThemeProvider theme={appColor === 'dark' ? darkTheme : theme}>
            <Navigator />
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </AuthCredentialsProvider>
  );
}