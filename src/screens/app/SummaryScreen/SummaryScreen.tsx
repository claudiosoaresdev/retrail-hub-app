import React from "react";
import { ScrollView } from "react-native";
import { CommonActions, useFocusEffect, useNavigation } from "@react-navigation/native";

import { useCartState } from "../../../store/cart/useCartZustand";

import { Screen } from '../../../atomic/organisms/Screen/Screen';
import { Box } from "../../../atomic/atoms/Box/Box";
import { Text } from "../../../atomic/atoms/Text/Text";
import { CartItem } from "../../../store/cart/cartTypes";
import { formatToCurrency } from "../../../utils/currencyUtils";
import { Button } from "../../../atomic/atoms/Button/Button";
import { Image } from "../../../atomic/atoms/Image/Image";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { IconButton } from "../../../atomic/molecules/IconButton/IconButton";

import { settingsService } from "../../../services/settings/settingsService";
import { useOrderCreate } from "../../../domain/orders/useCases/useOrderCreate";
import { useAuthCredentials } from "../../../services/authCredentials/useAuthCredentials";

export function SummaryScreen() {
  const { colors } = useAppTheme();
  const { items, totalCartValue, addOrUpdateItem, removeItem, clearCart } = useCartState();
  const navigation = useNavigation();
  const { authCredentials } = useAuthCredentials();

  const { createOrder, isLoading } = useOrderCreate({
    onSuccess: () => {
      clearCart();

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'AppDrawerNavigator' }],
        })
      );
    },
    onError: error => {
      console.error("Error creating order:", error);
    },
  });

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = async () => {
    const orderItems = items.map(item => ({
      productId: item.product.id,
      quantity: item.quantity,
      unitPrice: item.product.price,
    }));

    await createOrder({
      userId: authCredentials?.user.id!,
      items: orderItems,
      totalAmount: totalCartValue,
    });
  };

  const handleIncreaseQuantity = (item: CartItem) => {
    addOrUpdateItem(item.product, item.quantity + 1);
  };

  const handleDecreaseQuantity = (item: CartItem) => {
    if (item.quantity > 1) {
      addOrUpdateItem(item.product, item.quantity - 1);
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  }

  const handleNavigateToProducts = () => {
    navigation.navigate('ProductsScreen');
  };

  useFocusEffect(() => {
    settingsService.handleStatusBar({
      appColor: 'dark',
      backgroundColor: colors.primaryDark,
    });
  });

  return (
    <Screen
      canGoBack
      title="Carrinho"
      titleHeaderProps={{
        color: 'white',
      }}
      iconGoBackSettings={{
        color: colors.white,
      }}
      headerProps={{
        backgroundColor: "primary",
      }}
      noPaddingHorizontal
      noPaddingBottom
      RightComponent={
        items.length > 0 && (
          <IconButton
            name="trash-2"
            color={colors.white}
            size={18}
            onPress={handleClearCart}
          />
        )
      }
    >
      <Box flex={1} paddingVertical="s20" g="s20">

        <ScrollView showsVerticalScrollIndicator={false}>
          <Box paddingHorizontal="s20" g="s14">
            <Text semiBold>Itens no Carrinho</Text>

            {items.length > 0 ? (
              items.map((item: CartItem) => (
                <Box key={item.product.id} flexDirection="row" paddingVertical="s10" alignItems="center" g="s10">
                  <Image
                    source={{ uri: item.product.images[0] }}
                    variant="smallProduct"
                  />

                  <Box flex={1} paddingLeft="s10">
                    <Text variant="bodyMedium" semiBold>{item.product.name}</Text>
                    <Text variant="bodySmall" color="gray500">
                      {item.product.brand} • SKU: {item.product.sku}
                    </Text>
                    <Text variant="bodyMedium" bold>{formatToCurrency(item.product.price)}</Text>
                  </Box>

                  <Box flexDirection="row" alignItems="center">
                    {item.quantity === 1 ? (
                      <IconButton
                        name="trash-2"
                        color={colors.primary}
                        size={18}
                        onPress={() => handleRemoveItem(item.product.id)}
                      />
                    ) : (
                      <IconButton
                        name="minus"
                        color={colors.primary}
                        onPress={() => handleDecreaseQuantity(item)}
                      />
                    )}
                    <Box width={38} justifyContent="center" alignItems="center">
                      <Text variant="bodyMedium" paddingHorizontal="s8">{item.quantity}</Text>
                    </Box>
                    <IconButton
                      name="plus"
                      color={colors.primary}
                      onPress={() => handleIncreaseQuantity(item)}
                    />

                  </Box>
                </Box>
              ))
            ) : (
              <Text>Seu carrinho está vazio.</Text>
            )}

            {items.length > 0 && (
              <Box g="s14">
                <Text variant="bodyLarge" semiBold>Total do Carrinho</Text>
                <Text variant="bodyLarge" bold>{formatToCurrency(totalCartValue)}</Text>
              </Box>
            )}
          </Box>
        </ScrollView>
      </Box>

      <Box p="s20">
        {items.length > 0 ? (
          <Button
            title="Finalizar Pedido"
            onPress={handleCheckout}
            loading={isLoading}
          />
        ) : (
          <Button
            title="Adicionar Item"
            onPress={handleNavigateToProducts}
          />
        )}
      </Box>
    </Screen>
  );
}