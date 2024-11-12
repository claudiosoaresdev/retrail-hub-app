import React from "react"
import { ListRenderItem } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { useAppTheme } from "../../../hooks/useAppTheme";
import { settingsService } from "../../../services/settings/settingsService";

import { Screen } from "../../../atomic/organisms/Screen/Screen";
import { InfiniteScrollList } from "../../../infra/paginate/components/InfiniteScrollList/InfiniteScrollList";
import { QueryKeys } from "../../../infra/infraTypes";
import { productsService } from "../../../domain/products/productsService";

import { Product } from "../../../domain/products/productsTypes";
import { ProductItem } from "../../../atomic/organisms/ProductItem/ProductItem";

export function ProductsScreen() {
  const { colors } = useAppTheme();
  const navigation = useNavigation();

  const handleNavigateToProductDetailsScreen = (productId: string) => {
    navigation.navigate('ProductDetailsScreen', {
      productId,
    });
  }

  const renderItem: ListRenderItem<Product> = ({ item }) => {
    return (
      <ProductItem
        item={item}
        onPress={handleNavigateToProductDetailsScreen}
      />
    );
  };

  useFocusEffect(() => {
    settingsService.handleStatusBar({
      appColor: 'dark',
      backgroundColor: colors.primaryDark,
    });
  });

  return (
    <Screen
      title="Produtos"
      canGoBack
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
    >
      <InfiniteScrollList
        queryKey={[QueryKeys.ProductsList]}
        getList={productsService.getList}
        renderItem={renderItem}
        flatListProps={{
          numColumns: 2,
          columnWrapperStyle: {
            justifyContent: "space-between",
            gap: 16,
          },
          contentContainerStyle: {
            padding: 16,
            gap: 16,
          },
        }}
        emptyMessage="Não há nenhum produto cadastrado"
      />
    </Screen>
  );
}