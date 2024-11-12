import React from "react";
import { ListRenderItem } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { DrawerScreenProps } from "@react-navigation/drawer";

import { Box } from "../../../atomic/atoms/Box/Box";
import { Screen } from "../../../atomic/organisms/Screen/Screen";
import { settingsService } from "../../../services/settings/settingsService";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { IconButton } from "../../../atomic/molecules/IconButton/IconButton";
import { Text } from "../../../atomic/atoms/Text/Text";
import { Button } from "../../../atomic/atoms/Button/Button";
import { TextInput } from "../../../atomic/atoms/TextInput/TextInput";
import { InfiniteScrollList } from "../../../infra/paginate/components/InfiniteScrollList/InfiniteScrollList";
import { QueryKeys } from "../../../infra/infraTypes";
import { OrderItem } from "../../../atomic/organisms/OrderItem/OrderItem";
import { AppDrawerNavigatorParamList } from "../../../navigation/app/AppDrawerNavigator";
import { ordersService } from "../../../domain/orders/ordersService";
import { Order } from "../../../domain/orders/ordersTypes";

type HomeScreen = DrawerScreenProps<AppDrawerNavigatorParamList, 'HomeScreen'>;

export function HomeScreen({
  navigation: {
    openDrawer,
  },
}: HomeScreen) {
  const { colors } = useAppTheme();
  const navigation = useNavigation();

  const handleOpenDrawer = () => {
    openDrawer();
  };

  const handleNavigateToProductsScreen = () => {
    navigation.navigate('ProductsScreen');
  }

  const CustomHeader = () => {
    return (
      <Box
        paddingVertical="s12"
        gap="s16"
        px="s20"
      >
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          py="s8">
          <IconButton name="menu" hasPadding hasBorder onPress={handleOpenDrawer} />
          <Box flex={1} justifyContent="center" alignItems="center" pr='s40'>
            <Text variant="bodyLarge" semiBold>Central de Varejo</Text>
          </Box>
        </Box>
        <Box flexDirection="row" gap="s20">
          <Box flex={1}>
            <TextInput
              LeftComponent={
                <Feather name='search' size={18} color={colors.gray400} />
              }
              placeholder="Buscar pedido"
              hasBorder
            />
          </Box>
          <IconButton
            name="filter"
            hasPadding
            color={colors.primary}
            backgroundColor="gray200"
            borderRadius="s8"
            paddingHorizontal="s16"
          />
        </Box>
        <Button
          title="Novo Pedido"
          onPress={handleNavigateToProductsScreen}
        />
      </Box>
    )
  }

  const renderItem: ListRenderItem<Order> = ({ item }) => {
    return (
      <OrderItem
        item={item}
      />
    );
  };

  useFocusEffect(() => {
    settingsService.handleStatusBar({
      appColor: 'light',
      backgroundColor: colors.background,
    });
  });

  return (
    <Screen
      noPaddingHorizontal
      hasKeyboardDismiss
    >
      <CustomHeader />
      <InfiniteScrollList
        queryKey={[QueryKeys.OrdersList]}
        getList={ordersService.getList}
        renderItem={renderItem}
        flatListProps={{
          contentContainerStyle: {
            paddingHorizontal: 16,
          }
        }}
        emptyMessage="Não há nenhum pedido cadastrado"
      />
    </Screen>
  )
}