import { api } from "../../services/api/apiConfig";
import { PageAPI } from "../../services/api/apiTypes";
import { ProductAPI, ProductsAPIRequest } from "./productsTypes";

export const PRODUCTS_PATH = 'products';

async function getList({
  page,
  params,
  per_page,
}: ProductsAPIRequest): Promise<PageAPI<ProductAPI>> {
  const response = await api.get<ProductAPI[]>(PRODUCTS_PATH, {
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

async function getById(id: string): Promise<ProductAPI> {
  const response = await api.get<ProductAPI>(`${PRODUCTS_PATH}/${id}`);

  return response.data;
}

export const productsApi = {
  getList,
  getById,
};