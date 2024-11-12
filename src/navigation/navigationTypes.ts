import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppStackParamList } from './app/AppStack';
import { AuthStackParamList } from './auth/AuthStack';
import { AppDrawerNavigatorParamList } from './app/AppDrawerNavigator';

export type Stacks = 'Loading' | 'Auth' | 'App' | 'Onboarding';

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends AppDrawerNavigatorParamList,
      AppStackParamList,
      AuthStackParamList {}
  }
}

export type AppScreenProps<RouteName extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, RouteName>;