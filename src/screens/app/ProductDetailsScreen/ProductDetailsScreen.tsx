import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolateColor,
  interpolate,
} from 'react-native-reanimated';

import { useAppTheme } from '../../../hooks/useAppTheme';

import { ProductDetailsScreenParams } from '../../../navigation/app/AppStack';

import { useProductGetById } from '../../../domain/products/useCases/useProductGetById';

import { Box } from '../../../atomic/atoms/Box/Box';
import { AnimatedText, Text } from '../../../atomic/atoms/Text/Text';
import { AnimatedHeader } from '../../../atomic/molecules/AnimatedHeader/AnimatedHeader';
import { AnimatedIconButton } from '../../../atomic/molecules/AnimatedIconButton/AnimatedIconButton';
import { Screen } from '../../../atomic/organisms/Screen/Screen';
import { Divider } from '../../../atomic/atoms/Divider/Divider';
import { Button } from '../../../atomic/atoms/Button/Button';
import { formatToCurrency } from '../../../utils/currencyUtils';
import { useCartState } from '../../../store/cart/useCartZustand';

type RouteParams = ProductDetailsScreenParams;

const STATUS_BAR_HEIGHT = 24;
const HEADER_HEIGHT = 280 + STATUS_BAR_HEIGHT;
const COLLAPSED_HEIGHT = 54 + STATUS_BAR_HEIGHT;
const SCROLL_ENABLED = true;

export function ProductDetailsScreen() {
  const { colors, spacing } = useAppTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { productId } = route.params as RouteParams;
  const { product } = useProductGetById(productId);
  const { addOrUpdateItem, items } = useCartState();

  const scrollY = useSharedValue(0);

  const existingCartItem = items.find(item => item.product.id === productId);
  const initialQuantity = existingCartItem ? existingCartItem.quantity : 1;

  const [quantity, setQuantity] = useState(initialQuantity)

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedIconBackgroundColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollY.value,
      [0, HEADER_HEIGHT - COLLAPSED_HEIGHT],
      [colors.white, colors.transparent],
    );

    const borderColor = interpolateColor(
      scrollY.value,
      [0, HEADER_HEIGHT - COLLAPSED_HEIGHT],
      [colors.gray400, colors.transparent],
    );

    const borderWidth = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT - COLLAPSED_HEIGHT],
      [spacing.s1, 0],
    );

    return {
      backgroundColor,
      borderColor,
      borderWidth,
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      scrollY.value,
      [0, HEADER_HEIGHT - COLLAPSED_HEIGHT],
      [colors.onSurface, colors.white],
    );

    return {
      color,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      scrollY.value,
      [0, HEADER_HEIGHT - COLLAPSED_HEIGHT],
      [colors.onBackground, colors.white]
    );

    return { color };
  });

  const handleAddOrUpdateItem = () => {
    if (product) {
      addOrUpdateItem(product, quantity);
      navigation.goBack();
    }
  };

  const handleIncreaseQuantity = () => setQuantity(prev => prev + 1);
  const handleDecreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const renderIconLeft = (
    <AnimatedIconButton
      name="chevron-left"
      onPress={() => navigation.goBack()}
      hasBorder
      hasPadding
      style={animatedIconBackgroundColorStyle}
      iconStyle={animatedIconStyle}
    />
  );

  if (!product) {
    return (
      <Screen justifyContent='center' alignItems='center'>
        <Text>Carregando produto...</Text>
      </Screen>
    );
  }

  const totalPrice = product.price * quantity;

  return (
    <Screen noPaddingHorizontal noPaddingBottom>
      <AnimatedHeader
        scrollY={scrollY}
        headerHeight={HEADER_HEIGHT}
        collapsedHeight={COLLAPSED_HEIGHT}
        imageUrl={product?.images[0]}
        backgroundColor="background"
        leftComponent={renderIconLeft}
        title={
          <AnimatedText
            semiBold
            style={animatedTextStyle}
          >
            {product?.name}
          </AnimatedText>
        }
      >
        <Box paddingHorizontal="s20">
          <Text variant="headlineSmall" semiBold>
            {product.name}
          </Text>
        </Box>
      </AnimatedHeader>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={SCROLL_ENABLED}
      >
        <Box paddingVertical="s16" paddingHorizontal="s20" g="s10">
          <Text variant="bodyMedium" semiBold>
            Descrição
          </Text>
          <Text textAlign="justify">{product.description}</Text>
        </Box>
        <Divider marginHorizontal="s20" />

        <Box flexDirection="row" paddingVertical="s16" paddingHorizontal="s20" g="s10">
          <Box flex={1} g="s10">
            <Text variant="bodyMedium" semiBold>
              Preço
            </Text>
            <Text variant="bodyMedium" bold>
              {formatToCurrency(product.price)}
            </Text>
          </Box>
        </Box>
        <Divider marginHorizontal="s20" />

        <Box flexDirection="row" paddingVertical="s16" paddingHorizontal="s20" g="s10">
          <Box flex={1} g="s10">
            <Text variant="bodyMedium" semiBold>
              Categoria
            </Text>
            <Text variant="bodyMedium">{product.category}</Text>
          </Box>
          <Box flex={1} g="s10">
            <Text variant="bodyMedium" semiBold>
              Marca
            </Text>
            <Text variant="bodyMedium">{product.brand}</Text>
          </Box>
        </Box>
        <Divider marginHorizontal="s20" />

        {product.weight && (
          <>

            <Box flexDirection="row" paddingVertical="s16" paddingHorizontal="s20" g="s10">
              <Box flex={1} g="s10">
                <Text variant="bodyMedium" semiBold>
                  Peso
                </Text>
                <Text variant="bodyMedium">{product.weight} kg</Text>
              </Box>
              {product.dimensions && (
                <Box flex={1} g="s10">
                  <Text variant="bodyMedium" semiBold>
                    Dimensões
                  </Text>
                  <Text variant="bodyMedium">
                    {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
                  </Text>
                </Box>
              )}
            </Box>
            <Divider marginHorizontal="s20" />
          </>
        )}

        <Box flexDirection="row" paddingVertical="s16" paddingHorizontal="s20" g="s10">
          <Box flex={1} g="s10">
            <Text variant="bodyMedium" semiBold>
              Estoque
            </Text>
            <Text variant="bodyMedium">{product.stock > 0 ? `${product.stock} unidades disponíveis` : 'Indisponível'}</Text>
          </Box>
          {product.freeShipping && (
            <Box flex={1} g="s10">
              <Text variant="bodyMedium" semiBold>
                Frete Grátis
              </Text>
              <Text variant="bodyMedium" color="success">Disponível</Text>
            </Box>
          )}
        </Box>
        <Divider marginHorizontal="s20" />

        <Box flexDirection="row" paddingVertical="s16" paddingHorizontal="s20" g="s10">
          <Box flex={1} g="s10">
            <Text variant="bodyMedium" semiBold>
              Avaliação
            </Text>
            <Text variant="bodyMedium">{product.rating?.toFixed(1) ?? 'Sem avaliação'}</Text>
          </Box>
          <Box flex={1} g="s10">
            <Text variant="bodyMedium" semiBold>
              Adicionado em
            </Text>
            <Text variant="bodyMedium">{new Date(product.createdAt).toLocaleDateString('pt-BR')}</Text>
          </Box>
        </Box>

        {product.tags && product.tags.length > 0 && (
          <Box paddingVertical="s16" paddingHorizontal="s20" g="s10">
            <Text variant="bodyMedium" semiBold>
              Tags
            </Text>
            <Text variant="bodyMedium">{product.tags.join(', ')}</Text>
          </Box>
        )}

        <Box flexDirection="row" justifyContent='space-between' alignItems="center" paddingVertical="s16" paddingHorizontal="s20" g="s10">
          <Text variant="bodyLarge" semiBold color="primary">
            Total: {formatToCurrency(totalPrice)}
          </Text>

          <Box flexDirection="row" alignItems="center" g="s8">
            <Button title="-" onPress={handleDecreaseQuantity} />

            <Text variant="bodyMedium" marginHorizontal="s8">
              {quantity}
            </Text>

            <Button title="+" onPress={handleIncreaseQuantity} />
          </Box>
        </Box>

      </Animated.ScrollView>
      <Box p="s20">
        <Button title="Adicionar ao Carrinho" onPress={handleAddOrUpdateItem} />
      </Box>
    </Screen>
  );
}