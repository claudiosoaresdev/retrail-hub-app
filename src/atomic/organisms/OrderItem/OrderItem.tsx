import { Order } from "../../../domain/orders/ordersTypes";
import { formatToCurrency } from "../../../utils/currencyUtils";

import { Box } from "../../atoms/Box/Box";
import { Divider } from "../../atoms/Divider/Divider";
import { Text } from "../../atoms/Text/Text";

export interface OrderItemProps {
  item: Order;
}

export const OrderItem = ({ item }: OrderItemProps) => {

  const getStatusColor = () => {
    switch (item.status.toLocaleUpperCase()) {
      case 'COMPLETED':
        return 'success';
      case 'PENDING':
        return 'attention';
      case 'CANCELLED':
        return 'warning';
      default:
        return 'gray500';
    }
  };

  const translateStatus = (status: string) => {
    switch (status.toLocaleUpperCase()) {
      case 'COMPLETED':
        return 'Completo';
      case 'PENDING':
        return 'Pendente';
      case 'CANCELLED':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <Box
      padding="s16"
      borderRadius="s8"
      backgroundColor="surface"
      shadowColor="gray300"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={4}
      marginVertical="s8"
    >
      <Box marginBottom="s8">
        <Box g="s12">
          <Box g="s8">
            <Text variant="headlineSmall" color="primary" bold>
              Pedido:
            </Text>
            <Text variant="bodySmall" color="primary" bold>
              {item.id}
            </Text>
          </Box>
          <Text variant="bodySmall" color="gray500">
            Criado: {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between" alignItems="center">
          <Text variant="bodySmall" color="onBackground">
            Usuário: <Text color="gray500">{item.userId}</Text>
          </Text>
          <Text variant="bodySmall" color="gray500">
            Atualizado: {new Date(item.updatedAt).toLocaleDateString()}
          </Text>
        </Box>
      </Box>

      <Divider marginVertical="s12" />

      <Box flexDirection="row" alignItems="center" justifyContent="space-between">
        <Text variant="bodyLarge" color="primary" bold>
          Total: {formatToCurrency(item.totalAmount)}
        </Text>
        <Box
          paddingVertical="s4"
          paddingHorizontal="s8"
          borderRadius="s16"
          backgroundColor={getStatusColor()}
        >
          <Text variant="bodySmall" color="onError" bold>
            {translateStatus(item.status)}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};