import { Order, OrderAPI, OrderItem, OrderItemAPI } from "./ordersTypes";

function toOrderItem(orderItemAPI: OrderItemAPI): OrderItem {
  return {
    productId: orderItemAPI.productId,
    quantity: orderItemAPI.quantity,
    unitPrice: orderItemAPI.unitPrice,
  };
}

function toOrder(orderAPI: OrderAPI): Order {
  return {
    id: orderAPI.id,
    userId: orderAPI.userId,
    items: orderAPI.items.map(toOrderItem),
    totalAmount: orderAPI.totalAmount,
    status: orderAPI.status,
    createdAt: new Date(orderAPI.createdAt),
    updatedAt: new Date(orderAPI.updatedAt),
  };
}

export const ordersAdapter = {
  toOrder,
};