import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "../../../infra/infraTypes";
import { productsService } from "../productsService";

export function useProductGetById(id: string) {
  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: [QueryKeys.ProductGetById, id],
    queryFn: () => productsService.getById(id),
    staleTime: 1000 * 30,
  });

  return {
    product: data,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
}