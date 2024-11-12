import { QueryKeys } from "../../../infra/infraTypes";
import { usePaginatedList } from "../../../infra/paginate/hooks/usePaginatedList";
import { productsService } from "../productsService";
import { Product } from "../productsTypes";

interface UseProductsListParams {}

export function useProductsList(params?: UseProductsListParams) {
  return usePaginatedList<Product>(
    [QueryKeys.ProductsList],
    productsService.getList,
  );
}