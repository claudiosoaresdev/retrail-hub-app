import { api } from "../../services/api/apiConfig";
import { PageAPI } from "../../services/api/apiTypes";

import { CreateOrderRequest, OrderAPI, OrdersAPIRequest } from "./ordersTypes";

export const ORDERS_PATH = "orders";

async function getList({
  page,
  params,
  per_page,
}: OrdersAPIRequest): Promise<PageAPI<OrderAPI>> {
  const response = await api.get<OrderAPI[]>(ORDERS_PATH, {
    params: {
      page: page,
      limit: per_page,
      ...params,
    },
  });

  const totalCount = response.headers['x-total-count'];
  const lastPage = Math.ceil(totalCount / 10);
  const nextPageUrl = page && page < lastPage ? `/?page=${page + 1}` : null;
  const previousPageUrl = page && page > 1 ? `/?page=${page - 1}` : null;

  const meta = {
    total: totalCount,
    per_page: per_page || 10,
    current_page: page || 1,
    last_page: lastPage,
    first_page: 1,
    first_page_url: '/?page=1',
    last_page_url: `/?page=${lastPage}`,
    next_page_url: nextPageUrl,
    previous_page_url: previousPageUrl || null,
  };

  return {
    data: response.data,
    meta,
  };
}

async function create(orderData: CreateOrderRequest): Promise<OrderAPI> {
  const response = await api.post<OrderAPI>(ORDERS_PATH, orderData);

  return response.data;
}

export const ordersApi = {
  getList,
  create,
};