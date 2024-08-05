import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/actions";

interface UseProductsOptions {
  filterKey?: string;
}

export const useProducts = ({ filterKey }: UseProductsOptions) => {
  const {
    isLoading,
    isFetching,
    isError,
    error,
    data: products = [],
  } = useQuery({
    queryKey: ["products", { filterKey }],
    queryFn: () => getProducts({ filterKey }),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return { isLoading, isFetching, isError, error, products };
};
