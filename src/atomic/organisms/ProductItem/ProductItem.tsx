import { Product } from "../../../domain/products/productsTypes";

import { Box, PressableBox } from "../../atoms/Box/Box";
import { Text } from "../../atoms/Text/Text";
import { Image } from "../../atoms/Image/Image";
import { $shadowProps } from "../../../themes/theme";
import { formatToCurrency } from "../../../utils/currencyUtils";

export interface ProductItemProps {
  item: Product;
  onPress?: (productId: string) => void;
}

const calculateDiscountedPrice = (price: number, discount?: { amount: number; type: 'percentage' | 'fixed' }) => {
  if (!discount) return price;

  if (discount.type === 'percentage') {
    return price * (1 - discount.amount / 100);
  }

  return price - discount.amount;
};

const getDiscountPercentage = (discount?: { amount: number; type: 'percentage' | 'fixed' }) => {
  if (!discount) return null;
  return discount.type === 'percentage' ? `${discount.amount}% OFF` : null;
};

export const ProductItem: React.FC<ProductItemProps> = ({ item, onPress }) => {
  const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
  const discountPercentage = getDiscountPercentage(item.discount);

  return (
    <PressableBox
      flex={1}
      padding="s8"
      borderRadius="s8"
      backgroundColor="surface"
      style={$shadowProps}
      alignItems="flex-start"
      onPress={onPress ? () => onPress(item.id) : undefined}
    >

      <Image
        source={{ uri: item.images[0] }}
        variant="product"
        resizeMode="contain"
      />

      <Box marginTop="s8" alignItems="flex-start" paddingHorizontal="s8">
        <Text variant="bodyMedium" color="onBackground" numberOfLines={1}>
          {item.name}
        </Text>

        {discountPercentage && (
          <Box flexDirection="row" alignItems="center" marginTop="s4">
            <Text variant="bodySmall" color="gray500" style={{ textDecorationLine: 'line-through', marginRight: 8 }}>
              {formatToCurrency(item.price)}
            </Text>
            <Text variant="bodySmall" color="success">
              {discountPercentage}
            </Text>
          </Box>
        )}

        <Text variant="bodyMedium" color="primary" marginTop="s4">
          {formatToCurrency(discountedPrice)}
        </Text>

        {item.freeShipping && (
          <Box flexDirection="row" alignItems="center" marginTop="s4">
            <Text variant="bodySmall" color="success" marginRight="s4">
              Frete grátis
            </Text>
          </Box>
        )}
      </Box>

    </PressableBox>
  );
};