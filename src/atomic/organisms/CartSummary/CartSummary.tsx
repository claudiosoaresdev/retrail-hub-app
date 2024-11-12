import React from "react";
import { useNavigation } from "@react-navigation/native";

import { useCartState } from "../../../store/cart/useCartZustand";

import { formatToCurrency } from "../../../utils/currencyUtils";

import { Box } from "../../atoms/Box/Box";
import { Text } from "../../atoms/Text/Text";
import { Button } from "../../atoms/Button/Button";

export function CartSummary() {
  const { items, totalCartValue } = useCartState();
  const navigation = useNavigation();

  if (items.length === 0) {
    return null;
  }

  return (
    <Box
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      backgroundColor="background"
      paddingVertical="s12"
      paddingHorizontal="s20"
      borderTopWidth={1}
      borderColor="gray300"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Text variant="bodySmall">
          Total com <Text color="success">entrega grátis</Text>
        </Text>
        <Text variant="bodyLarge" fontWeight="bold">
          {formatToCurrency(totalCartValue)} <Text color="gray500">/ {items.length} itens</Text>
        </Text>
      </Box>
      <Button
        title="Continuar"
        onPress={() => navigation.navigate('SummaryScreen')}
      />
    </Box>
  );
}