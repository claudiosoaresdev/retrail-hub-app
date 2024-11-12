import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MutationOptions, QueryKeys } from '../../../infra/infraTypes';
import { Order } from '../ordersTypes';
import { ordersService } from '../ordersService';

export function useOrderCreate(
  options: MutationOptions<Order>,
) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation<
    Order,
    unknown,
    {
      userId: string;
      items: Array<{ productId: string; quantity: number; unitPrice: number }>;
      totalAmount: number;
    }
  >({
    mutationFn: ({ userId, items, totalAmount }) =>
      ordersService.createOrder({ userId, items, totalAmount }),
    onSuccess: newOrder => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.OrdersList],
      }).then(() => {
        queryClient.refetchQueries({
          queryKey: [QueryKeys.OrdersList],
        });
      });

      if (options?.onSuccess) {
        options.onSuccess(newOrder);
      }
    },
    onError: () => {
      if (options?.onError) {
        options.onError(options?.errorMessage || 'Erro ao criar o pedido');
      }
    },
  });

  async function createOrder({
    userId,
    items,
    totalAmount,
  }: {
    userId: string;
    items: Array<{ productId: string; quantity: number; unitPrice: number }>;
    totalAmount: number;
  }) {
    mutate({ userId, items, totalAmount });
  }

  return {
    isLoading: isPending,
    isError,
    createOrder,
  };
}