import {
  createDrawerNavigator,
} from '@react-navigation/drawer';

import { HomeScreen } from '../../screens/app/HomeScreen/HomeScreen';

export type AppDrawerNavigatorParamList = {
  HomeScreen: undefined;
};

export type AppDrawerNavigatorProps = {
  initialRouteName?: keyof AppDrawerNavigatorParamList;
};

const Drawer = createDrawerNavigator<AppDrawerNavigatorParamList>();

export function AppDrawerNavigator({
  initialRouteName = 'HomeScreen',
}: AppDrawerNavigatorProps) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        swipeEnabled: true,
        drawerType: 'front',
        drawerContentStyle: {
          flex: 1,
        },
        drawerStyle: {
          width: '60%',
        },
      }}
      initialRouteName={initialRouteName}>
      <Drawer.Screen name="HomeScreen">
        {({ ...rest }) => (
          <HomeScreen {...rest} />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}