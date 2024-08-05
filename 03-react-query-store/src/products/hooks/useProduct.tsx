import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/actions";

interface UseProductsOptions {
  id: number;
}

export const useProduct = ({ id }: UseProductsOptions) => {
  const {
    isLoading,
    isFetching,
    isError,
    error,
    data: product,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return { isLoading, isFetching, isError, error, product };
};
