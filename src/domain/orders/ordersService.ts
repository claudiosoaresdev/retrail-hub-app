
import { Page } from "../../infra/paginate/paginateTypes";
import { apiAdapter } from "../../services/api/apiAdapter";
import { ordersAdapter } from "./ordersAdapter";
import { ordersApi } from "./ordersApi";
import { CreateOrderRequest, Order, OrdersAPIRequest } from "./ordersTypes";

async function getList({
  page,
  per_page,
  params,
}: OrdersAPIRequest): Promise<Page<Order>> {
  const ordersAPI = await ordersApi.getList({
    page,
    per_page,
    params,
  });

  return apiAdapter.toPageModel(ordersAPI, ordersAdapter.toOrder);
}

async function createOrder(orderData: CreateOrderRequest): Promise<Order> {
  const orderAPI = await ordersApi.create(orderData);

  return ordersAdapter.toOrder(orderAPI);
}

export const ordersService = {
  getList,
  createOrder,
};