import { Page } from "../../infra/paginate/paginateTypes";
import { apiAdapter } from "../../services/api/apiAdapter";
import { productAdapter } from "./productsAdapter";
import { productsApi } from "./productsApi";
import { Product, ProductsAPIRequest } from "./productsTypes";

async function getList({
  page,
  per_page,
  params,
}: ProductsAPIRequest): Promise<Page<Product>> {
  const productsAPI = await productsApi.getList({
    page,
    per_page,
    params,
  });

  return apiAdapter.toPageModel(productsAPI, productAdapter.toProduct);
}

async function getById(id: string): Promise<Product> {
  const productsAPI = await productsApi.getById(id);

  return productAdapter.toProduct(productsAPI);
}

export const productsService = {
  getList,
  getById,
};