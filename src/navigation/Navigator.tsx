import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppStack } from './app/AppStack';
import { AuthStack } from './auth/AuthStack';

import { Box } from '../atomic/atoms/Box/Box';
import { ActivityIndicator } from '../atomic/atoms/ActivityIndicator/ActivityIndicator';
import { CartSummary } from '../atomic/organisms/CartSummary/CartSummary';

import { useNavigator } from './useNavigator';
import { Stacks } from './navigationTypes';
import { useCartState } from '../store/cart/useCartZustand';
import { useAppTheme } from '../hooks/useAppTheme';

function LoadingScreen() {
  return (
    <Box
      flex={1}
      backgroundColor="background"
      justifyContent="center"
      alignItems="center">
      <ActivityIndicator size="large" />
    </Box>
  );
}

const stacks: Record<Stacks, React.ReactElement> = {
  Onboarding: <></>,
  Loading: <LoadingScreen />,
  App: <AppStack />,
  Auth: <AuthStack />,
};

export function Navigator() {
  const stack = useNavigator();
  const Stack = stacks[stack];
  const { spacing } = useAppTheme();

  const { items } = useCartState();
  const [cartSummaryHeight, setCartSummaryHeight] = useState(0);

  const isCartSummaryVisible = items.length > 0;

  const handleLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setCartSummaryHeight(height);
  };

  return (
    <NavigationContainer>
      <Box
        flex={1}
        paddingBottom={isCartSummaryVisible ? 's56' : 's0'}
      >
        {Stack}
      </Box>
      {isCartSummaryVisible && (
        <CartSummary />
      )}
    </NavigationContainer>
  );
}