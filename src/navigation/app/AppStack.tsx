import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';

import { AppDrawerNavigator, AppDrawerNavigatorParamList } from './AppDrawerNavigator';
import { ProductsScreen } from '../../screens/app/ProductsScreen/ProductsScreen';
import { ProductDetailsScreen } from '../../screens/app/ProductDetailsScreen/ProductDetailsScreen';
import { SummaryScreen } from '../../screens/app/SummaryScreen/SummaryScreen';

export type ProductDetailsScreenParams = {
  productId: string;
};

export type AppStackParamList = {
  AppDrawerNavigator: NavigatorScreenParams<AppDrawerNavigatorParamList>;
  ProductsScreen: undefined;
  ProductDetailsScreen: ProductDetailsScreenParams;
  SummaryScreen: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

interface AppStackProps {
  initialRouteName?: keyof AppStackParamList;
}

export function AppStack({
  initialRouteName = 'AppDrawerNavigator',
}: AppStackProps) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
        animation: 'none',
      }}
      initialRouteName={initialRouteName}>
      <Stack.Screen name="AppDrawerNavigator" component={AppDrawerNavigator} />
      <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
      <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
      <Stack.Screen name="SummaryScreen" component={SummaryScreen} />
    </Stack.Navigator>
  )
}